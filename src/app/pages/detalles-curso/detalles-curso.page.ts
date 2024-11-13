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
    console.log(1);
     
  }


 CrearClase() {
  console.log('CrearClase');
 }
}
