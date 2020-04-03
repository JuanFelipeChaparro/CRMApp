import React from 'react';
import { Query } from 'react-apollo';
import { TOP_CLIENTES } from '../../queries';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'; 

const Clientes = () => (
    <Query query={TOP_CLIENTES}>
        {({loading, error, data}) => {
            if (loading) return 'Loading...';
            if (error) return `Error: ${error.message}`;

            const topClientes = [];

            data.topClientes.map((pedido, index) => (
                topClientes[index] = {
                    ...pedido.cliente[0],
                    total: pedido.total
                }
            ));

            return (
                <div className="row justify-content-center">
                    <BarChart 
                        width={700} 
                        height={300}
                        data={topClientes}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="nombre" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                </div>
            );
        }}
    </Query>
);

export default Clientes;