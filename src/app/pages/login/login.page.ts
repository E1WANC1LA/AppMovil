import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioApi } from '../../services/ServicioApi.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  NombreUsuario: string = '';
  contrasena: string = '';
  TipoUsuarioString: string | undefined;
  isLoading: boolean = true;

  constructor(private router: Router, private ServicioApi: ServicioApi,private loadingController: LoadingController) { 
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('correo');


  }

  ngOnInit() {
    const loadingDuration = 3000; // Tiempo en milisegundos
    this.showLoading(loadingDuration);
  }

  showLoading(duration: number) {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false; // Oculta la pantalla de carga después de la duración especificada
    }, duration);
  }

  iniciarSesion() {
    console.log(this.NombreUsuario, this.contrasena);
    let msg = '';

    if (this.NombreUsuario === '') {
      msg += 'Debes ingresar un Nombre de Usuario\n';
    }
    if (this.contrasena === '') {
      msg += 'Debes ingresar una contraseña\n';
    }
    if (msg !== '') {
      alert(msg);
      return;
    }

    this.ServicioApi.login(this.NombreUsuario, this.contrasena).subscribe(
      data => {
        
        console.log('Login successful:', data);
        if (data.message === "Success") {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', data.auth.token);
          localStorage.setItem('correo', data.data.correo); 
          switch (data.perfil) {
            case 'docente':
              this.router.navigate(['/inicio-profesor'], { queryParams: { NombreUsuario: this.NombreUsuario } });
              break;
            case 'estudiante':
              this.router.navigate(['/inicio-alumno'], { queryParams: { NombreUsuario: this.NombreUsuario } });
              break;
            default:
              alert('Tipo de usuario no válido');
          }
        } else {
          alert('Login failed: ' + data.message);
        }
      },
      error => {
        console.error('Login error:', error);
        alert('Error de inicio de sesión. Por favor, verifica tus credenciales.');
      }
    );
  }
}