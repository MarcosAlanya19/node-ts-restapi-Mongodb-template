# Validacion de usuarios
En esta parte del proyecto se logea con un cuenta de google existente, donde se jalara la data requerida, para su uso, asimismo con un btn de deslogueo.
## Guia Google
https://developers.google.com/identity/gsi/web/guides/verify-google-id-token?hl=es-419
## EndPoints
https://documenter.getpostman.com/view/22863494/2s93Y5QfPd#565cdad8-13be-4538-b161-d48e10e53d86

## Dependencias de producción:
- **`google-auth-library`**: Brinda las funciones y accesos, para poder conectarse con la authenticación de google
## Helpers
- **`google-verify`**: Se encarga de verificar que el usuario existe, al final obteniendo data importante para su uso.
  
## Controllers
- **`auth.controler - googleSignIn`**: Realiza una verificacion mediante el email, si el usuario ya esta registrado en la DB, caso contrario, lo crea, asimismo dandole un token mediante su uuid

## Public
- **`index.html`**: Muestra el btn para poder verificar el usuario mediante una cuenta de google, todo gracias a la documentacion de la Guia de google
