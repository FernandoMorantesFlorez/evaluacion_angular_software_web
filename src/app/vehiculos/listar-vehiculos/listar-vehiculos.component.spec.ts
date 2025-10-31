import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';

import { ListarVehiculosComponent } from './listar-vehiculos.component';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../vehiculo.model';

describe('ListarVehiculosComponent', () => {
  let component: ListarVehiculosComponent;
  let fixture: ComponentFixture<ListarVehiculosComponent>;
  let debug: DebugElement;
  let vehiculoService: VehiculoService;

  // Función para generar vehículos de prueba con Faker
  const generateMockVehiculos = (count: number): Vehiculo[] => {
    const vehiculos: Vehiculo[] = [];
    const marcas = ['Renault', 'Chevrolet', 'Nissan', 'Toyota', 'Ford'];
    
    for (let i = 0; i < count; i++) {
      vehiculos.push(new Vehiculo(
        i + 1,
        faker.helpers.arrayElement(marcas),
        faker.vehicle.model(),
        faker.vehicle.type(),
        faker.number.int({ min: 2010, max: 2023 }),
        faker.number.int({ min: 5000, max: 150000 }),
        faker.vehicle.color(),
        faker.image.url()
      ));
    }
    
    return vehiculos;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVehiculosComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ VehiculoService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarVehiculosComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    vehiculoService = TestBed.inject(VehiculoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener una tabla con 3 filas más el encabezado cuando hay 3 vehículos', () => {
    // Arrange: Crear 3 vehículos mock
    const mockVehiculos = generateMockVehiculos(3);
    
    // Espiar el servicio y retornar los vehículos mock
    spyOn(vehiculoService, 'getVehiculos').and.returnValue(of(mockVehiculos));
    
    // Act: Inicializar el componente
    fixture.detectChanges();
    
    // Assert: Verificar que existen las filas correctas
    const tableRows = debug.queryAll(By.css('tbody tr'));
    expect(tableRows.length).toBe(3);
    
    // Verificar que existe el encabezado
    const headerRow = debug.query(By.css('thead tr'));
    expect(headerRow).toBeTruthy();
    
    // Verificar que el encabezado tiene 4 columnas (#, Marca, Línea, Modelo)
    const headerCells = debug.queryAll(By.css('thead th'));
    expect(headerCells.length).toBe(4);
  });

  it('debería mostrar los datos correctos en la tabla', () => {
    // Arrange: Crear vehículos específicos para verificar datos
    const mockVehiculos = generateMockVehiculos(3);
    spyOn(vehiculoService, 'getVehiculos').and.returnValue(of(mockVehiculos));
    
    // Act
    fixture.detectChanges();
    
    // Assert: Verificar que los datos se muestran correctamente
    const tableRows = debug.queryAll(By.css('tbody tr'));
    
    tableRows.forEach((row, index) => {
      const cells = row.queryAll(By.css('td'));
      expect(cells[0].nativeElement.textContent.trim()).toBe(mockVehiculos[index].marca);
      expect(cells[1].nativeElement.textContent.trim()).toBe(mockVehiculos[index].linea);
      expect(cells[2].nativeElement.textContent.trim()).toBe(mockVehiculos[index].modelo.toString());
    });
  });

  it('debería calcular correctamente el total de vehículos por marca', () => {
    // Arrange: Crear vehículos con marcas específicas
    const mockVehiculos: Vehiculo[] = [
      new Vehiculo(1, 'Renault', 'Kangoo', 'VU Express', 2017, 93272, 'Blanco', 'url1'),
      new Vehiculo(2, 'Chevrolet', 'Spark', 'Life', 2018, 55926, 'Plata', 'url2'),
      new Vehiculo(3, 'Renault', 'Sandero', 'Authentique', 2020, 25629, 'Rojo', 'url3')
    ];
    
    spyOn(vehiculoService, 'getVehiculos').and.returnValue(of(mockVehiculos));
    
    // Act
    fixture.detectChanges();
    
    // Assert
    const totales = component.getTotalesPorMarca();
    
    expect(totales.length).toBe(2); // Renault y Chevrolet
    
    const totalRenault = totales.find(t => t.marca === 'Renault');
    const totalChevrolet = totales.find(t => t.marca === 'Chevrolet');
    
    expect(totalRenault?.total).toBe(2);
    expect(totalChevrolet?.total).toBe(1);
  });

  it('debería mostrar los totales por marca en el DOM', () => {
    // Arrange
    const mockVehiculos = generateMockVehiculos(5);
    spyOn(vehiculoService, 'getVehiculos').and.returnValue(of(mockVehiculos));
    
    // Act
    fixture.detectChanges();
    
    // Assert: Verificar que se muestran los totales
    const totalesElements = debug.queryAll(By.css('.total-marca'));
    expect(totalesElements.length).toBeGreaterThan(0);
    
    // Verificar que cada total tiene el formato correcto
    totalesElements.forEach(element => {
      const text = element.nativeElement.textContent;
      expect(text).toContain('Total');
      expect(text).toMatch(/Total .+: \d+/);
    });
  });

  it('debería tener el encabezado de la tabla con las columnas correctas', () => {
    // Arrange
    const mockVehiculos = generateMockVehiculos(1);
    spyOn(vehiculoService, 'getVehiculos').and.returnValue(of(mockVehiculos));
    
    // Act
    fixture.detectChanges();
    
    // Assert
    const headerCells = debug.queryAll(By.css('thead th'));
    
    expect(headerCells[0].nativeElement.textContent.trim()).toBe('#');
    expect(headerCells[1].nativeElement.textContent.trim()).toBe('Marca');
    expect(headerCells[2].nativeElement.textContent.trim()).toBe('Línea');
    expect(headerCells[3].nativeElement.textContent.trim()).toBe('Modelo');
  });

  it('debería inicializar con un array vacío de vehículos', () => {
    expect(component.vehiculos).toEqual([]);
  });

  it('debería llamar al servicio getVehiculos al inicializar', () => {
    // Arrange
    const mockVehiculos = generateMockVehiculos(3);
    const spy = spyOn(vehiculoService, 'getVehiculos').and.returnValue(of(mockVehiculos));
    
    // Act
    component.ngOnInit();
    
    // Assert
    expect(spy).toHaveBeenCalled();
  });
});

