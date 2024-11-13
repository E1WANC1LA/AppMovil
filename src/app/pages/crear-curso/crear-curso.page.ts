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
  console.log("Crear Curso");
  }
}
