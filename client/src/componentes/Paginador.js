import React, { Component } from 'react'

class Paginador extends Component {
    state = {
        paginador: {
            paginas: Math.ceil(this.props.total / this.props.limite)
        }
    }

    render() {
        const { actual } = this.props;
        const  btnAnterior = (actual > 1) ? <button className="btn btn-success mr-2" type="button" onClick={this.props.paginaAnterior}>&laquo; Anterior</button> : '';
        const { paginas } = this.state.paginador;
        const btnSiguiente = (actual !== paginas) ? <button className="btn btn-success" type="button" onClick={this.props.paginaSiguiente}>&raquo; Siguiente</button> : '';

        return (
            <div className="mt-5 d-flex justify-content-center mb-5">
                {btnAnterior}
                {btnSiguiente}
            </div>
        );
    }
}

export default Paginador;