import React, { Component } from 'react';
import './App.css';
import { UsuariosServicios } from './servicio/UsuariosServicios';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';       
             

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
    visible: false,
    usuario:{
      id_usuario : "",
      id_tipo_usuario : "",
      nombres : "",
      apellidos : "",
      nombre_usuario : "",
      email : "",
      direccion : "",
      edad : 0,
      numero : "",
      dni : "",
      contrasena: "",
      estado : 0
    },
     selectedUsuarios :{

     }
  };

  this.items = [
      {
        label : 'Nuevo',
        icon : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Editar',
        icon : 'pi pi-fw pi-pencil',
        command : () => {this.showEditDialog()} 
      },
      {
        label : 'Eliminar',
        icon : 'pi pi-fw pi-trash',
        command : () => {this.delete()} 
      }
    ];
    this.usuariosServicios = new UsuariosServicios();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save}/>
      </div>
    );
  }
  

  componentDidMount() {
    this.usuariosServicios.getAll().then(data=>this.setState({usuarios: data}))
  }

  save() {
    this.usuariosServicios.save(this.state.usuario).then(data =>{
      this.setState({
        visible : false,
        usuario:{
          id_usuario : '',
          id_tipo_usuario : '',
          nombres : '',
          apellidos : '',
          nombre_usuario : '',
          email : '',
          direccion : '',
          edad : 0,
          numero : '',
          dni : '',
          contrasena: '',
          estado : 0
        } 
      });
      this.toast.show({severity: 'Succes', summary: 'Atención', detail: 'Se guardó el registro correctamente.'});
      this.usuariosServicios.getAll().then(data=>this.setState({usuarios: data}))
    })
  }
  
  delete(){
    if (this.state.selectedUsuarios && this.state.selectedUsuarios.id_usuario){
      const id_usuario = this.state.selectedUsuarios.id_usuario;
      if(window.confirm("¿Realmente desea eliminar el registro")){
        this.usuariosServicios.delete(id_usuario)
        .then(data=>{
          this.toast.show({severity: 'Succes', summary: 'Atención', detail: 'Se eliminó el registro correctamente.'});
          this.usuariosServicios.getAll().then(data=>this.setState({usuarios: data}));
        })
        .catch(error => {
          console.log('Error al eliminar el registro:', error);
        });
      }
    } else {
      console.error('Error: ningun usuario seleccionado para eliminar');
    }
  }

  render(){
    return(
      <div style={{width:"90%", margin: "0 auto", marginTop: "20px"}}>
      <Menubar model={this.items}/>
      <br></br>
      <Panel header="Lista de Usuarios registrados">
        <DataTable value={this.state.usuarios} paginator={true}  rows="7" selectionMode="single" selection={this.state.selectedUsuarios} onSelectionChange={e => this.setState({selectedUsuarios: e.value})}>
          <Column field="id_usuario" header="ID"></Column>
          <Column field="id_tipo_usuario" header="Tipo de Usuario"></Column>
          <Column field="nombres" header="Nombres"></Column>
          <Column field="apellidos" header="Apellidos"></Column>
          <Column field="nombre_usuario" header="Nombre de Usuario"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="direccion" header="Direccion"></Column>
          <Column field="edad" header="Edad"></Column>
          <Column field="numero" header="Numero"></Column>
          <Column field="dni" header="Dni"></Column>
          <Column field="contrasena" header="Contrasena"></Column>
          <Column field="estado" header="Estado"></Column>
        </DataTable>
      </Panel>
      <Dialog header="Crear Nuevo Usuario" visible={this.state.visible} style={{ width: '400 px' }} footer={this.footer} onHide={() => this.setState({ visible :false})}>
      <form id='usuario-form'>
        <span className='p-float-label'>        
          <InputText value={this.state.usuario.id_usuario} style={{width : '100%'}}  id="id_usuario" onChange={(e) => {
                let val = e.target.value; 
                this.setState(prevState => {
                    console.log(val)
                    let usuario = Object.assign({}, prevState.usuario);
                    usuario.id_usuario = val;
                    return { usuario };
                })}} /> 
            <label htmlFor='id_usuario'>ID</label>
          </span>
          <br></br>
          <span className='p-float-label'>        
          <InputText value={this.state.usuario.id_tipo_usuario} style={{width : '100%'}}  id="id_tipo_usuario" onChange={(e) => {
                let val = e.target.value; 
                this.setState(prevState => {
                    console.log(val)
                    let usuario = Object.assign({}, prevState.usuario);
                    usuario.id_tipo_usuario = val;
                    return { usuario };
                })}} /> 
            <label htmlFor='id_tipo_usuario'>ID tipo de Usuario</label>
          </span>
          <br></br>
          <span className='p-float-label'>        
          <InputText value={this.state.usuario.nombres} style={{width : '100%'}} id="nombres" onChange={(e) => {
                let val = e.target.value; 
                this.setState(prevState => {
                    console.log(val)
                    let usuario = Object.assign({}, prevState.usuario);
                    usuario.nombres = val;
                    return { usuario };
                })}} />
            <label htmlFor='nombres'>Nombres</label>
          </span>
          <br></br>
          <span className='p-float-label'>        
          <InputText value={this.state.usuario.apellidos} style={{width : '100%'}}  id="apellidos" onChange={(e) => {
                let val = e.target.value; 
                this.setState(prevState => {
                    console.log(val)
                    let usuario = Object.assign({}, prevState.usuario);
                    usuario.apellidos = val;
                    return { usuario };
                })}} /> 
            <label htmlFor='apellidos'>Apellidos</label>
          </span>
          <br></br>
          <span className='p-float-label'>        
          <InputText value={this.state.usuario.nombre_usuario} style={{width : '100%'}} id="nombre_usuario" onChange={(e) => {
                let val = e.target.value; 
                this.setState(prevState => {
                    console.log(val)
                    let usuario = Object.assign({}, prevState.usuario);
                    usuario.nombre_usuario = val;
                    return { usuario };
                })}} />
            <label htmlFor='nombre_usuario'>Nombre de Usuario</label>
          </span>
          <br></br>
          <span className='p-float-label'>        
          <InputText value={this.state.usuario.email} style={{width : '100%'}} id="email" onChange={(e) => {
                let val = e.target.value; 
                this.setState(prevState => {
                    console.log(val)
                    let usuario = Object.assign({}, prevState.usuario);
                    usuario.email = val;
                    return { usuario };
                })}} />
            <label htmlFor='email'>Email</label>
          </span>
          <br></br>
          <span className='p-float-label'>        
          <InputText value={this.state.usuario.direccion} style={{width : '100%'}}  id="direccion" onChange={(e) => {
                let val = e.target.value; 
                this.setState(prevState => {
                    console.log(val)
                    let usuario = Object.assign({}, prevState.usuario);
                    usuario.direccion = val;
                    return { usuario };
                })}} />
            <label htmlFor='direccion'>Direccion</label>
          </span>
          <br></br>
          <span className='p-float-label'>        
          <InputText value={this.state.usuario.edad} style={{width : '100%'}}  id="edad" onChange={(e) => {
                let val = e.target.value; 
                this.setState(prevState => {
                    console.log(val)
                    let usuario = Object.assign({}, prevState.usuario);
                    usuario.edad = val;
                    return { usuario };
                })}} />
            <label htmlFor='edad'>Edad</label>
          </span>
          <br></br>
          <span className='p-float-label'>        
          <InputText value={this.state.usuario.numero} style={{width : '100%'}} id="numero" onChange={(e) => {
                let val = e.target.value; 
                this.setState(prevState => {
                    console.log(val)
                    let usuario = Object.assign({}, prevState.usuario);
                    usuario.numero = val;
                    return { usuario };
                })}} />
            <label htmlFor='numero'>Numero</label>
          </span>
          <br></br>
          <span className='p-float-label'>        
          <InputText value={this.state.usuario.dni} style={{width : '100%'}} id="dni" onChange={(e) => {
                let val = e.target.value; 
                this.setState(prevState => {
                    console.log(val)
                    let usuario = Object.assign({}, prevState.usuario);
                    usuario.dni = val;
                    return { usuario };
                })}} />
            <label htmlFor='dni'>Dni</label>
          </span>
          <br></br>
          <span className='p-float-label'>        
          <InputText value={this.state.usuario.contrasena} style={{width : '100%'}} id="contrasena" onChange={(e) => {
                let val = e.target.value; 
                this.setState(prevState => {
                    let usuario = Object.assign({}, prevState.usuario);
                    usuario.contrasena = val;
                    return { usuario };
                })}
              } />
            <label htmlFor='contrasena'>Contraseña</label>
          </span>
          <br></br>
          <span className='p-float-label'>        
          <InputText value={this.state.usuario.estado} style={{width : '100%'}} id="estado" onChange={(e) => {
                let val = e.target.value; 
                this.setState(prevState => {
                    let usuario = Object.assign({}, prevState.usuario);
                    usuario.estado = val;
                    return { usuario };
                })}
              } />
            <label htmlFor='estado'>Estado</label>
          </span>
        </form>
        <br></br>
      </Dialog>
      <Toast ref={(el)=>this.toast = el} />
      </div>
    );
  }
  showSaveDialog(){
    this.setState({
      visible : true,
      usuario :{
        id_usuario : '',
        id_tipo_usuario : '',
        nombres : '',
        apellidos : '',
        nombre_usuario : '',
        email : '',
        direccion : '',
        edad : 0,
        numero : '',
        dni : '',
        contrasena: '',
        estado : 0
      }    
    });
    const formElement = document.getElementById('usuario-form');
    if (formElement){
      formElement.reset();
    }
  }
  showEditDialog(){
    this.setState({
      visible : true,
      usuario :{
        id_usuario : this.state.selectedUsuarios.id_usuario,
        id_tipo_usuario : this.state.selectedUsuarios.id_tipo_usuario,
        nombres : this.state.selectedUsuarios.nombres,
        apellidos : this.state.selectedUsuarios.apellidos,
        nombre_usuario : this.state.selectedUsuarios.nombre_usuario,
        email : this.state.selectedUsuarios.email,
        direccion : this.state.selectedUsuarios.direccion,
        edad : this.state.selectedUsuarios.edad,
        numero : this.state.selectedUsuarios.numero,
        dni : this.state.selectedUsuarios.dni,
        contrasena: this.state.selectedUsuarios.contrasena,
        estado : this.state.selectedUsuarios.estado
      } 
    })
  }
}

  