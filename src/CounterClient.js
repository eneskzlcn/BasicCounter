import axios from "axios";



export default class CounterClient
{
    constructor(url)
    {
        if(url == undefined || url == '')   url = process.env.COUNTER_API_BASE_URL; 
        if (url.endsWith("/"))  url = url.substr(0, url.length - 1)
        this.url = url;  
    }
    toPath = (path)=>
    {
        if (!path.startsWith("/")) path = "/" + path
        return this.url + path;
    }
    async getCounter(){
     return axios.get(this.toPath("/counter"))
        .then(r => r.data);
    }
    async increaseCounter (){
        return axios.get(this.toPath("/increase"))
        .then(r => r.data);
    }
    async decreaseCounter(){
        return axios.get(this.toPath("/decrease"))
            .then(r => r.data);
    }
    async resetCounter(){
        return axios.get(this.toPath("/reset"))
        .then(r => r.data);
    }
}
