import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { LoadingController, ModalController, Platform, ToastController,IonContent } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ServicioApi } from 'src/app/services/ServicioApi.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.page.html',
  styleUrls: ['./inicio-alumno.page.scss'],
})
export class InicioAlumnoPage implements OnInit {
  @ViewChild('content', { static: false }) content!: IonContent;
  NombreUsuario: string | null = null;
  scanResult: string = '';
  isScanning: boolean = false;
  mostrarEscanear: boolean = true; // Inicialmente, el botón está visible

  private readonly posicionEsperada = { lat: -33.499988525844856, lng: -70.61648427531809 }; 
  private readonly margenDistancia = 500; 

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private platform: Platform,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private toastController: ToastController,
    private servicioApi: ServicioApi,
    
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.NombreUsuario = params['NombreUsuario'];
      const mensajeBienvenida = document.getElementById('MensajeBienvenida');
      if (this.NombreUsuario && mensajeBienvenida) {
        mensajeBienvenida.innerText = `Bienvenido a la aplicación alumno ${this.NombreUsuario}`;
      }
    });
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }
  async verificarPosicion() {
    try {
      let position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true, // Usar alta precisión
        timeout: 10000, // Esperar hasta 10 segundos para obtener una ubicación precisa
        maximumAge: 0, // Fuerza la actualización; no usa caché

      });
  
      console.log('Posición actual:', position.coords.latitude, position.coords.longitude);
      console.log(`Coordenadas esperadas: ${this.posicionEsperada.lat}, ${this.posicionEsperada.lng}`);
  
      let distancia = this.calcularDistancia(
        position.coords.latitude,
        position.coords.longitude,
        this.posicionEsperada.lat,
        this.posicionEsperada.lng
      );
  
      console.log(`Distancia calculada: ${distancia} metros`);
  
      if (distancia <= this.margenDistancia) {
        this.startScan();
      } else {
        this.mostrarEscanear = false;
        alert(`Estás fuera del margen permitido. Distancia: ${distancia.toFixed(2)} metros`);
      }
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      alert('Error al obtener la ubicación');
    }
  }

  private calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number): number {
    let R = 6371e3; // Radio de la Tierra en metros
    let rad = Math.PI / 180;
    let φ1 = lat1 * rad;
    let φ2 = lat2 * rad;
    let Δφ = (lat2 - lat1) * rad;
    let Δλ = (lng2 - lng1) * rad;

    let a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distancia en metros
  }

  ionViewDidEnter() {
    this.content.scrollToTop(300);
  }

  cerrarSesion() {
    this.NombreUsuario = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('correo');
    
    this.router.navigate(['/login']);
  }

  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: { formats: [], lensFacing: 'back' }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      this.scanResult = data?.barcode?.displayValue;
      if (this.scanResult) {
        this.servicioApi.RegistrarAsistencia(this.scanResult, localStorage.getItem('correo') as string, localStorage.getItem('token') as string).subscribe(
          data => {
            console.log('Asistencia registrada:', data);
            if (data.message === "Asistencia registrada con éxito") {
              alert('Asistencia registrada con éxito.');
            } else if (data.message === "Ya has registrado tu asistencia") {
              alert('Ya has registrado tu asistencia');
            }
          },
          error => {
            console.error('Error al registrar la asistencia:', error);
            alert('Ocurrió un error al registrar la asistencia.');
          }
        );
      }
    }
  }


}
