# Instrucciones para Ejecutar las Pruebas Unitarias

## Punto No. 3 (20%) - Pruebas Unitarias

Se han creado las pruebas unitarias para el componente `ListarVehiculosComponent` en el archivo:
`src/app/vehiculos/listar-vehiculos/listar-vehiculos.component.spec.ts`

### Pruebas Implementadas:

1. **Prueba principal (requerida)**: Verifica que la tabla se crea con 3 filas más el encabezado cuando hay 3 vehículos
2. Verifica que el componente se crea correctamente
3. Verifica que los datos se muestran correctamente en la tabla
4. Verifica el cálculo de totales por marca
5. Verifica que se muestran los totales en el DOM
6. Verifica las columnas del encabezado
7. Verifica la inicialización del componente
8. Verifica que se llama al servicio correctamente

### Características:

- **Usa Faker** (`@faker-js/faker`) para generar datos de prueba dinámicos
- **Mock del servicio** usando spyOn
- **Verifica el DOM** usando DebugElement y By.css
- **Conteo dinámico** de marcas sin hardcodear valores

### Comando para Ejecutar las Pruebas:

```bash
ng test
```

### Comando para Ejecutar Solo las Pruebas del Componente de Vehículos:

```bash
ng test --include='src/app/vehiculos/listar-vehiculos/listar-vehiculos.component.spec.ts'
```

### Comando para Ejecutar con Cobertura:

```bash
ng test --code-coverage
```

### Nota Importante:

Si encuentras problemas con la ejecución de pruebas debido a configuración de estilos o cache:

1. Limpia la caché de Angular:
```bash
rm -rf .angular
```

2. Reinstala las dependencias:
```bash
npm install
```

3. Ejecuta las pruebas en modo headless:
```bash
ng test --no-watch --browsers=ChromeHeadless
```

## Estructura de las Pruebas:

### Función Helper: `generateMockVehiculos(count: number)`
Genera vehículos mock usando Faker con:
- Marcas aleatorias de un array predefinido
- Modelos, tipos y colores aleatorios
- Años y kilometraje dentro de rangos realistas

### Principales Assertions:
- `expect(tableRows.length).toBe(3)` - Verifica 3 filas de datos
- `expect(headerRow).toBeTruthy()` - Verifica que existe el encabezado
- `expect(headerCells.length).toBe(4)` - Verifica 4 columnas (#, Marca, Línea, Modelo)
- Verifica el contenido de cada celda contra los datos mock
- Verifica el cálculo dinámico de totales por marca

¡Las pruebas están listas y cumplen con el requisito del punto 3!

