import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarVehiculosComponent } from './listar-vehiculos/listar-vehiculos.component';

@NgModule({
  declarations: [
    ListarVehiculosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListarVehiculosComponent
  ]
})
export class VehiculosModule { }

