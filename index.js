const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const body = req.body;

    if(body.object === 'page'){
        body.entry.forEach(entry => {
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);
        });

        res.statu(200).send('Evento Recibido');
    }else{
        res.sendStatus(404)
    }
});

app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = '';

    const mode = req.query['hub.mode'];
    const token = req.query['hub_verify_token'];
    const challenge = req.query['hub.challenge'];

    if(mode && token){
        if(mode === 'subscribe' && token === VERIFY_TOKEN){
            res.status(200).send(challenge);
        }else{
            res.sendStatus(404);
        }
    }
});

app.post('/', (req, res) => {
    res.statu(200).send('Hola a mi bot');
});

app.listen(8080, () => {
    console.log('Servidor iniciado');
});