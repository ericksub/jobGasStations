import dotenv from 'dotenv';

dotenv.config();

if(process.env.NODE_ENV=='prod' || process.env.NODE_ENV=='dev' || process.env.NODE_ENV=='job' ){
    let dir=`.env.${process.env.NODE_ENV}`
    require('dotenv').config({ path: dir })
}else require('dotenv').config()

const config={
    SYNC: process.env.SINCRONIZACION,
    API: {
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
    },
    MONGODB:{
        URL: process.env.MONGO_DB_URL
    }
}

export default config