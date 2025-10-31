import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo.model';
import { VehiculoService } from '../vehiculo.service';

@Component({
  selector: 'app-listar-vehiculos',
  templateUrl: './listar-vehiculos.component.html',
  styleUrls: ['./listar-vehiculos.component.css']
})
export class ListarVehiculosComponent implements OnInit {
  vehiculos: Vehiculo[] = [];

  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit(): void {
    this.getVehiculos();
  }

  getVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe({
      next: (vehiculos) => {
        this.vehiculos = vehiculos;
      },
      error: (error) => {
        console.error('Error al obtener vehículos:', error);
      }
    });
  }

  getTotalesPorMarca(): { marca: string, total: number }[] {
    const marcas = [...new Set(this.vehiculos.map(v => v.marca))];
    return marcas.map(marca => ({
      marca: marca,
      total: this.vehiculos.filter(v => v.marca === marca).length
    }));
  }
}

