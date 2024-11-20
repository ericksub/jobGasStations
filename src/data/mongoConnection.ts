import config from "../config";
import {MongoClient} from "mongodb";

const URL: any= config.MONGODB.URL
const dbName = "GasStation";
let client: any;
let db: any;


export const getDbConnection=async()=> {
    if (!client) {
      client = new MongoClient(URL);
      try {
        await client.connect();
        console.log("Conexión a MongoDB establecida");
        db = client.db(dbName);
      } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
        throw error;
      }
    }else{
        console.log("Reutilizando");
    }
    return db;
}


