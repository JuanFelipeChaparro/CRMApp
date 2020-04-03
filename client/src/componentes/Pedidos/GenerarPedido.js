import React from 'react';
import { Mutation } from 'react-apollo';
import { NUEVO_PEDIDO } from '../../mutations';
import { withRouter } from 'react-router-dom';

const validarPedido = props => {
    return !props.productos || props.total <= 0 || props.productos.length === 0;
};

const GenerarPedido = (props) => (
    <Mutation mutation={NUEVO_PEDIDO} onCompleted={() => props.history.push('/clientes')}>
        {nuevoPedido => (
            <button 
                disabled={validarPedido(props)}
                type="button" 
                className="btn btn-warning mt-4"
                onClick={e => {
                    const productosInput = props.productos.map(({nombre, precio, stock, ...objeto}) => objeto);
                    const input = {};

                    input.pedido = productosInput;
                    input.total = props.total;
                    input.cliente = props.idCliente;

                    nuevoPedido({
                        variables: {input}
                    });
                }}>
                Generar Pedido
            </button>
        )}
    </Mutation>
);

export default withRouter(GenerarPedido);