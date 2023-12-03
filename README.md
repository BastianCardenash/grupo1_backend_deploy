# Entrega 2 Grupo 1 Backend 
Documentacion instalación BDD:  
Para el desarollo de nuestro proyecto se utilizo Postgresql para el manejo de la base de datos. Para comenzar con la instalacion, debemos contar con Postgresql, para eso corremos el siguiente comando en consola.
``` bash
apt install postgresql postgresql-contrib
```
Una vez instalado, debemos comenzar con el servicio utilizando:
``` bash
sudo service postgresql start
```

Con el servicio ya iniciado, debemos crear un usuario para trabajar con la base de datos. A modo de ejemplo, nosotros creamos el usuario 'grupo1':
``` bash
sudo -u postgres createuser --superuser grupo1
```
Junto con el usuario debemos crear una contraseña para este. Para eso, primero debemos entrar a la consola de Postgresql con:
``` bash
sudo -u postgres psql
```
Una vez dentro, tendremos que correr el siguiente comando:
``` bash
ALTER USER grupo1 WITH PASSWORD 'grupo1';
```
En el caso anterior, la expresion entre comillas corresponde a la contraseña que queremos designar.

Por ultimo, tendremos que crear las bases de datos que utilizaremos durante el desarollo de la pagina. Para eso, contaremos con 3 tipos de bases de datos, la primera para el desarrollo, la segunda para el test y por ultimo una cuando la pagina ya este lista y se carguen y utilicen los datos reales. Para eso tendremos que usar los siguientes comandos:
``` bash
sudo -u postgres createuser createdb backend_db_developtment
sudo -u postgres createuser createdb backend_db_test
sudo -u postgres createuser createdb backend_db_production
```
De esta fornma ya tenemos realizado el set-up de la base de datos para nuestra pagina. Ahora solo faltaria agregar un archivo .env dentro de los archivos de nuestro backend que contenga variables con los datos creados en los pasos anteriores. El archivo quedaria de la siguiente forma:
``` bash
DB_USERNAME = grupo1
DB_PASSWORD = grupo1
DB_NAME = backend_db
DB_HOST = 'localhost'
```
No olvidemos colocar este archivo dentro de nuestro .gitignore. 

Con esto ya podriamos tener acceso a la base de datos para poder realizar cambios en esta mediante Sequelize y Koa.
