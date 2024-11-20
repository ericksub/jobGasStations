import IORedis from 'ioredis';

let redis: any = null

export const getRedisConnection=()=>{
    if(!redis){
        redis = new IORedis({
            host: process.env.REDIS_HOST, 
            port: parseInt(process.env.REDIS_PORT?process.env.REDIS_PORT:'6379') ,    
            maxRetriesPerRequest: null,    
          });
    }    
    return redis
}

