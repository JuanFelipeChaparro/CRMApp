import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './componentes/Header';
import Clientes from './componentes/Clientes';
import EditarCliente from './componentes/EditarCliente';
import NuevoCliente from './componentes/NuevoCliente';

const client = new ApolloClient({
	uri: 'http://localhost:8000/graphql',
	cache: new InMemoryCache({
		addTypename: false
	}),
	onError: ({networkError, graphQLErrors}) => {
		console.log('graphQLErrors', graphQLErrors);
		console.log('networkError', networkError);
	}
});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Router>
					<Fragment>
						<Header />
						<div className="container">
							<Switch>
								<Route exact path="/" component={Clientes} />
								<Route exact path="/cliente/editar/:id" component={EditarCliente} />
								<Route exact path="/cliente/nuevo" component={NuevoCliente} />
							</Switch>
						</div>
					</Fragment>
				</Router>
			</ApolloProvider>
		);
	}
}

export default App;