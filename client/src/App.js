import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './componentes/Layout/Header';

import Clientes from './componentes/Clientes/Clientes';
import EditarCliente from './componentes/Clientes/EditarCliente';
import NuevoCliente from './componentes/Clientes/NuevoCliente';

import NuevoProducto from './componentes/Productos/NuevoProducto';
import Productos from './componentes/Productos/Productos';
import EditarProducto from './componentes/Productos/EditarProducto';

import NuevoPedido from './componentes/Pedidos/NuevoPedido';
import PedidosCliente from './componentes/Pedidos/PedidosCliente';

import Panel from './componentes/Panel/Panel';

import Registro from './componentes/Auth/Registro';
import Login from './componentes/Auth/Login';
import Session from './componentes/Session';

const NotFound = () => <h2 className="text-center">404 Page Not Found</h2>;

const App = ({refetch, session}) => {
	const { obtenerUsuario } = session;
	const msg = (obtenerUsuario) ? `Bievenido ${obtenerUsuario.usuario}` : <Redirect to="/login" />;
	return (
		<Router>
			<Fragment>
				<Header />
				<div className="container">
					<p className="text-right">{msg}</p>
					<Switch>
						<Route exact path="/clientes" component={Clientes} />
						<Route exact path="/cliente/editar/:id" component={EditarCliente} />
						<Route exact path="/cliente/nuevo" component={NuevoCliente} />
						
						<Route exact path="/productos" component={Productos} />
						<Route exact path="/producto/editar/:id" component={EditarProducto} />
						<Route exact path="/producto/nuevo" component={NuevoProducto} />

						<Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
						<Route exact path="/pedidos/:id" component={PedidosCliente} />

						<Route exact path="/panel" component={Panel} />

						<Route exact path="/registro" component={Registro} />
						<Route exact path="/login" render={() => <Login refetch={refetch} />} />

						<Route path="*" component={NotFound} />
					</Switch>
				</div>
			</Fragment>
		</Router>
	);
};

const RootSession = Session(App);

export { RootSession }