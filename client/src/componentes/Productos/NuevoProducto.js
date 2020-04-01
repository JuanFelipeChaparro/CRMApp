import React, { Component, Fragment } from 'react';
import { NUEVO_PRODUCTO } from '../../mutations';
import { Mutation } from 'react-apollo';

const initialState = {
    nombre: '',
    precio: '',
    stock: ''
}

class NuevoProducto extends Component {
    state = {
        ...initialState
    }

    limpiarState = () => {
        this.setState({
            ...initialState
        });
    }

    actualizarState = (evt, isNumber) => {
        const { name, value } = evt.target;
        this.setState({[name] : isNumber? Number(value) : value});
    }

    validarForm = () => {
        const { nombre, precio, stock } = this.state;
        return !nombre || !precio || !stock;
    }

    render() {
        return(
            <Fragment>
                <h2 className="text-center">Nuevo Producto</h2>
                <div className="row justify-content-center">
                    <Mutation mutation={NUEVO_PRODUCTO} onCompleted={() => this.props.history.push('/productos')}>
                        {nuevoProducto => (
                            <form 
                                className="col-md-8" 
                                onSubmit={evt => {
                                    evt.preventDefault();
                                    const input = this.state;

                                    nuevoProducto({
                                        variables: {input}
                                    });

                                    this.limpiarState();
                                }}>
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        type="text"
                                        name="nombre" 
                                        className="form-control" 
                                        placeholder="Nombre del Producto"
                                        onChange={evt => this.actualizarState(evt, false)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio:</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">$</div>
                                        </div>
                                        <input 
                                            type="number" 
                                            name="precio" 
                                            className="form-control" 
                                            placeholder="Precio del Producto"
                                            onChange={evt => this.actualizarState(evt, true)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Stock:</label>
                                    <input 
                                        type="number" 
                                        name="stock" 
                                        className="form-control" 
                                        placeholder="Stock del Producto"
                                        onChange={evt => this.actualizarState(evt, true)}
                                    />
                                </div>
                                <button 
                                    disabled={this.validarForm()}
                                    type="submit" 
                                    className="btn btn-success float-right">
                                        Crear Producto
                                </button>
                            </form>
                        )}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
};

export default NuevoProducto;