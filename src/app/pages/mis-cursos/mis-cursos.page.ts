import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioApi } from '../../services/ServicioApi.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.page.html',
  styleUrls: ['./mis-cursos.page.scss'],
})
export class MisCursosPage implements OnInit {
  NombreUsuario: string | null = null;
  cursos: any[] = [];
  isHydrated: boolean = false; // Cambia esto según tu lógica
  isLoading: boolean = true;


  @ViewChild('listaCursos', { static: true }) listaCursos!: ElementRef<HTMLUListElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioApi: ServicioApi
  ) {}
 
  ngOnInit() {
    const correo = localStorage.getItem('correo') || '';
    const token = localStorage.getItem('token') || '';


    const loadingDuration = 3000;
    this.showLoading(loadingDuration);
    this.servicioApi.obtenerCursos(correo, token).subscribe(
      data => {
        console.log('Cursos obtenidos:', data);
        if (data.message === "Success") {
          this.cursos = data.cursos;
          this.renderCursos();  // Llama a renderizar los cursos una vez que los datos se obtienen
        } else {
          alert('No se pudieron obtener los cursos: ' + data.message);
        }
      },
      error => {
        console.error('Error al obtener los cursos:', error);
        alert('Ocurrió un error al obtener los cursos.');
      }
    );
  }

  showLoading(duration: number) {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false; // Oculta la pantalla de carga después de la duración especificada
    }, duration);
  }

  renderCursos() {
    if (this.listaCursos) {
      const container = this.listaCursos.nativeElement;
  
      container.innerHTML = ''; 
  
      this.cursos.forEach(curso => {
        const card = document.createElement('div');
        card.classList.add('curso-card'); 
        
        card.innerHTML = `
          <img src="${curso.imagen}" alt="${curso.nombre}" class="curso-imagen"/>
          <div class="curso-info"> <!-- Contenedor para la información del curso -->
            <h2 class="curso-nombre">${curso.nombre}</h2>
            <p class="curso-descripcion">${curso.descripcion ? curso.descripcion : 'Sin descripción disponible'}</p>
            <p class="curso-profesor">Profesor: ${curso.usuario.nombre_completo}</p>
            <ion-button class="curso-button" fill="outline" (click)="GenerarQr()">Generar QR</ion-button>
          </div>
        `;
        container.appendChild(card);
      });
    }
  }
  
  

  cerrarSesion() {
    this.NombreUsuario = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('correo');
    this.router.navigate(['/login']);
  }

  IrInicioProfesor() {
    this.router.navigate(['/inicio-profesor'], { queryParams: { NombreUsuario: this.NombreUsuario } });
  }

  IrCrearCurso() {
    this.router.navigate(['/crear-curso'], { queryParams: { NombreUsuario: this.NombreUsuario } });
  }
  

  VerDetallesCurso(curso: any) {
    console.log('Ver detalles del curso:', curso);
    this.router.navigate(['/detalles-curso'], { queryParams: { NombreUsuario: this.NombreUsuario, CursoId: curso } });
  }

  GenerarQr() {
    console.log('Generar QR');
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let textoQR = '';
    const caracteresLength = caracteres.length;
    for (let i = 0; i < 10; i++) {
      textoQR += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    }
    console.log('entre a generar qr');
    this.router.navigate(['/generar-qr'], { queryParams: { qr: textoQR, NombreUsuario: this.NombreUsuario } });
  }
  
  IrMisCursos() {
    this.router.navigate(['/mis-cursos'], { queryParams: { NombreUsuario: this.NombreUsuario } });
  }
}
