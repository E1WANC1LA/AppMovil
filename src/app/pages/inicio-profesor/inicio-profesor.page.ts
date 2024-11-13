import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio-profesor',
  templateUrl: './inicio-profesor.page.html',
  styleUrls: ['./inicio-profesor.page.scss'],
})
export class InicioProfesorPage implements OnInit {
  @ViewChild('content', { static: false }) content!: IonContent;
  NombreUsuario: string | null = null;

  constructor(private route: ActivatedRoute, private Router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.NombreUsuario = localStorage.getItem('correo');
      const mensajeBienvenida = document.getElementById('MensajeBienvenida');
      if (this.NombreUsuario && mensajeBienvenida) {
        mensajeBienvenida.innerText = `Bienvenido a la aplicación profesor ${this.NombreUsuario}`;
      }
    });
    console.log('Nombre de usuario:', localStorage.getItem('correo'));
    console.log('Token:', localStorage.getItem('token'));
    console.log('isLoggedIn:', localStorage.getItem('isLoggedIn'));
  }

  ionViewDidEnter() {
    this.content.scrollToTop(300);
  }



  IrMisCursos() {
    this.Router.navigate(['/mis-cursos'],{ queryParams: { NombreUsuario: this.NombreUsuario } });
  }


  IrInicioProfesor() {
    this.Router.navigate(['/inicio-profesor'], { queryParams: { NombreUsuario: this.NombreUsuario } });
  }

  cerrarSesion() {
    this.NombreUsuario = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('correo');
    this.Router.navigate(['/login']);
  }
}
