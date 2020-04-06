# Iniciar el proyecto node
    backend-server> npm init

contestar las preguntas de configuración del proyecto (luego se pueden modificar)

## Instalar expressjs
Vamos a utilizar: https://expressjs.com/es/

    backend-server> npm install express --save

Utilizamos el flag: --save, para indicar que esta dependencia es obligatoria para nuestro proyecto

Crear el archivo: app.js Este es el punto de entrada en la aplicación

EScribir el **codigo**

---
## Arrancar el servidor
    backend-server> node app

En este punto podemos ver el mensaje en el terminal, y si miramos el navegador en: http://localhost:3000/, podemos ver que esta escuchando, aunque de momento no muestra nada.

## Instalar nodemon
Es una libreria que actualiza los cambios del codigo iy arranca la aplicacion autoamticamente


instalación global
npm install -g nodemon

instalación local del proyecto
npm install --save-dev nodemon
En este caso vamos a realizar la local con el flag de -dev, solo para desarrollo

### modificar package.json
Para que el proyecto se rearranque cda vez que realizamos cambios añadimos una istruccion al archivo


    "scripts": {
        "start": "nodemon app.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },

a partir de ahora para arrancar el servidor

    backend-server> npm start

## Instalar 
Esta libreria facilita la connexion con momgoDB

instalar con el flag --sava porque es una dependencia obligatoria para nuestro proyecto

    backend-server> npm install mongoose --save

# GIT
Quick setup — if you’ve done this kind of thing before
or

We recommend every repository include a README, LICENSE, and .gitignore.
…or create a new repository on the command line

echo "# backend-server-node" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/jollcw/backend-server-node.git
git push -u origin master

…or push an existing repository from the command line

git remote add origin https://github.com/jollcw/backend-server-node.git
git push -u origin master

…or import code from another repository

You can initialize this repository with code from a Subversion, Mercurial, or TFS project.

---
Inicializar el repositorio

    backend-server> git init

mirar el stado del repositorio

    backend-server> git status

### .gitignore
Crear el archivo .gitignore para que no incluya lo que no queremos en el repositorio

Agregar archivos para subir al repositorio


    backend-server> git add .

mirar el stado del repositorio

    backend-server> git status

nos indica en color verde los archivos agregados listos para subir

Subir archivos al "PRErepositorio" con un mensaje

    backend-server> git commit -m "Primer commit del proyecto"

Indicar a que repositorio de github se subiran los archivos

    backend-server> git remote add origin https://github.com/jollcw/backend-server-node.git

Subir archivos al repositorio

    backend-server> git push -u origin master

fatal: HttpRequestException encountered.
   Error al enviar la solicitud.

Username for 'https://github.com': jollcw

Password for 'https://jollcw@github.com':

Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (6/6), 2.16 KiB | 220.00 KiB/s, done.
Total 6 (delta 0), reused 0 (delta 0)


### Crear un Release Tag
primero ver los tags que hay

    backend-server> git tag
no muestra nada, por lo tanto no hay tags

Crear un Release Tag

    backend-server> git tag -a V0.0.1 -m "Fin de la secciión 9 del tuto"

primero ver los tags creados

    backend-server> git tag

Subir el tag a github

    backend-server> git push --tag

### Crear un Release
Desde la web de git, en el tag crear la release

---

## Install body-parser

Toma la información del post y crea un objeto javascript que podemos utilizar

    backend-server> npm install body-parser --save

---

## Install mongoose-unique-validator

Es un plugin de moongose que hayuda a validar claves unicas

    backend-server> npm install mongoose-unique-validator --save

---

## Install bcrypt.js

Lib to help you hash passwords

    backend-server> npm install bcryptjs --save