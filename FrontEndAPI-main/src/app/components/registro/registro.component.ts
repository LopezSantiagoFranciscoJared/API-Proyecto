import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  
  registroForm: FormGroup;
  loading = false; 
  registroExitoso = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registroForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]+')]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]+')]],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}')]],
    });
  }

  ngOnInit(): void {}

  submitForm() {
    if (this.registroForm.invalid) {
      return;
    }
  
    this.loading = true;
    const userData = this.registroForm.value;
  
    this.authService.register(userData.nombres, userData.apellidos, userData.edad, userData.email, userData.password).subscribe(
      response => {
        console.log('Registro exitoso:', response);
        this.registroExitoso = true;
        alert('Usuario registrado exitosamente');
        this.loading = false;
        this.router.navigateByUrl('/login'); // Redirige al inicio de sesión
      },
      error => {
        console.error('Error en el registro:', error);
        alert('Error en el registro. Por favor intenta nuevamente.');
        this.loading = false;
      }
    );
  }
}
