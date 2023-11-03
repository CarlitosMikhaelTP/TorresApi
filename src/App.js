import React, { Component } from 'react';
import './App.css';
import { UsuariosServicios } from './servicio/UsuariosServicios';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Panel } from 'primereact/panel';
        

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  constructor(){
    super();
    this.state = {};
    this.usuariosServicios = new UsuariosServicios();
  }

  componentDidMount(){
    this.usuariosServicios.getAll().then(data=>this.setState({usuarios: data}))
    }

  render(){
    return(
      <Panel header="Lista de Usuarios registrados" style={{width:"90%", margin: "0 auto", marginTop: "20px"}}>
        <DataTable value={this.state.usuarios}>
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
    );
  }
}