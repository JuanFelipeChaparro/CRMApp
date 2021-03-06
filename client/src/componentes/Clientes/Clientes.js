import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo';
import { CLIENTES_QUERY } from '../../queries';
import { ELIMINAR_CLIENTE } from '../../mutations';
import { Link } from 'react-router-dom';
import Paginador from '../Paginador';

class Clientes extends Component {

    limite = 10;

    state = {
        paginador: {
            offset: 0,
            actual: 1
        }
    }

    paginaAnterior = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset - this.limite,
                actual: this.state.paginador.actual - 1
            }
        });
    }

    paginaSiguiente = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset + this.limite,
                actual: this.state.paginador.actual + 1
            }
        });
    }

    render() {
        return (
            <Query query={CLIENTES_QUERY} variables={{limite: this.limite, offset: this.state.paginador.offset}}>
                {({ loading, error, data, refetch }) => {
                    if(loading) return "Loading..."
                    if(error) return `Error: ${error.message}`

                    return (
                        <Fragment>
                        <h2 className="text-center">Listado Clientes</h2>
                        <ul className="list-group mt-4">
                            {data.getClientes.map(item => (
                                <li key={item.id} className="list-group-item">
                                    <div className="row justify-content-between align-items-center">
                                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                                            {item.nombre} {item.apellido} - {item.empresa}
                                        </div>
                                        <div className="col-md-4 d-flex justify-content-end">
                                            <Link to={`/pedidos/nuevo/${item.id}`} className="btn btn-warning d-block d-md-inline-block mr-2">Nuevo Pedido</Link>

                                            <Link to={`/pedidos/${item.id}`} className="btn btn-primary d-block d-md-inline-block mr-2">Ver Pedidos</Link>

                                            <Mutation mutation={ELIMINAR_CLIENTE} onCompleted={() => refetch()}>
                                                {eliminarCliente => (
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-danger d-block d-md-inline-block mr-2" 
                                                        onClick={() => {
                                                            const { id } = item;

                                                            if (window.confirm('Are you sure?')) {
                                                                eliminarCliente({
                                                                    variables: {id}
                                                                });
                                                            }
                                                        }}>
                                                        Eliminar
                                                    </button>
                                                )}
                                            </Mutation>

                                            <Link to={`/cliente/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">Editar Cliente</Link>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Paginador 
                            actual={this.state.paginador.actual} 
                            total={data.totalClientes}
                            limite={this.limite}
                            paginaAnterior={this.paginaAnterior}
                            paginaSiguiente={this.paginaSiguiente}/>
                    </Fragment>
                    )
                }}
            </Query>
        );
    }
};

export default Clientes;