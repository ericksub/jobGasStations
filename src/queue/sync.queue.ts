import { Queue, Worker , QueueOptions} from 'bullmq'
import { getRedisConnection } from '../data/redisConnection';
import { syncProcess } from '../controller/syncController';

const connection: any = getRedisConnection()

  const defaultOptions: QueueOptions = {
    connection: connection,
    defaultJobOptions: {
      removeOnComplete: {
        age: 20, // En segundos
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


  export const queueSync = new Queue('syncQueue' ,defaultOptions)

  const worker = new Worker(
    "syncQueue",
    async (job) => {
      console.log(`Procesando tarea: ${job.name}`);
      
      await syncProcess(job)
    },
    {  connection, concurrency: 2 }
  );
  
  worker.on("completed", (job) => {
    console.log(`Tarea completada: ${job.name}`);
  });
  
  worker.on("failed", (job: any, err) => {
    console.error(`Error en la tarea ${job.name}:`, err);
  });