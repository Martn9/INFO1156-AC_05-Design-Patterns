# Feed de Publicaciones

Este proyecto implementa un feed social sencillo, sin usuarios ni autenticación, centrado en la interacción entre publicaciones, likes y comentarios. La aplicación está pensada para simular una plataforma de contenido visual con lógica de negocio realista pero acotada.

## Requerimientos

- Docker

## Resumen funcional

El sistema permite crear publicaciones con imagen, texto y descripción, y mostrarlas en un feed central. Cada publicación puede recibir likes y comentarios, y esas interacciones modifican cómo se percibe su importancia dentro del feed.

El comportamiento general del producto gira alrededor de tres ideas:

- **contenido**: las publicaciones son la unidad principal del sistema,
- **interacción**: likes y comentarios enriquecen cada publicación,
- **priorización**: el feed puede cambiar de orden según distintos criterios de relevancia.

## Lógica de negocio principal

La lógica del sistema no solo guarda datos, también construye una vista enriquecida del feed. Para cada publicación se calcula información derivada, como la cantidad de interacciones y una puntuación de relevancia que combina actividad reciente con volumen de participación.

Además, antes de persistir comentarios se aplica una validación/moderación para filtrar contenido problemático. El sistema también ejecuta efectos operativos cuando se crean interacciones (por ejemplo trazas y procesos internos de recálculo), reflejando un flujo típico de aplicaciones de contenido.

## Contexto técnico

La solución está construida con NestJS en backend, Prisma ORM y SQLite como almacenamiento local.

La base de datos es fija en `sqlite.db`

## Ejecución:

Para levantar todo el sistema con Docker:

1. `make setup`
2. `make run`

Este comando construye la imagen, instala dependencias dentro del contenedor, aplica migraciones Prisma, genera el cliente y arranca NestJS en modo watch.

En este flujo, los artefactos de compilación y cache de paquetes se mantienen dentro de volúmenes Docker para no ensuciar el directorio del proyecto.

La aplicación queda disponible en:

- `http://localhost:3000`
- `http://localhost:3000/docs`
- `http://localhost:5555` (Prisma Studio - Database Manager)

Comandos útiles:

- `make stop` para detener el contenedor
- `make logs` para ver logs en tiempo real

----

## 1. Patrón Estructural: Adapter (Adaptador)

**Implementado por:** Martin 
**Archivos:** `posts.controller.ts`, `moderation.adapter.ts` (Nuevo), `posts.module.ts`

**Problema:**
El método `createComment` en `PostsController`[cite: 2] estaba fuertemente acoplado a `legacy-moderation.client.ts`[cite: 1]. Como la API legacy devuelve tipos mixtos 
(`string`, `number` u  `object`)[cite: 1], el controlador requería un bloque `if/else` gigante para traducir la respuesta, violando el Principio de Responsabilidad Única.

**Solución:**
Se creó el servicio inyectable `ModerationAdapter` para envolver la llamada al cliente externo. Este adaptador aisla la lógica condicional y 
le expone al controlador una interfaz limpia y tipada (solo devuelve un `isBlocked: boolean` y la `metadata`).

**Beneficios:**
- **Desacoplamiento:** El controlador ya no sabe cómo funciona el sistema legacy.
- **Código Limpio:** Se eliminó la complejidad ciclomática (`if/else`) del controlador[cite: 2].
- **Mantenibilidad:** Si cambia el proveedor de moderación, solo se modifica el adaptador.