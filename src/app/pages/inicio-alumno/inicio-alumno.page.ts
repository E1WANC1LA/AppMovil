import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { LoadingController, ModalController, Platform, ToastController,IonContent } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';


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

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private platform: Platform,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private toastController: ToastController,
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
        alert('Escaneado: '+ this.scanResult);
      }
    }
  }


}
