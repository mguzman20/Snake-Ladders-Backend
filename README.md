# grupo-EduardoRoam-backend

## Link al proyecto final 
Frontend:
https://front-react-933u.onrender.com

Backend: https://web-backend-fgkd.onrender.com/

## Ejecutar el proyecto

Para ejecutar el proyecto, se debe tener instalado Node.js y npm. Luego, se debe ejecutar el siguiente comando en la carpeta raíz del proyecto:

```bash
npm install
```
Este comando instalará todas las dependencias necesarias para correr el proyecto.
Una vez instaladas las dependencias, se pueden ejecutar los siguientes comandos para correr el back.

```bash
npm start 
npm run dev
```
Estos comandos correrán el proyecto en modo producción y desarrollo respectivamente.
Antes de correr el proyecto es necesario crear las bases de datos con los siguientes comandos:
```bash
createdb name_development
npx sequelize-cli db:migrate
```
Estos comandos crearan la base de datos y las tablas necesarias para correr el proyecto.
## Consideraciones
Mas información en la carpeta /docs.

Tienes que tener postgresql descargado y tener un usuario creado.
Ademas se tiene que crear un archivo .env que contenga los siguientes parametros:
```bash
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
DB_HOST='localhost'
DB_PORT='5432'
APP_PORT='3000'
```

(El nombre de la base de datos tiene que ser sin el _development cuando se escriba en el .env)

Se eliminaron las restricciones de eslint en el archivo .eslintrc.json
```bash
"import/no-dynamic-require": "off",
"global-require": "off"
```
Debido a que tal como se comenta en el link inferior, en el caso de Node.js es un problema cuando usar bundles estáticos.
                
https://stackoverflow.com/questions/65395347/fixing-an-eslint-error-calls-to-require-should-use-string-literals