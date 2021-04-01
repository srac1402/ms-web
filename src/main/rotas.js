import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Autenticado from "./autenticacao";
import Login from "../views/login/acessar/login-acessar";
import Home from "../views/home/home";
import ClientePesquisar from "../views/clientes/pesquisar/clientes-pesquisar";
import ClientesManter from "../views/clientes/manter/clientes-manter";

const RotasPrivadas = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Autenticado() === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default class Rotas extends Component {
  constructor(props) {
    super(props);
    this.state = { logado: Autenticado() };
  }

  routes() {
    return (
      <Fragment>
        <Route
          exact
          path="/"
          render={props => <Login {...props} />}
        ></Route>

        <Route
          path="/login"
          render={props => <Login {...props} />}
        />

        <RotasPrivadas exact path="/home" component={Home}></RotasPrivadas>

        <RotasPrivadas
          exact
          path="/clientes"
          component={ClientePesquisar}
        ></RotasPrivadas>

        <RotasPrivadas
          exact
          path="/clientes/novo"
          component={ClientesManter}
        ></RotasPrivadas>

      </Fragment>
    );
  }

  // Switch - Não permite abrir mais de uma rota (mesmo que possuam o mesmo nome)
  render() {
    return (
      <BrowserRouter>
        <Switch>{this.routes()}</Switch>
      </BrowserRouter>
    );
  }
}
