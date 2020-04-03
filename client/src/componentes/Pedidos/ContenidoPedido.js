import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/animated';
import Resumen from './Resumen';
import GenerarPedido from './GenerarPedido';
import Error from '../Alertas/Error';

class ContenidoPedido extends Component {
    state = {
        productos: [],
        total: 0
    }

    seleccionarProducto = productos => {
        (productos && productos.length > 0) ? this.setState({productos}) : this.setState({productos: [], total: 0});
    }

    actualizarTotal = () => {
        let nuevoTotal = 0;
        const { productos } = this.state;

        if (productos.length > 0) {
            productos.map(producto => nuevoTotal += producto.cantidad * producto.precio);
        }

        this.setState({total: nuevoTotal});
    }

    actualizarCantidad = (cantidad, index) => {
        const { productos } = this.state;

        if (productos.length > 0)
            productos[index].cantidad = Number(cantidad);

        this.setState({productos}, () => this.actualizarTotal());
    }

    eliminarProducto = id => {
        const { productos } = this.state;
        const productosRestantes = productos.filter(producto => producto.id !== id);

        this.setState({productos: productosRestantes}, () => this.actualizarTotal());
    }

    render() {
        const mensaje = (this.state.total < 0) ? <Error error="Las cantidades no pueden ser negativas" /> : '';
        return(
            <Fragment>
                <h3 className="text-center mb-5">Seleccionar Articulos</h3>
                {mensaje}
                <Select
                    onChange={this.seleccionarProducto}
                    options={this.props.productos}
                    value={this.state.productos}
                    isMulti={true}
                    components={Animated()}
                    placeholder={'Seleccionar...'}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}/>

                <Resumen productos={this.state.productos} actualizarCantidad={this.actualizarCantidad} eliminarProducto={this.eliminarProducto}/>

                <p className="font-weight-bold float-right mt-3">Total:
                    <span className="font-weight-normal">$ {this.state.total}</span>
                </p>

                <GenerarPedido productos={this.state.productos} total={this.state.total} idCliente={this.props.id} />
            </Fragment>
        );
    }
};

export default ContenidoPedido;