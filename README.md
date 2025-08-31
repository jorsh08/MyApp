## Iniciar proyecto

## API
https://github.com/jorsh08/MyBackend

example.env -> .env

1. Instalar dependecias

   ```bash
   npm install
   ```

2. Correr la aplicación

   ```bash
   npx expo start
   ```


## Estructura del Proyecto

```text
MyApp/
├── app/                      # Pantallas y navegación principal
│   ├── _layout.tsx           # Layout principal de la app
│   ├── adapters/             # Adapter Pattern
│   │   └── TokenStorageAdapter.ts
│   ├── interfaces/           # Interfaces para solicitudes y respuestas
│   │   ├── LoginRequest.ts
│   │   ├── LoginResponse.ts
│   │   ├── SignUpRequest.ts
│   │   └── SignUpResponse.ts
│   ├── models/               # Modelos de datos
│   │   └── User.ts
│   ├── providers/            # Proveedores de contexto
│   │   └── AuthProvider.tsx
│   ├── repositories/         # Repository Pattern
│   │   └── UserRepository.ts
│   ├── screens/              # Pantallas de la app
│   │   ├── Home.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   └── Welcome.tsx
│   ├── services/             # Servicios (API, etc.)
│   │   └── ApiService.ts
│   └── strategies/           # Strategy Pattern (login métodos)
│       ├── SignIn/
│       │   ├── GoogleLogin.ts
│       │   ├── LoginStrategy.ts
│       │   └── UsernameLogin.ts
│       └── SignUp/
│           ├── GoogleSignUp.ts
│           ├── SignupStrategy.ts
│           └── UsernameSignUp.ts
├── assets/                   # Imágenes, íconos, fuentes
│   ├── fonts/
│   │   └── SpaceMono-Regular.ttf
│   └── images/
│       ├── adaptive-icon.png
│       ├── favicon.png
│       ├── icon.png
│       ├── partial-react-logo.png
│       ├── react-logo.png
│       ├── react-logo@2x.png
│       ├── react-logo@3x.png
│       └── splash-icon.png
├── example.env               # Variables de entorno ejemplo
├── app.config.js             # Configuración de Expo
├── app.json                  # Configuración de la app
├── eslint.config.js          # Configuración de ESLint
├── expo-env.d.ts             # Tipos para Expo
├── package.json              # Dependencias y scripts
├── package-lock.json         # Lock de dependencias
├── README.md                 # Este archivo
└── tsconfig.json             # Configuración de TypeScript
```

## Librerías para formularios y validación

Este proyecto utiliza **Formik** para la gestión eficiente de formularios en React Native, facilitando el manejo de estados, errores y envío de datos. Además, se emplea **Yup** para definir y validar los esquemas de los formularios de manera declarativa y robusta. Ambas librerías permiten crear formularios seguros, mantenibles y con una mejor experiencia de usuario.

### Adapter

La arquitectura Adapter responsable de la gestión de la llave del token utilizada en las solicitudes a la API. Actualmente, se emplea `expo-secure-store` para almacenar y recuperar el token de manera segura en el dispositivo. Esta abstracción permite que, si en algún momento se requiere cambiar el mecanismo de almacenamiento (por ejemplo, migrar a `AsyncStorage`), solo sea necesario modificar este documento, manteniendo el resto de la aplicación desacoplada y flexible ante futuros cambios.

#### Métodos implementados

- **saveToken(token)**
   Guarda el token de acceso de forma segura en el dispositivo.

- **getToken()**
   Recupera el token almacenado para utilizarlo en las solicitudes a la API.

- **removeToken()**

### Repository

Arquitectura Repository responsable de construir y gestionar las solicitudes y respuestas hacia los servicios que consumen la API. Centralizan la lógica de comunicación, permitiendo mantener el código organizado y desacoplado de los detalles de la implementación del servicio.

#### Métodos en `UserRepository`

- **getUsers(token)**
   Obtiene la lista de usuarios autenticados usando el token proporcionado.

- **signUp(request)**
   Realiza el registro de un nuevo usuario enviando los datos requeridos a la API.

- **signIn(username, password)**
   Inicia sesión enviando las credenciales y recibe la respuesta de autenticación.


### Strategy

La arquitectura Strategy se implementa para gestionar las diferentes formas de autenticación y registro en la aplicación. Permite seleccionar dinámicamente el método de login o signup, ya sea mediante usuario/contraseña o de forma simulada con Google, facilitando la extensión y el mantenimiento del código.

#### Estrategias implementadas

- **LoginStrategy**
   Interfaz base para definir el método de autenticación.

- **UsernameLogin**
   Estrategia que permite iniciar sesión utilizando usuario y contraseña.

- **GoogleLogin**
   Estrategia simulada para iniciar sesión con Google.

- **SignupStrategy**
   Interfaz base para definir el método de registro.

- **UsernameSignUp**
   Estrategia que permite registrar usuarios con usuario y contraseña.

- **GoogleSignUp**
   Estrategia simulada para registrar usuarios con Google.


### Interfaces para solicitudes y respuestas a la API

Se crearon interfaces específicas para tipar las solicitudes y respuestas que se realizan hacia la API, facilitando el desarrollo, la validación y el mantenimiento del código. Estas interfaces permiten definir claramente la estructura esperada en cada operación de autenticación.

#### Interfaces implementadas

- **LoginRequest**
   Define los datos requeridos para iniciar sesión: `username` y `password`.

- **LoginResponse**
   Estructura la respuesta al iniciar sesión, incluyendo el `token`, información del usuario y posibles mensajes de error.

- **SignUpRequest**
   Especifica los datos necesarios para el registro de usuario: `username` y `password`.

- **SignUpResponse**