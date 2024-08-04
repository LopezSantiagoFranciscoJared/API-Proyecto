import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { libro } from '../Modelo/libro.interface';
import { AutorService } from '../../../services/autor.service';
import { Autor } from '../Modelo/autor.interface';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-libros',
  imports: [MatToolbarModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  elementosPorPagina = 5;
  paginaActual = 1;
  livto: libro[] = [];
  autores: Autor[] = [];
  selectedAutorId: number = 0;

  formularioActivo = false;
  formularioEditarActivo = false;
  registroSeleccionado: any = {};

  titulo: string = '';
  genero: string = '';
  aniopublicacion: number = 0;
  ISBN: string = '';

  constructor(
    private http: HttpClient,
    private autorService: AutorService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get<libro[]>("http://127.0.0.1:8000/api/libros/")
      .subscribe((data) => {
        this.livto = data;
      });

    this.autorService.getAutores().subscribe((data) => {
      this.autores = data;
    });
  }

  submitForm() {
    if (!this.titulo || !this.genero || !this.aniopublicacion || !this.ISBN || !this.selectedAutorId) {
      console.error('Por favor, complete todos los campos antes de enviar el formulario.');
      return;
    }

    const userData = {
      titulo: this.titulo,
      genero: this.genero,
      aniopublicacion: this.aniopublicacion,
      ISBN: this.ISBN,
      autor_id: this.selectedAutorId
    };

    this.http.post('http://127.0.0.1:8000/api/libros/', userData).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
        setTimeout(() => {
          this.formularioActivo = false;
        }, 300);
        window.location.reload();
      },
      (error: any) => {
        console.error('Error en el registro:', error);
      }
    );
  }

  formularioValido(): boolean {
    const camposLlenos =
      this.titulo.trim() !== '' &&
      this.genero.trim() !== '' &&
      this.aniopublicacion !== null &&
      this.ISBN.trim() !== '' &&
      this.selectedAutorId !== 0;

    if (!camposLlenos) {
      alert('Por favor, complete todos los campos antes de enviar el formulario.');
    }
    return camposLlenos;
  }

  closeModal() {
    this.formularioActivo = false;
  }

  mostrarFormulario() {
    this.formularioActivo = true;
  }

  abrirFormularioEditar(libro: any): void {
    this.formularioEditarActivo = true;
    this.registroSeleccionado = { ...libro }; // Hacemos una copia del registro seleccionado para no modificar el original
  }

  cerrarFormularioEditarL(): void {
    this.formularioEditarActivo = false;
    this.registroSeleccionado = {}; // Reiniciamos el registro seleccionado para futuras ediciones
  }

  actualizarRegistroL(): void {
    const confirmacion = confirm('¿Deseas actualizar el registro?');

    if (!confirmacion) {
      return;
    }
    if (!this.registroSeleccionado.titulo || !this.registroSeleccionado.genero ||
      !this.registroSeleccionado.aniopublicacion || !this.registroSeleccionado.ISBN || !this.registroSeleccionado.autor_id) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const userData2 = {
      titulo: this.registroSeleccionado.titulo,
      genero: this.registroSeleccionado.genero,
      aniopublicacion: this.registroSeleccionado.aniopublicacion,
      ISBN: this.registroSeleccionado.ISBN,
      autor_id: this.registroSeleccionado.autor_id
    };

    this.http.put('http://127.0.0.1:8000/api/libros/' + this.registroSeleccionado.id, userData2).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
        setTimeout(() => {
          window.location.reload();
        }, 300);
      },
      (error: any) => {
        console.error('Error en el registro:', error);
      }
    );

    this.cerrarFormularioEditarL();
  }

  eliminarRegistroL(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este registro?');

    if (confirmacion) {
      this.http.delete(`http://127.0.0.1:8000/api/libros/${id}`).subscribe(
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
}
