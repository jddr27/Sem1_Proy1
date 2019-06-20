# Sem1_Proy1
## Integrantes Grupo :
```
200310165 - José Abraham Navarro de León.
201503393 - José Daniel De León Ruiz.
201503893 - Brandon Javier Soto Castañeda.
```

## Pasos para crear la API:

**1. Crear una carpeta:**
```
	$ mkdir firtApp
	$ cd firstApp
```

**2. Inicializa la aplicación node:**
```
	$ npm init	
```

**3. Instalar dentro de la carpeta las herramientas Express framework, mySql y body-parser:**
```
	$ npm install express –save 
	$ npm install mysql –save 
	$ npm install body-parser -save
```

**4. Crear un archivo con el nombre "dockerfile":**
```
	$ touch dockerfile
```

**5. Utilizar el editor de texto favorito y abrir el archivo, en este caso se usará nano:**
```
	$ nano dockerfile
```

**6. Ingresar los siguientes comandos:**
```
	
	FROM node:latest
	# Create app directory
	RUN mkdir -p /usr/src/app
	WORKDIR /usr/src/app
	# Install app dependencies
	COPY . /usr/src/app/
	EXPOSE 3000
	RUN npm install
	CMD [ "npm", "start" ]
	
```
**7. Crear y editar un archivo de extensión .js, Ejemplo: server.js**
```	
	var app = require('express')(); // Express App include
	var mysql = require('mysql'); // Mysql include
	var bodyParser = require("body-parser"); // Body parser for fetch posted data
	var connection = mysql.createConnection({ // Mysql Connection
	    host : '18.218.92.77',
	    user : 'root',
	    password : '123456789',
	    database : 'some-mysql2',
	});

	connection.connect();

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json()); // Body parser use JSON data

	app.get('/', (req, res) => {
	    res.send('Hello world\n');
	  });

	// fetch all users from users table in DB.
	app.get('/todos',function(req,res){
	    var data = {
	        "error":true,
	        "Users":""
	    };
	    
	    connection.query("SELECT * from employees",function(err, rows, fields){
	        if(rows.length != 0){
	            data["error"] = false;
	            data["Users"] = rows;
	            res.json(data);
	        }else{
	            data["error"] = true;
	            data["Users"] = 'No users Found..';
	            res.json(data);
	        }
	    });
	});

	// Update message belonging to user uid
	app.post('/nuevo',function(req,res){
	    var sera = JSON.parse(req.body);
	    var a1 = req.body.nombre;
	    var a2 = req.body.apellido;
	    var a3 = req.body.depto;
	    var a4 = req.body.email;
	    var data = {
	        "error":true,
	        "Message":""
	    };
	    console.log('body ' + req.body);
	    console.log('sera ' + sera);
	    console.log('a1 ' + a1);
	    console.log('a2 ' + a2);
	    console.log('a3 ' + a3);
	    console.log('a4 ' + a4);
	    
	    if(!!a1 && !!a2 && !!a3 && !!a4){
	        connection.query("INSERT INTO employees (first_name, last_name, department, email) VALUES (?, ?, ?, ?)",[a1,a2,a3,a4],function(err, rows, fields){
	            if(!!err){
	                data["Message"] = "Error: No se pudo ingresar";
	            }else{
	                data["error"] = false;
	                data["Message"] = "Exito";
	            }
	            res.json(data);
	        });
	    }else{
	        data["error"] = true;
	        data["Message"] = "Error: Faltan campos";
	        res.json(data);
	    }
	});

	app.listen(3000, function(){
	    console.log('Connected & Listen to port 3000');
	});
```

**8. Se crea la imagen del docker, en este caso se llamara "api":**
```
	$ docker build -t api .
```

**9. Se creará el contenedor y se ejecutará en segundo plano:**
```
	$ docker run -d -p 3000:3001 --name mi-api --rm api 
```

**10. Se prueba en el navegador, ingresando la ip:3000**
