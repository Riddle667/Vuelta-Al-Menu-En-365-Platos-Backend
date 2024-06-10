# Vuelta al Menú en 365 Platos - Backend

## Descripción del Proyecto
Este es un proyecto en el cual se construye una API para un servicio de delivery de comida, similar a Uber Eats, con funcionalidades avanzadas como geolocalización de repartidores y pagos en línea utilizando las APIs de Google Maps y Mercado Pago. El objetivo es comprender los aspectos fundamentales de NodeJS, utilizando NodeJS, Express, MySQL y Sequelize.

![NODE Express and MySQL logo](https://miro.medium.com/v2/resize:fit:1400/1*_v_pedAJHn3NzW6prKDRdA.png)

## Tecnologías Utilizadas
- NodeJS
- Express
- MySQL
- Sequelize

# Instalación y Configuración

## Software Necesario
- Node: [Descargar Node](https://nodejs.org/en/download/current)
- Nodemon: [Descargar Nodemon](https://www.npmjs.com/package/nodemon)
- XAMPP (Gestor de base de datos): [Descargar XAMPP](https://www.apachefriends.org/index.html)

## Pasos de Ejecución
1. Instalar XAMPP.
2. Configurar la base de datos en XAMPP.
3. Copiar el archivo `.env.example` y nombrarlo como `.env`.
4. Configurar las variables de entorno del archivo `.env`, asegurándote de generar una contraseña alfanumérica para la variable de entorno `SECRET_OR_PRIVATE_KEY`.
5. **Instalar las dependencias del proyecto**:
    ```sh
    npm install
    ```
    Este paso es crucial ya que instala todas las bibliotecas y módulos necesarios para que el proyecto funcione correctamente.
6. Ejecutar las migraciones para crear las tablas con el comando:
    ```sh
    npx sequelize-cli db:migrate
    ```
7. Ejecutar el proyecto de manera local con el comando:
    ```sh
    npx nodemon app
    ```
8. ¡Disfruta del APIRest!

## Uso
- **Registro e Inicio de Sesión**: Los usuarios pueden registrarse y iniciar sesión en la aplicación.
- **Rastreo de Repartidores**: Utiliza la geolocalización para rastrear a los repartidores en tiempo real.
- **Realizar Pedidos**: Agrega productos al carrito y realiza pedidos.
- **Pago en Línea**: Completa el pedido realizando pagos a través de Mercado Pago.
- **Tipos de Usuarios**: La aplicación soporta tres tipos de usuarios: clientes, repartidores y administradores.

## API Endpoints

### Autenticación
- **POST /api/auth/register**: Registra un nuevo usuario.
- **POST /api/auth/login**: Inicia sesión.

### Categorías
- **POST /api/categories/create-category**: Crea una nueva categoría.
- **GET /api/categories/show-category**: Muestra las categorías disponibles.

### Pedidos
- **POST /api/orders/manage-cart**: Gestiona el carrito de compras.

### Productos
- **POST /api/products/create-product**: Crea un nuevo producto.
- **GET /api/products**: Obtiene la lista de productos disponibles.
- **GET /api/products/:id**: Obtiene los detalles de un producto específico.
- **PUT /api/products/update-product/:id**: Actualiza un producto.
- **DELETE /api/products/delete-product/:id**: Elimina un producto.

### Upload
- **POST /api/upload/:collection/:id**: Sube imagenes a cloudinary.

### Usuarios
- **GET /api/users/**: Obtiene la información del usuario.
- **POST /api/users/change-password**: Cambia la contraseña del usuario.

**Nota:** Las rutas listadas son las que se llevan en el proyecto hasta ahora.

## Autor
Andrew Morales Díaz, integrante del equipo Coleman.

