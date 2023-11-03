import axios from 'axios';

export class UsuariosServicios{
    baseUrl = "http://localhost:8080/usuarios";
    getAll(){
        return axios.get(this.baseUrl).then(res => res.data);
    }
}