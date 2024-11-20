import { getSyncStations } from "../data/gasStation.data"
import * as apiController from  './apiController'

export const syncBusinesses=async()=>{

    const stations: any = await getSyncStations()
    for(let station of stations){
        station.business=station.business.toString()   
    }
    return stations
}

export const syncProcess=async(job: any)=>{

    const result = await apiController.executeSync(job.data)

    return result
    
}