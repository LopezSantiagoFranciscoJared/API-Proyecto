import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { listacliente } from '../Modelo/listacliente.interface';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatSidenav } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../../../services/auth.service'; // Corrected import path

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormsModule, MatIconModule, MatSidenavModule, MatMenuModule, MatToolbarModule, MatSidenavModule],
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [AuthService]
})
export class InicioComponent implements OnInit {
  constructor(
    private http: HttpClient, 
    public dialog: MatDialog, 
    private sanitizer: DomSanitizer, 
    private router: Router,
    private authService: AuthService // Inject the AuthService
  ) { }

  Usuarios: listacliente[] = [];
  elementosPorPagina = 5;
  paginaActual = 1;

  ngOnInit(): void {
    this.http.get<listacliente[]>("http://127.0.0.1:8000/api/clientes")
      .subscribe((data) => {
        this.Usuarios = data;
      });
  }

  eliminarRegistro(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este registro?');

    if (confirmacion) {
      this.http.delete(`http://127.0.0.1:8000/api/clientes/${id}`).subscribe(
        (response) => {
          alert('Registro eliminado exitosamente.');
          window.location.reload();
        },
        (error) => {
          console.error('Error al eliminar el registro:', error);
          alert('Se produjo un error al eliminar el registro. Vuelva a intentarlo más tarde.');
        }
      );
    }
  }

  registroSeleccionado: any = {}; 
  verlibro: boolean = false;
  formularioEditarActivo: boolean = false;

  abrirFormularioEditar(registro: any): void {
    this.formularioEditarActivo = true;
    this.registroSeleccionado = registro;
  }

  cerrarFormularioEditar(): void {
    this.formularioEditarActivo = false;
    this.registroSeleccionado = {}; 
  }

  mostrarDetalleLibro(libro: any) {
    this.registroSeleccionado = libro;
    this.verlibro = true;
    if (event) {
      event.stopPropagation();
    }
  }

  actualizarRegistro(): void {
    const confirmacion = confirm('¿Deseas actualizar el registro?');

    if (!confirmacion) {
        return;
    }

    if (!this.registroSeleccionado.nombre || !this.registroSeleccionado.apellidos ||
        !this.registroSeleccionado.edad || !this.registroSeleccionado.email || !this.registroSeleccionado.password) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }

    const userData2 = {
        nombre: this.registroSeleccionado.nombre,
        apellidos: this.registroSeleccionado.apellidos,
        edad: this.registroSeleccionado.edad,
        email: this.registroSeleccionado.email,
        password: this.registroSeleccionado.password,
    };

    // Verificar los datos antes de enviar
    console.log('Datos a enviar:', userData2);

    this.authService.updateClient(
        this.registroSeleccionado.id, 
        userData2.nombre, 
        userData2.apellidos, 
        userData2.edad, 
        userData2.email, 
        userData2.password
    ).subscribe(
        (response: any) => {
            console.log('Registro actualizado exitosamente:', response);
            alert('Registro actualizado exitosamente.');
            this.Usuarios = this.Usuarios.map(usuario => 
                usuario.id === this.registroSeleccionado.id ? this.registroSeleccionado : usuario
            );
            this.cerrarFormularioEditar();
        },
        (error: any) => {
            console.error('Error en el registro:', error);
            alert('Se produjo un error al actualizar el registro.');
        }
    );

    console.log('Registro actualizado:', this.registroSeleccionado);
  }
}
