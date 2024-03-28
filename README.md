# Node.js Express Core API Starter library with Sequelize

Welcome to the Node.js Express Core API Starter library with Sequelize! 🚀

## Overview

This library serves as a powerful starting point for developing an REST API in Node.js. It's designed to simplify and accelerate your API development process by providing a generic and extensible structure based on Sequelize database models.

## Features

- **Seamless Integration**: Easily connect to your PostgreSQL, MySQL, SQLite, or other supported databases using Sequelize.
- **Generic Structure**: Quickly set up API endpoints, controllers, and routes for any data model, making it highly adaptable for various applications.
- **CRUD Operations**: Standardize Create, Read, Update, and Delete operations with minimal configuration.
- **Authentication**: Add authentication and authorization mechanisms to secure your API endpoints.
- **Middleware Support**: Easily incorporate middleware for custom logic, validation, and request processing.
- **Error Handling**: Robust error handling to provide informative responses and log errors.

<!-- ## Getting Started

To get started with this library, follow our [detailed documentation](link-to-documentation) for step-by-step instructions. -->

## Usage

### First step

Add files from this repository to your project's root folder.

### Second step

Add the following dependencies to your package.json file:

```json
{
  "dependencies": {
    "bcrypt": "^5.1.1",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2", // if you want to provide authentication
    "pg": "^8.11.3", // if you want to use postgres as your dialect
    "sequelize": "^6.32.1"
  }
}
```

### Third step

In your main application file, add the following options:

```javascript
// app.js file for example

const express = require("express");
require("dotenv").config();

const expressCoreApi = require("./express-core-api");
const app = express();

app.use(
  expressCoreApi({
    routes: {
      modelsPath: __dirname + "your sequelize models path",
      generateRoutes: true,
      middlewares: [],
    },
    authentication: {
      provide: true,
    },
  })
);

library.exports = app;
```

## Database connection

To connect to the database using sequelize, just pass the environment variables with the following names in your dot env file:

```javascript
DATABASE_HOST=your_host
DATABASE_NAME=your_database_name
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_DIALECT=your_database_dialect
DATABASE_PORT=your_database_port
DATABASE_TIMESTAMP=true
DATABASE_UNDERSCORED=true
DATABASE_UNDERSCORED_ALL=true
DATABASE_POLL_MAX=10
DATABASE_POLL_MIN=0
DATABASE_POLL_ACQUIRE=30000
DATABASE_POLL_IDLE=10000
```

Some of the variables are already defined with default values, according to the sequelize documentation, while others such as the host, database name, user, password and dialect must be defined for the connection to be made.

## Options

This library provides some features that can be activated or not, according to the parameters passed at initialization.

### Routes

To generate routes from your database models you must pass the "generateRoutes" attribute as true within the "routes" object in the initialization options.

```javascript
routes: {
  modelsPath: __dirname + "your sequelize models path",
  generateRoutes: true,
  middlewares: [],
}
```

This option is true by default, but if a false value is assigned, the service will ignore the path of the models passed, as well as the middlewares.

---

### Authentication

If you want to add authentication using Json Web Tokens, you will need to pass the "provide" attribute as true in the "authentication" object within the options.

```javascript
authentication: {
  provide: true,
}
```

This functionality is true by default, but can be disabled by setting the value of the "provide" attribute to false.

After that, you will need to define an environment variable that stores your jwt's secret key with the following nomenclature:

```javascript
JWT_KEY=your_secret_key
```

Once configured, the system's routes will be protected, and to access them it will be necessary to create a user. 
Two routes will be available and must be used to create a login and give authorization to a user.


#### First route is "/create-auth"

This route will be used to register a new login to the system:

```json
{
	"login_name": "Example name",
	"login_email": "example@email.com",
	"login_password": "example_password",
	"login_type": "EXAMPLE" // You will need to define your own login types
}
```
 - Obs: In the "login_type" property you will need to define your own login types. With different types you can allow access to specific routes or pages in your system.


#### Second route is "/auth":

This route will be used to validate the login registered in the previous route and will return an access token for the other protected routes in the system.

```json
{
	"login_name": "Example name",
	"login_email": "example@email.com"
}
```

- Obs: The access token must be passed with the Bearer authentication type, in the http request header.

---

## Query Patterns

If you want to search for the endpoints generated by the library, you can do so using the following options:

- Query by field value:

```
http://host:port/model_name?where={"model_field":"value", ...}
```

- Include relations between models in the query:

```
http://host:port/model_name?include=["relation_model", ...]
```
