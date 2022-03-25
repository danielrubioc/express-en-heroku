# express-en-heroku

### Ambiente Local

Ejecutar psql desde la terminal para crear database

```
psql -p5432 -U postgres
```

Crear Base de datos

```
CREATE DATABASE users_db;
```

#### Dependencias

Despues de crear la BD se deben instalar las dependencias del proyecto

```
npm i
```

En la raiz del proyecto encontraras un archivo `.env-example` debes renombrarlo a `.env` y configurar las variables segun corresponda.

Poblar la base de datos:

```
npm run migrate:db
```

Revisar la base de datos:

```
npm run test:db
```

## HEROKU

URL https://express-en-heroku.herokuapp.com/
