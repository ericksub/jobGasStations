import { Queue, Worker , QueueOptions} from 'bullmq'
import config from '../config';
import { syncBusinesses } from '../controller/syncController';
import { getRedisConnection } from '../data/redisConnection';
import { queueSync } from './sync.queue'; 

const connection: any = getRedisConnection()

  const defaultOptions: QueueOptions = {
    connection: connection,
    defaultJobOptions: {
      removeOnComplete: {
        age: 86400, // En segundos
        //age: 86400, // En segundos
        count: 100,
      },
      // Remueve los trabajos fallidos después de 1 semana (604800 segundos)
      removeOnFail: {
        age: 604800, // En segundos
        count: 1000
      }, 
    }
  }

export const queueSincronizador = new Queue('sincronizador' ,defaultOptions)

//queueSincronizador.obliterate();

queueSincronizador.upsertJobScheduler(
    'sync-job',
    {
      pattern:  config.SYNC, 
    },
    {
      name: 'cron-job',
      data: { jobData: '-' },
      opts: {},
    },
  );
  

const worker = new Worker(
    "sincronizador",
    async (job) => {
      console.log(`Ejecutando JOB: ${job.name}`);
      const business = await syncBusinesses()
      for(let item of business){
        queueSync.add(item._id, item)
      }
      
    },
    {  connection }
  );
  
  worker.on("completed", (job) => {
    console.log(`JOB Ejecutado: ${job.name}`);
  });
  
  worker.on("failed", (job: any, err) => {
    console.error(`Error en el JOB ${job.name}:`, err);
  });