import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { CLIENTE_QUERY } from '../../queries';

const DatosCliente = ({ id }) => (
    <Fragment>
        <h3 className="text-center">Resumen de Cliente</h3>
        <Query query={CLIENTE_QUERY} variables={{id}}>
            {({loading, error, data}) => {
                if(loading) return "Loading..."
                if(error) return `Error: ${error.message}`

                const { nombre, apellido, edad, emails, empresa, tipo } = data.getCliente;

                return (
                    <ul className="list-unstyled my-3">
                        <li className="border font-weight-bold p-2">Nombre:
                            <span className="font-weight-normal"> {nombre}</span>
                        </li>
                        <li className="border font-weight-bold p-2">Apellido:
                            <span className="font-weight-normal"> {apellido}</span>
                        </li>
                        <li className="border font-weight-bold p-2">Edad:
                            <span className="font-weight-normal"> {edad}</span>
                        </li>
                        <li className="border font-weight-bold p-2">Email:
                            <span className="font-weight-normal"> {emails.map(email => ` ${email.email}`)}</span>
                        </li>
                        <li className="border font-weight-bold p-2">Empresa:
                            <span className="font-weight-normal"> {empresa}</span>
                        </li>
                        <li className="border font-weight-bold p-2">Tipo:
                            <span className="font-weight-normal"> {tipo}</span>
                        </li>
                    </ul>
                );
            }}
        </Query>
    </Fragment>
);

export default DatosCliente;