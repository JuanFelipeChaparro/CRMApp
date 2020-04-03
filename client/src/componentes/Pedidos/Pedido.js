import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { PRODUCTO_QUERY } from '../../queries';
import { ACTUALIZAR_PEDIDO } from '../../mutations';
import ResumenProducto from './ResumenProducto';

const Pedido = ({pedido, cliente}) => (
    <div className="col-md-4">
        <div className={`card mb-3`} >
            <div className="card-body">
                <p className="card-text font-weight-bold ">Estado:
                    <Mutation mutation={ACTUALIZAR_PEDIDO}>
                        {actualizarPedido => (
                            <select 
                                className="form-control my-3" 
                                defaultValue={pedido.estado}
                                onChange={e => {
                                    const input = {
                                        id: pedido.id,
                                        pedido: pedido.pedido,
                                        fecha: pedido.fecha,
                                        total: pedido.total,
                                        cliente,
                                        estado: e.target.value
                                    };

                                    actualizarPedido({
                                        variables: {input}
                                    });
                                }}> 
                                <option value="PENDIENTE">PENDIENTE</option>
                                <option value="COMPLETADO">COMPLETADO</option>
                                <option value="CANCELADO">CANCELADO</option>
                            </select>
                        )}
                    </Mutation>
                </p> 
                <p className="card-text font-weight-bold">Pedido ID:
                    <span className="font-weight-normal"> {pedido.id}</span>
                </p> 
                <p className="card-text font-weight-bold">Fecha Pedido: 
                    <span className="font-weight-normal"> {new Date(Number(pedido.fecha)).toDateString()}</span>
                </p>
                <p className="card-text font-weight-bold">Total: 
                    <span className="font-weight-normal"> ${pedido.total}</span>
                </p>

                <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
                {pedido.pedido.map(producto => (
                    <Query key={producto.id} query={PRODUCTO_QUERY} variables={{id: producto.id}}>
                        {({loading, error, data}) => {
                            if (loading) return 'Loading...';
                            if (error) return `Error: ${error.message}`;

                            return (
                                <ResumenProducto producto={data.obtenerProducto} cantidad={producto.cantidad}/>
                            );

                        }}
                    </Query>
                ))}
            </div>
        </div>
    </div>
);

export default Pedido;