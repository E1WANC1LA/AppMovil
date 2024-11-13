import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServicioApi } from '../../services/ServicioApi.service';


@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.page.html',
  styleUrls: ['./crear-curso.page.scss'],
})
export class CrearCursoPage implements OnInit {

  NombreUsuario: string | null = null;

  constructor(private route: ActivatedRoute, private Router: Router, private ServicioApi: ServicioApi) { }

  ngOnInit() {
  }




  IrMisCursos(){
    this.Router.navigate(['/mis-cursos']);
  }

  CrearCurso(){
    let nombreCurso = document.getElementById('nombreCurso') as HTMLInputElement;
    let descripcionCurso = document.getElementById('descripcionCurso') as HTMLInputElement;
    let siglaCurso = document.getElementById('siglaCurso') as HTMLInputElement;
    let institucionCurso = document.getElementById('institucionCurso') as HTMLInputElement;
    let nombre = nombreCurso.value;
    let descripcion = descripcionCurso.value;
    let sigla = siglaCurso.value;
    let institucion = institucionCurso.value;
    let msg = '';
    if (nombre === '') {
      msg += 'Debes ingresar un Nombre\n';
    }
    if (descripcion === '') {
      msg += 'Debes ingresar una Descripción\n';
    }
    if (sigla === '') {
      msg += 'Debes ingresar una Sigla\n';
    }
    if (institucion === '') {
      msg += 'Debes ingresar una Institución\n';
    }
    if (msg !== '') {
      console.log(nombre, descripcion, sigla, institucion);
      alert(msg);
      return;
    }

    this.ServicioApi.crearCurso(nombre, descripcion, sigla, institucion, localStorage.getItem('correo') as string, localStorage.getItem('token') as string).subscribe(
      data => {

        console.log('Login successful:', data);
        if (data.message === "Curso creado exitosamente") {
          alert('Curso creado exitosamente');
          this.Router.navigate(['/mis-cursos']);

        } else {
          alert('Creacion Fallida: ' + data.message);
        }
      },
      error => {
        console.error('Login error:', error);
        alert('ERROR.');
      }
    );

  }
}
