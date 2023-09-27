# Oneboarding-IT
(BACKEND) 
Documentación de la API de Oneboarding-It

## Tecnologías/librerías empleadas
- NodeJs
- Express
- Sequelize (MySQL)
- JSON Web Tokens (JWT)

## Requisitos
- Tener instalado Node.js
- Configurar un servidor de base de datos, ya sea con WAMP, XAMPP o instalando MySQL manualmente
- Utilizar una herramienta como Postman para enviar las peticiones

## Cómo poner en funcionamiento
1. Clonar el repositorio.
2. Instalar las dependencias con `npm install`.
3. Crear un archivo para las variables de entorno si no lo tenemos, como `.env`, y completarlo en base al ejemplo del `.env.example` que incluye el repositorio. Esto incluye los datos del servidor de MySQL, el puerto del servidor Express (por ejemplo, 8080) y la clave utilizada para la firma de los tokens.
4. Ejecutar la API con `npm start`.

## Endpoints
- Las peticiones locales se realizan por `localhost:8080`.

### /usuarios
- La ruta `/usuarios` permite los cuatro tipos de solicitudes para el CRUD de usuarios.
- Para agregar un usuario, se deben incluir las propiedades `nombres`, `apellidos`, `domicilio`, `dni`, `email`, `clave`, `fechaalta`, `encargadoalta`, `area_idarea` y `cargo_idcargo`.
- La ruta `/usuarios` también tiene otro endpoint llamado `/login` que se utiliza para la autenticación. Se requiere el nombre de usuario y contraseña.
- Al autenticar, se asigna un token para ese usuario que permite realizar acciones en rutas protegidas, como `/vacantes`.
- El token expira en una hora.
- Para realizar una acción en una ruta protegida, se debe pasar el token en el encabezado de la petición como valor de `Authorization`. Por ejemplo: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5NDYyMTg1OCwiZXhwIjoxNjk0NjI1NDU4fQ.FIMdgkdKC6lhna_YlATjtRG8CXtlZkiXD6zFPcUtQE4`


### /postulantes
- Peticiones que acepta: GET, POST, PUT y DELETE.
- Propiedades: `nombres`, `apellidos`, `dni`, `fecha_nac`, `tel_movil`, `domicilio`, `email`, `clave`, `fechaalta` y `encargadoalta`.


### /clientes
- Peticiones que acepta: GET, POST, PUT y DELETE.
- Propiedades: `nombres`, `apellidos`, `dni`, `fecha_nac`, `celular`, `domicilio`, `email`, `clave`, `nroafiliado`, `fechaalta`, `encargadoalta` y `edad`.

### /posts
- Peticiones que acepta: GET, POST, PUT y DELETE.
- Propiedades: `skills`, `descripcion`, `initialDate` y `finalDate`.

## Códigos de estados
- Las rutas pueden retornar los siguientes códigos de estado HTTP:
- 200 si la solicitud se completó con éxito
- 201 cuando se crea un recurso
- 400 cuando no se puede realizar una acción
- 401 si los datos proporcionados no son válidos
- 403 acceso denegado
- 404 not found
- 500 en caso de un problema con el servidor
