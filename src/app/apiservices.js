import Axios from 'axios'

const HttpClient = Axios.create({
    baseURL: 'https://minhas-finacas-api.herokuapp.com/'
})

class ApiService{

    constructor(apiurl){
        this.apiurl = apiurl
    }

    get(url){
        return HttpClient.get(`${this.apiurl}${url}`)
    }

    post(url,Objeto){
        return HttpClient.post(`${this.apiurl}${url}`,Objeto)
    }

    put(url,Objeto){
        return HttpClient.put(`${this.apiurl}${url}`,Objeto)
    }

    delete(url){
        return HttpClient.delete(`${this.apiurl}${url}`)
    }
}

export default ApiService