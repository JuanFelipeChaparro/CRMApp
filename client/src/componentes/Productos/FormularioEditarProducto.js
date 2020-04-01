import React, { Component, Fragment } from 'react';
import { ACTUALIZAR_PRODUCTO } from '../../mutations';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class FormularioEditarProducto extends Component {
    state = {
        ...this.props.producto
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
                <Mutation mutation={ACTUALIZAR_PRODUCTO} onCompleted={() => {
                    this.props.refetch().then(() => {
                        this.props.history.push('/productos');
                    })
                }}>
                    {actualizarProducto => (
                        <form 
                            className="col-md-8" 
                            onSubmit={evt => {
                                evt.preventDefault();
                                const input = this.state;

                                actualizarProducto({
                                    variables: {input}
                                });
                            }}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input 
                                    defaultValue={this.state.nombre}
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
                                        defaultValue={this.state.precio}
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
                                    defaultValue={this.state.stock}
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
                                    Guardar Cambios
                            </button>
                        </form>
                    )}
                </Mutation>
            </Fragment>
        );
    }
};

export default withRouter(FormularioEditarProducto);