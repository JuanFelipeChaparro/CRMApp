import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { PEDIDOS_QUERY } from '../../queries';
import Pedido from './Pedido';
import '../../spinner.css';

const PedidosCliente = ({match: {params: {id}}}) => (
    <Fragment>
        <h2 className="text-center mb-5">Pedidos del Cliente</h2>
        <div className="row">
            <Query query={PEDIDOS_QUERY} variables={{cliente: id}}>
                {({loading, error, data}) => {
                    if (loading)
                        return (
                            <div className="spinner">
                                <div className="bounce1"></div>
                                <div className="bounce2"></div>
                                <div className="bounce3"></div>
                            </div>
                        );
                
                    if (error) return `Error: ${error.message}`;
                    
                    return (
                        data.obtenerPedidos.map(pedido => (
                            <Pedido 
                                key={pedido.id}
                                pedido={pedido}
                                cliente={id} />
                        ))
                    );
                }}
            </Query>
        </div>
    </Fragment>
);

export default PedidosCliente;