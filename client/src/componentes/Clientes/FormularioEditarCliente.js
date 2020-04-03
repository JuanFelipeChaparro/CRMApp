import React, { Component } from 'react';
import { ACTUALIZAR_CLIENTE } from '../../mutations';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class FormularioEditarCliente extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            cliente: props.cliente
        }
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

    leerCampo = (e, i) => {
        const nuevoMail = this.state.cliente.emails.map((email, index) => {
                if (i !== index) return email;
                return { ...email, email: e.target.value };
        });

        this.setState({
            cliente: {
                ...this.state.cliente,
                emails: nuevoMail
            }
        });
    }

    render() {
        return (
            <Mutation mutation={ACTUALIZAR_CLIENTE} onCompleted={() => {
                    this.props.refetch().then(() => {
                        this.props.history.push('/clientes');
                    })
                }}>
                {actualizarCliente => (
                    <form 
                        className="col-md-8 m-3" 
                        onSubmit={evt => {
                            evt.preventDefault();
                            const input = this.state.cliente;
                            
                            actualizarCliente({
                                variables: {input}
                            });
                        }}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombre</label>
                                <input
                                    defaultValue={this.state.cliente.nombre}
                                    type="text" 
                                    className="form-control"
                                    onChange={evt => {
                                        this.setState({
                                            cliente: {
                                                ...this.state.cliente,
                                                nombre: evt.target.value
                                            }
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellido</label>
                                <input
                                    defaultValue={this.state.cliente.apellido}
                                    type="text" 
                                    className="form-control"
                                    onChange={evt => {
                                        this.setState({
                                            cliente: {
                                                ...this.state.cliente,
                                                apellido: evt.target.value
                                            }
                                        });
                                    }}
                                    />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Empresa</label>
                                <input
                                    defaultValue={this.state.cliente.empresa}
                                    type="text" 
                                    className="form-control" 
                                    onChange={evt => {
                                        this.setState({
                                            cliente: {
                                                ...this.state.cliente,
                                                empresa: evt.target.value
                                            }
                                        });
                                    }}
                                />
                            </div>
                            {this.state.cliente.emails.map((input, index) => (
                                <div key={index} className="form-group col-md-12">
                                    <label>Email {index + 1} : </label>
                                    <div className="input-group">
                                    
                                        <input 
                                            type="email"
                                            placeholder={`Email`}
                                            className="form-control" 
                                            onChange={evt => this.leerCampo(evt, index)}
                                            defaultValue={input.email}
                                        />
                                        <div className="input-group-append">
                                            <button 
                                                className="btn btn-danger" 
                                                type="button" 
                                                onClick={() => this.quitarCampo(index)}> 
                                                &times; Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="form-group d-flex justify-content-center col-md-12">
                                <button 
                                    onClick={this.nuevoCampo}
                                    type="button" 
                                    className="btn btn-warning"
                                >+ Agregar Email</button>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Edad</label>
                                <input
                                    defaultValue={this.state.cliente.edad}
                                    type="text" 
                                    className="form-control" 
                                    onChange={evt => {
                                        this.setState({
                                            cliente: {
                                                ...this.state.cliente,
                                                edad: Number(evt.target.value)
                                            }
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Tipo Cliente</label>  
                                <select 
                                    className="form-control"
                                    defaultValue={this.state.cliente.tipo}
                                    onChange={evt => {
                                        this.setState({
                                            cliente: {
                                                ...this.state.cliente,
                                                tipo: evt.target.value
                                            }
                                        });
                                    }}
                                >
                                    <option value="">Elegir...</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                    <option value="BASICO">BÁSICO</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                    </form>
                )}
            </Mutation>
        )      
    }
}

export default withRouter(FormularioEditarCliente);