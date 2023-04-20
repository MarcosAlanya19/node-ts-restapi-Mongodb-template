#Validacion de usuarios
Aquí va una breve descripción del proyecto.

##Dependencias de producción:
- **`bcrypt`**: Biblioteca para encriptar contraseñas.
- **`cors`**: Middleware para habilitar CORS en Express.
- **`dotenv`**: Biblioteca para cargar variables de entorno desde un archivo .env.
- **`express`**: Marco de aplicación web para Node.js.
- **`express-validator`**: Biblioteca para validar datos en Express.
- **`mongoose`**: Biblioteca para conectarse y manipular bases de datos MongoDB.

##Dependencias de desarrollo:
- **`eslint`**: Herramienta para encontrar y corregir problemas en el código.
- **`typescript`**: Lenguaje de programación tipado para JavaScript.

##Router de usuarios
El archivo **`routes/users.ts`** contiene el router de usuarios que maneja las peticiones HTTP relacionadas con la gestión de usuarios.

El router utiliza los controladores de Express userCtrlGet, userCtrlPut, **`userCtrlPost`** y userCtrlDelete para manejar las diferentes peticiones HTTP.

El router también utiliza los middlewares existUserById, existEmail, isRoleValidate y validateFields para validar los datos enviados en las peticiones HTTP.

##Controller de Usuarios
- **`usersCtrlGet`**: Controlador para obtener todos los usuarios
- **`userCtrlPost`**: Controlador para crear un nuevo usuario
- **`userCtrlPut`**: Controlador para actualizar un usuario
- **`userCtrlDelete`**: Controlador para eliminar un usuario

##Services de Usuarios
- **`getAllUsers`**: Recibe una solicitud req de Express que puede contener parámetros de consulta para la paginación (limit y from) y devuelve una promesa que resuelve en una tupla que contiene el número total de usuarios y un arreglo de objetos de usuario que cumplen con los parámetros de paginación y que tienen estado true.

- **`createNewUser`**: Recibe un objeto req que representa los datos de un nuevo usuario a crear, y devuelve una promesa que resuelve en el objeto de usuario creado. Antes de guardar el usuario en la base de datos, la contraseña del usuario se cifra con la función encrypt que se importa desde el módulo helpers.


- **`updateUserById`**: Recibe una solicitud req de Express que contiene el identificador del usuario a actualizar (id) y los datos actualizados del usuario. La función actualiza los datos del usuario en la base de datos y devuelve una promesa que resuelve en el objeto actualizado de usuario. Si se proporciona una contraseña en los datos actualizados, se cifra antes de guardarla en la base de datos.

- **`deleteUserById`**: Recibe una solicitud req de Express que contiene el identificador del usuario a eliminar (id). La función cambia el estado del usuario a false en la base de datos y no devuelve ningún valor.
