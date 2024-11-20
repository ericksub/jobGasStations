import express from 'express';
import dotenv from 'dotenv';
import {serverAdapter} from "./queue/adapter"
import Redis from "ioredis"

dotenv.config();
const app = express();

if(process.env.NODE_ENV!='prod'){
    let dir=`.env.${process.env.NODE_ENV}`
    require('dotenv').config({ path: dir })
}else require('dotenv').config()


const PORT = process.env.PORT || 3500;

app.use(express.json())
app.use('/admin/queues', serverAdapter.getRouter());

app.listen(PORT, () => {
    console.log(process.env.PORT)
    console.log(process.env.NODE_ENV)
    const redis = new Redis({
        host: process.env.REDIS_HOST,  
        port: parseInt(process.env.REDIS_PORT?process.env.REDIS_PORT:'6379') ,    
        maxRetriesPerRequest: null,    
    });

    redis.ping((err: any, result: any) => {
        if (err) {
            console.error('Error al conectar con Redis:', err);
        } else {
            console.log('Conexión exitosa a Redis. Respuesta de ping:', result);
        }

        // Cierra la conexión después de la prueba
        redis.quit();
    });

})




