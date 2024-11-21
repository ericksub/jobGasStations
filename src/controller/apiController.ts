import config from '../config'
import axios from 'axios'


const instance = axios.create({
    baseURL: config.API.API_URL,
    withCredentials: true,
    timeout: 60000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization' : `Bearer ${config.API.API_KEY}`
    },
});


export const executeSync=async(data: any)=>{
    return await callApiPost(`${config.API.API_URL}api/v1/scrape`, data)
}

export const callApiGet=async (url:string)=>{
    const response = await instance.get(url)
        .then(function (response) {

            console.log('get->',response.data)
            if (response.data !== null) {
                return response.data;
            }
        })
        .catch(async function (error) {
            console.log('error callApiGet',error.response);
        });
    return response;
}


export const callApiPost=async(endpoint: string, data: any) => {

    console.log(endpoint)
    const response = await instance.post(endpoint, data)
        .then(function (response) {
            console.log('post->',response.data)
            if (response.data !== null) {
                return response.data;
            }
        })
        .catch(async function (error) {
            console.log('error callApiPost',error.response);
        });
    return response;
}