import { getSyncStations } from "../data/gasStation.data"
import * as apiController from  './apiController'

export const syncBusinesses=async()=>{

    console.log('entrando')
    const stations: any = await getSyncStations()
    console.log('syncBusinesses',stations)
    for(let station of stations){
        station.business=station.business.toString()   
    }
    return stations
}

export const syncProcess=async(job: any)=>{
    console.log(job.data)
    const result = await apiController.executeSync(job.data)
    console.log('resultProcess',result)
    return result
    
}