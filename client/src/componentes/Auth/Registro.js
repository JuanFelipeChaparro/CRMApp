import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { CREAR_USUARIO } from '../../mutations';
import Error from '../Alertas/Error';

const initialState = {
    usuario: '',
    password: '',
    repetirPassword: ''
}

class Registro extends Component {
    state = {
        ...initialState
    }

    limpiarState = () => {
        this.setState({...initialState});
    }

    actualizarState = evt => {
        const { name, value } = evt.target;
        
        this.setState({
            [name]: value
        });
    }

    validarForm = () => {
        const { usuario, password, repetirPassword } = this.state;
        return !usuario || !password || !repetirPassword || password !== repetirPassword;
    }

    render() {
        return(
            <Fragment>
                <h2 className="text-center mb-5">Nuevo Usuario</h2>
                <div className="row  justify-content-center">
                    <Mutation mutation={CREAR_USUARIO}>
                        {(crearUsuario, {loading, error, data}) => (
                            <form 
                                className="col-md-8"
                                onSubmit={e => {
                                    e.preventDefault();
                                    const { usuario, password } = this.state;
                                    crearUsuario({
                                        variables: {usuario, password}
                                    }).then(data => {
                                        this.limpiarState();
                                        this.props.history.push("/login");
                                    });
                                }}>
                                {error && <Error error={error} />}
                                <div className="form-group">
                                    <label>Usuario</label>
                                    <input 
                                        value={this.state.usuario}
                                        type="text" 
                                        name="usuario" 
                                        className="form-control" 
                                        placeholder="Nombre Usuario" 
                                        onChange={this.actualizarState}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input 
                                        value={this.state.password}
                                        type="password" 
                                        name="password" 
                                        className="form-control" 
                                        placeholder="Password"
                                        onChange={this.actualizarState}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Repetir Password</label>
                                    <input 
                                        value={this.state.repetirPassword}
                                        type="password" 
                                        name="repetirPassword" 
                                        className="form-control" 
                                        placeholder="Repetir Password" 
                                        onChange={this.actualizarState}
                                    />
                                </div>

                                <button 
                                    disabled={loading || this.validarForm()}
                                    type="submit" 
                                    className="btn btn-success float-right">
                                        Crear Usuario
                                </button>
                            </form>
                        )}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
};

export default Registro;