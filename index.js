import express from 'express';
import { connection } from './src/database/connection.js';
import router from './src/router.js';

const app = express();
 
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(router);


connection.authenticate().then(() =>{
    console.log('Conectado ao Banco!')
}).catch((err) => {
    console.log('Erro:' + err)
})


app.listen(3000, () => {
    console.log('Online')
})