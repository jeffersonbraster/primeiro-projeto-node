import express from "express";

const app = express()









app.use(express.json());

app.get('/', (request, response) => {
    return response.json({message: 'legal'});
});

app.listen(3333, () => {
    console.log('Server abriu na porta 3333');
});

