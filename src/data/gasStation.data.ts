import { getDbConnection } from "./mongoConnection"


export const getSyncStations=async()=>{

    const db:any = await getDbConnection()
    return await db.collection('Sync').find({active: true}).toArray()
    
}