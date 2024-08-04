import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Verifica que la ruta sea correcta

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo = 'https://www.freepik.es/vector-gratis/interior-biblioteca-sala-vacia-leer-libros-estantes-madera_5467428.htm#fromView=search&page=1&position=13&uuid=880a9cd2-5a0b-44b4-8d72-becce431dce5';
  correo: string = '';
  contrasena: string = '';
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {}

  ingresar() {
    this.loading = true;
    this.authService.login(this.correo, this.contrasena).subscribe(
      (response: any) => {
        alert('Inicio de sesión exitoso');
        localStorage.setItem('currentUser', JSON.stringify(response.cliente));
        const navigationExtras: NavigationExtras = {
          state: {
            from: 'dashboard',
            userData: response.cliente
          }
        };
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard', navigationExtras);
          this.loading = false;
        }, 2000);
      },
      (error: any) => {
        alert('Credenciales no válidas. Por favor revise su correo electrónico y contraseña.');
        this.loading = false;
      }
    );
  }

  registrar() {
    this.router.navigateByUrl('/registro');
  }

  validarCamposRellenos(): boolean {
    return this.correo.trim() !== '' && this.contrasena.trim() !== '';
  }
}
