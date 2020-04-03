import React, { Fragment } from 'react';
import Producto from './Producto';

const Resumen = (props) => {
    const productos = props.productos;

    if (productos.length === 0) return null;

    return(
        <Fragment>
            <h3 className="text-center my-5">Resumen y Cantidades</h3>
            <table className="table">
                <thead className="bg-success text-light">
                    <tr className="font-weight-bold">
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, index) =>(
                        <Producto 
                            key={producto.id} 
                            producto={producto} 
                            index={index} 
                            actualizarCantidad={props.actualizarCantidad}
                            eliminarProducto={props.eliminarProducto}/>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Resumen;