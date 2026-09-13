# RutaControl — EPE1 Desarrollo Full Stack IPCHILE

RutaControl es un prototipo web interactivo para apoyar las operaciones de una empresa de logística de última milla. El proyecto reemplaza una pantalla estática por un panel que permite practicar diez interacciones independientes con JavaScript, el DOM y eventos del navegador.

## Objetivo y alcance

La aplicación representa una jornada operativa de distribución urbana. Los datos son temporales: no existe backend, base de datos ni persistencia, por lo que todos los cambios viven únicamente mientras la página permanece cargada.

## Estructura

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Estructura HTML5, contenido y controles numerados del 01 al 10. Incluye comentarios por sección. |
| `styles.css` | Diseño visual, tarjetas, estados, controles, accesibilidad de foco y adaptación responsive. |
| `app.js` | Eventos, variables, cálculos, manipulación del DOM, filtrado y validación del formulario. |
| `README.md` | Documentación del proyecto y guía de ejecución. |
| `.gitignore` | Exclusiones estándar para archivos locales y temporales. |

## Interacciones implementadas

1. **Actualización de estado:** confirma la salida de una ruta, cambia el badge y muestra la hora.
2. **Cambio de estado visual:** alterna entre modo normal y contingencia mediante un booleano, atributos ARIA y clases CSS.
3. **Contador operativo:** suma y resta paquetes y renderiza el valor actual.
4. **Mostrar/ocultar detalle:** revela u oculta una incidencia y cambia el texto del botón.
5. **Vista previa en tiempo real:** refleja una nota mientras se escribe, cuenta caracteres y ofrece limpieza.
6. **Selección y cálculo:** convierte explícitamente los valores a `Number` y calcula kg estimados según vehículo y paquetes.
7. **Rango y progreso:** sincroniza porcentaje textual, ancho de barra y estado operativo.
8. **Creación y eliminación dinámica:** crea elementos `li` con `createElement`, permite agregarlos y eliminarlos.
9. **Filtrado de colección:** filtra servicios mediante `data-status` sin recargar la página.
10. **Formulario y validación:** usa `preventDefault()`, valida campos requeridos y entrega mensajes de error o confirmación dentro de la interfaz.

## Ejecución local

No se requiere `npm install` ni dependencias externas. Se puede abrir `index.html` directamente en un navegador. Para probarlo con un servidor HTTP local, ejecutar desde esta carpeta:

```bash
python3 -m http.server 8000
```

Después visitar `http://localhost:8000`.

## Verificación manual sugerida

Cada tarjeta incluye una acción visible y un resultado inmediato. Para una revisión completa, confirmar la salida de ruta; alternar contingencia; aumentar y disminuir paquetes; abrir y cerrar el detalle; escribir y limpiar una nota; seleccionar vehículo e ingresar paquetes; mover el rango; agregar y eliminar una tarea; probar los cuatro filtros; y enviar el formulario vacío y luego completo.

## Publicación

El proyecto está preparado para GitHub Pages porque utiliza rutas relativas y no depende de un proceso de compilación. La rama `main` contiene la versión integrada y la carpeta raíz debe seleccionarse como fuente de Pages.

## Tecnologías

HTML5 semántico, CSS3 responsive y JavaScript moderno ejecutado en el navegador. No se usa persistencia de datos ni servidor.

## Estado de verificación

Las diez interacciones fueron probadas en navegador real y pasan 10/10 aserciones; no se detectaron errores en consola.
