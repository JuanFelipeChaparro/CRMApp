import React, { Fragment } from 'react';
import Clientes from './Clientes';

const Panel = () => (
    <Fragment>
        <h2 className="text-center mb-5">TOP 10 Clientes</h2>
        <Clientes />
    </Fragment>
);

export default Panel;