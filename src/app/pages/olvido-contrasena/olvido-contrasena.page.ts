import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicioApi } from '../../services/ServicioApi.service';

@Component({
  selector: 'app-olvido-contrasena',
  templateUrl: './olvido-contrasena.page.html',
  styleUrls: ['./olvido-contrasena.page.scss'],
})
export class OlvidoContrasenaPage {
  constructor(private alertController: AlertController,private router: Router , private ServicioApi: ServicioApi) {
    localStorage.removeItem('isLoggedIn');

   }

  async recuperarContrasenia() {
    const nombreUsuarioInput = document.getElementById('nombreUsuario') as HTMLInputElement;
    const nombreUsuario = nombreUsuarioInput.value;
    if (nombreUsuario === '') {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debes ingresar un nombre de usuario.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  this.ServicioApi.RecuperarContrasena(nombreUsuario).subscribe(
    async data => {
      if (data.message === "Solicitud de recuperación de contraseña enviada correctamente") {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Solicitud de recuperación de contraseña enviada correctamente',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigate(['/login']);
              }
            }
          ]
        });
        await alert.present();
      }
    },
    error => {
      console.error('Login error:', error);
      alert('Error de inicio de sesión. Por favor, verifica tus credenciales.');
    }
  )
};



}