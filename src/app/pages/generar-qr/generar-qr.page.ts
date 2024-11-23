import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQRPage implements OnInit {
  CodigoClase: string | null = "";
  QrTexto = "Texto QR";
  NombreUsuario: string | null = null;
  CursoId: any | null = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.CodigoClase = params['CodigoClase'] || null;
      this.NombreUsuario = params['NombreUsuario'] || null
      this.QrTexto = this.CodigoClase || '';
      this.CursoId = params['CursoId'] || null;
      console.log("CodigoClase:", this.CodigoClase, "NombreUsuario:", this.NombreUsuario, "CursoId:", this.CursoId);
    });
  }


  VolverDetallesCurso() {
    this.router.navigate(['/detalles-curso'], { queryParams: { CursoId: this.CursoId } });
  }

}