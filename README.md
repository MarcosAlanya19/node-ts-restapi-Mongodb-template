# Validacion de usuarios
En esta parte del proyecto, se realiza la parte de roles y asimismo se realiza el uso JsonWebToken para validacion de los usuarios.

## Dependencias de producción:
- **`jsonwebtoken`**: Herramienta para encriptar un obj/json de una data, preferente no guardar data sensible, como contraseñas, porque es facil de descencriptar.

## Middlewares
- **`validate-jwt`**: Verifica que el token colocado en el header, sea uno valido, para poder continuar.
- **`validate-roles`**: Realiza una verificacion de existencia de roles, en caso uno de estos autorizados no exista, se brinda un mensaje mencionando los roles necesarios.
- **`generateJWT`**: Genera un jwt en base al id del usuario, para futuras autentificaciones.

## Otros
- **`userRouter.Delete`**
- **`auth.controler`**: Realiza una verificación del usuario, al primero realziar una verificación de que el email, es existente, de que su state es true y de que su contraseña sea correcta, por ultimo genera un token mediante el uuid gracias al jwt
