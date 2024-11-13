import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioAlumnoPageRoutingModule } from './inicio-alumno-routing.module';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { InicioAlumnoPage } from './inicio-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioAlumnoPageRoutingModule
  ],
  declarations: [InicioAlumnoPage,BarcodeScanningModalComponent]
})
export class InicioAlumnoPageModule {}
