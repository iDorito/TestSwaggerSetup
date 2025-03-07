//Requiriendo todos los servicios como swagger y express
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml')
const fs = require('fs');
const req = require('express/lib/request');
//inicializando express y el puerto que usaremos para el servidor.
const app = express();
const port = 3000;

// Configuración de Swagger que puede tambien ser requerido de un archivo YML o YAML
const swaggerDocument = yaml.load(fs.readFileSync('./openapi.yml', 'utf-8'))

app.get('/antenas', (req, res) => {
    const antenasData = fs.readFileSync('antenas.json', 'utf-8');

    const antenasParsed = JSON.parse(antenasData);

    res.json(antenasParsed);
});

app.get('/antenas/:id', (req, res) => {
    const antenasData = fs.readFileSync('antenas.json', 'utf-8');

    const antenasParsed = JSON.parse(antenasData);
    const antena = antenasParsed.find(a => a.id === req.params.id)

    if(antena) {
        res.json(antena);
    }
    else {
        res.status(404).json({ error: "Antena no encontrada"});
    }
});

app.get('/routers', (req, res) => {
    const routersData = fs.readFileSync('routers.json', 'utf-8');

    const routersDataParsed = JSON.parse(routersData);

    res.json(routersDataParsed);
});

// Configurar Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log(`Swagger disponible en http://localhost:${port}/api-docs`);
});