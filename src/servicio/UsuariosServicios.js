import axios from 'axios';

export class UsuariosServicios{
    baseUrl = "http://localhost:8080/usuarios";
    
    getAll(){
        return axios.get(this.baseUrl).then(res => res.data);
    }
    
    save(usuario){
        return axios.post(this.baseUrl, usuario).then(res => res)
    }
    
    delete(id_usuario){
        console.log("ID de usuario a eliminar:", id_usuario);
        return axios.delete(`${this.baseUrl}/${id_usuario}`)
          .then(res=>res.data)
          .catch(error => {
            console.error('Error al eliminar usuario:', error);
            if(error.response){
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            } else if(error.request){
                console.error(error.request);
            } else{
                console.error('Error', error.message);
            }
            console.error(error.config);
        });
    }
}

