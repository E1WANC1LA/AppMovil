import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicioApi } from '../../services/ServicioApi.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private alertController: AlertController,private router: Router, private ServicioApi: ServicioApi) {

    localStorage.removeItem('isLoggedIn');

  }

  ngOnInit() {
  }

  async Registrarse() {
    let NombreInput = document.getElementById('nombre') as HTMLInputElement;
    let apellidoInput = document.getElementById('apellido') as HTMLInputElement;
    let NombreUsuarioInput = document.getElementById('NombreUsuario') as HTMLInputElement;
    let tipoUsuario = document.getElementById('tipoUsuario') as HTMLInputElement;
    let runInput = document.getElementById('run') as HTMLInputElement;
    let Nombre = NombreInput.value;
    let apellido = apellidoInput.value;
    let NombreUsuario = NombreUsuarioInput.value;
    let run = runInput.value;
    let tipo = '';
    if (tipoUsuario.value === '1') {
      tipo = 'docente';
    } else {
      tipo = 'estudiante';
    }
  
 
    let msg = '';
    console.log(Nombre, apellido, NombreUsuario, tipo);

    if (tipo === undefined) {
      msg += 'Debes seleccionar un tipo de usuario\n';
    }
    if (Nombre === '') {
      msg += 'Debes ingresar un Nombre\n';
    }
    if (apellido === '') {
      msg += 'Debes ingresar un Apellido\n';
    }
    if (NombreUsuario === '') {
      msg += 'Debes ingresar un Nombre de Usuario\n';
    }
    if (run === '') {
      msg += 'Debes ingresar un RUN\n';
    }


    NombreInput.value = '';
    apellidoInput.value = '';
    NombreUsuarioInput.value = '';
    tipoUsuario.value = '';
    runInput.value = '';

    if (msg !== '') {
      let alert = await this.alertController.create({
        header: 'Error',
        message: msg,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }


    this.ServicioApi.registrarUsuario(Nombre, apellido, NombreUsuario, tipo,run,"presenteprofe").subscribe(
      async data => {
        if (data.message === "Success") {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Registro exitoso, revise su correo',
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
        else{
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Error al registrar',
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
    );

    // let alert = await this.alertController.create({
    //   header: 'Registro exitoso',
    //   message: `Se ha registrado con exito`,
    //   buttons: [
    //     {
    //       text: 'OK',
    //       handler: () => {
    //         this.router.navigate(['/login']);
    //       }
    //     }
    //   ]
    // });

    // await alert.present();
    


  }

}
