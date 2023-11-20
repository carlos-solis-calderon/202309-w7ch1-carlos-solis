## Express (backend)

- Nos permite levantar el servidor.
  Se caracteriza por tener funciones que se conectan entre sí, capa por capa. Una función ejecuta otra y así sucesivamente. (Ver app.use() en app.ts). Lo que nos interesa regresar en nuestros proyectos es un archivo JSON.

- Encapsula la request y la result.

- Una App en express es una cadena de middlewares que enrutan las respuestas dependiendo de la petición.

createServer():

Los server tienen varios métodos:
.on() Nos permite escuchar eventos

### Métodos que tiene:

Variantes de .use()

- get()
- .post()
- .patch()
- .delete()

En todos, sus parámetros es('la ruta de la petición, ej: /users')

### app.ts

Importamos express entero y luego lo ejecutamos express(): esto me devuelve una app express que vamos a exportar e importar en index

## Midlewares: Instalación extra que nos va a ayudar con Express para que puda funcionar como API y no quedarse atascada con Cores.

Son funciones intermedias dentro de express, que siempre mantienen 4 parámetos opcionales: get, post, patch, delete

Características:
Siempre ven qué hay en la request.

**Cors** Es una tecnología de protección de los servidores. Actúa como mecanismo de seguridad que, por ejemplo, intentas acceder a una API desde un origen distinto de la petición, entonces los cores bloquean el paso a la información de la API. Esto nos permite darle seguridad a nuestas APIs privadas, por ejemplo, de una empresa para que no todo mundo pueda entrar desde cualquier sitio. Lo implementan los navegadores, en postman no existe.

`npm i cors`
`npm i -D @types/cors`

## Instalación de loger llamado Morgan:

Nos permite ver en consola de desarrollo las peticiones que se han hecho al servidor, por ejemplo, GET.

`npm i morgan`
`npm i -D @types/morgan`

Lo importamos en App y lo ejecutamos

## Router

Es un archivo que creamos dentro de una carpeta router y sirve para definir las rutas de nuestro servidor.
