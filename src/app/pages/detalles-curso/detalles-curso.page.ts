import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioApi } from '../../services/ServicioApi.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-detalles-curso',
  templateUrl: './detalles-curso.page.html',
  styleUrls: ['./detalles-curso.page.scss'],
})
export class DetallesCursoPage implements OnInit {
  CursoId: any | null = null;
  cursoData: any;
  clasesData: any;
  mensaje: string | null= null;

  constructor(private route: ActivatedRoute, private router: Router, private servicioApi: ServicioApi) { }

  ngOnInit() {
    const correo = localStorage.getItem('correo') || '';
    const token = localStorage.getItem('token') || '';
    this.route.queryParams.subscribe(params => {
      const nombreUsuario = params['NombreUsuario'];
      const cursoId = params['CursoId'];
      console.log('NombreUsuario:', nombreUsuario);
      console.log('CursoId:', cursoId);
      this.servicioApi.obtenerCurso(cursoId,correo,token).subscribe(
        data => {
          console.log('Curso obtenido:', data);
          if (data.message === "Success") {
            this.mensaje = data.message;
            this.cursoData = data.curso;
            this.clasesData = data.clases;
          } else {
            alert('No se pudo obtener el curso: ' + data.message);
          }
        },
        error => {
          console.error('Error al obtener el curso:', error);
          alert('Ocurrió un error al obtener el curso.');
        }
      );
    });



  }

 CrearClase() {
  console.log('CrearClase');
 }
}
