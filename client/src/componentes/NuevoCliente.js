import React, { Component, Fragment } from 'react';
import { NUEVO_CLIENTE } from '../mutations';
import { Mutation } from 'react-apollo';

class NuevoCliente extends Component {
    state = { 
        cliente: {
            nombre: '',
            apellido: '',
            empresa: '',
            edad: '',
            emails: [],
            tipo: ''
        },
        error: false
    }

    nuevoCampo = () => {
        this.setState({
            cliente: {
                ...this.state.cliente,
                emails: this.state.cliente.emails.concat([{email: ''}])
            }
        });
    }

    quitarCampo = (index) => {
        this.setState({
            cliente: {
                ...this.state.cliente,
                emails: this.state.cliente.emails.filter((email, i) => index !== i)
            }
        });
    }

    leerCampo = (evt, index) => {
        const { emails } = this.state.cliente;
        emails[index] = {email: evt.target.value};

        this.setState({
            cliente: {
                ...this.state.cliente,
                emails,
            }
        });
    }

    render() {
        const { error } = this.state;
        let message = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p> : '';
        return (
            <Fragment>
                <h2 className="text-center">Nuevo Cliente</h2>
                {message}
                <div className="row justify-content-center">
                    <Mutation mutation={NUEVO_CLIENTE} onCompleted={() => this.props.history.push('/')}>
                        {crearCliente => (
                            <form 
                                className="col-md-8 m-3" 
                                onSubmit={evt => {
                                    evt.preventDefault();
                                    const input = this.state.cliente;

                                    if (input.nombre === '' || input.apellido === '' || input.empresa === '' || input.tipo === '') {
                                        this.setState({error: true});
                                        return;
                                    }

                                    crearCliente({
                                        variables: {input}
                                    });
                                }}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Nombre</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Nombre" 
                                            onChange={evt => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        nombre: evt.target.value
                                                    }
                                                })
                                            }}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Apellido</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Apellido" 
                                            onChange={evt => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        apellido: evt.target.value
                                                    }
                                                })
                                            }}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label>Empresa</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Empresa"
                                            onChange={evt => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        empresa: evt.target.value
                                                    }
                                                })
                                            }}/>
                                    </div>
                                    {this.state.cliente.emails.map((input, index) => (
                                        <div key={index} className="form-group col-md-12">
                                            <label>Correo {index + 1}:</label>
                                            <div className="input-group">
                                                <input
                                                    defaultValue={input.email}
                                                    type="email"
                                                    placeholder="Email"
                                                    className="form-control" 
                                                    onChange={evt => this.leerCampo(evt, index)}/>
                                                <div className="input-group-append">
                                                    <button type="button" className="btn btn-danger" onClick={() => this.quitarCampo(index)}>&times; Eliminar</button>
                                                </div>
                                            </div>
                                        </div>   
                                    ))}
                                    <div className="form-group d-flex justify-content-center col-md-12">
                                        <button className="btn btn-warning" type="button" onClick={this.nuevoCampo}>+ Agregar Email</button>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Edad</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Edad"
                                            onChange={evt => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        edad: Number(evt.target.value)
                                                    }
                                                })
                                            }}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Tipo Cliente</label>  
                                        <select 
                                            className="form-control" 
                                            onChange={evt => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        tipo: evt.target.value
                                                    }
                                                })
                                            }}>
                                            <option value="">Elegir...</option>
                                            <option value="PREMIUM">PREMIUM</option>
                                            <option value="BASICO">BÁSICO</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success float-right">Agregar Cliente</button>
                            </form>
                        )}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}

export default NuevoCliente; 