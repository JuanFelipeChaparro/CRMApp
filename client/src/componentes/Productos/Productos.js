import React, { Component, Fragment } from 'react';
import { PRODUCTOS_QUERY } from '../../queries';
import { ELIMINAR_PRODUCTO } from '../../mutations';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import Exito from '../Alertas/Exito';
import Paginador from '../Paginador';

class Productos extends Component {

    limite = 5;

    state = {
        alerta: {
            mostrar: false,
            mensaje: ''
        },
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
        const { mostrar, mensaje } = this.state.alerta;
        const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : '';
        return(
            <Query query={PRODUCTOS_QUERY} variables={{limite: this.limite, offset: this.state.paginador.offset}}>
                {({ loading, error, data, refetch }) => {
                    if(loading) return "Loading..."
                    if(error) return `Error: ${error.message}`
                    
                    return (
                        <Fragment>
                            <h2 className="text-center mb-5">Productos</h2>
                            {alerta}
                            <table className="table"> 
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Editar</th>
                                        <th scope="col">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.obtenerProductos.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.nombre}</td>
                                            <td>{item.precio}</td>
                                            <td>{item.stock}</td>
                                            <td>
                                                <Link to={`/producto/editar/${item.id}`} className="btn btn-success">Editar Producto</Link>
                                            </td>
                                            <td>
                                                <Mutation 
                                                    mutation={ELIMINAR_PRODUCTO} 
                                                    onCompleted={(data) => {
                                                        this.setState({
                                                            alerta: {
                                                                mostrar: true,
                                                                mensaje: data.eliminarProducto
                                                            }
                                                        }, () =>{
                                                            setTimeout(() => {
                                                                this.setState({
                                                                    alerta: {mostrar: false, mensaje: ''}
                                                                });
                                                            }, 3000);
                                                        });
                                                        refetch();
                                                    }}>
                                                    {eliminarProducto => (
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-danger"
                                                            onClick={() => {
                                                                const id = item.id;

                                                                if (window.confirm('Are you sure?')) {
                                                                    eliminarProducto({
                                                                        variables: {id}
                                                                    });
                                                                }
                                                            }}>
                                                                &times; Eliminar
                                                        </button>
                                                    )}
                                                </Mutation>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Paginador 
                                actual={this.state.paginador.actual} 
                                total={data.totalProductos}
                                limite={this.limite}
                                paginaAnterior={this.paginaAnterior}
                                paginaSiguiente={this.paginaSiguiente}/>
                        </Fragment>
                    );
                }}
            </Query>
        );
    }
};

export default Productos;