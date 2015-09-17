'use strict';
var fs = require('fs');
var http = require('http');
var minimist = require('minimist');

//libreria para tener en el objeto argv todos los parametros que pasamos al comenzar
var argv = minimist(process.argv);

var server = http.createServer(function(req, res) {

    console.log('El resurces path pedido es: ' + req.url);

    if (req.url.indexOf('/public') > -1) {

        console.log("Ahora manejo el pedido a " + req.url + " usando la variable __dirname = " + __dirname);

        fs.readFile(__dirname + req.url, function(err, data) {

            console.log("retorno de recursos...");

            if (err) {
                console.log("error al encontrar el archivo index.html");
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200);
            res.end(data);

            console.log("recursos enviados...");
        });
    }

    if (req.url === '/favico.ico') {
        console.log("retorno vacio del favico.ico ...");
        res.writeHead(200);
        res.end();
        console.log("recursos enviados...");
    }

    if (req.url === '/urlGet') {
        if (req.method === 'GET') {
            console.log('Se recibió una solicitud GET del cliente.');
            res.writeHead(200);
            res.end("soy un string creado en el server y enviado para contestar el pedido a /data");
            console.log("recursos enviados...");
            return;
        }
    }

    if (req.url === '/urlPost') {
        if (req.method === 'POST') {
            var objRes = {};

            console.log('Se recibió una solicitud POST del cliente y nos trae datos para poder usarlos en nuestra server.\n' +
                'Estos datos podemos usarlos para poder responderle al pedido post una respuesta personalizada\n' +
                'como puede ser el siguiente caso:\n' +
                'Envio mi nombre de usuario para que esta solucitud manejada por el server \n' +
                ' me devuelva mis amigos asociados');

            res.writeHead(200);

            if (req.headers.username === 'pepe') {

                objRes = {
                    content: {
                        data: "soy datossss",
                        user: req.headers.username
                    }
                };

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify(objRes));
                return;
            }

            res.end();
            console.log("recursos enviados...");
            return;
        }
    }

});

var port = argv.port || 8000;

server.listen(port, function() {
    console.log('El servidor esta escuchando en el puerto: ' + port);
});