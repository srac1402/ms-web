import React, { useState, useEffect } from "react";

// Importações do css tem que ser nesta ordem:
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';

import "./App.css";

import logo from "./logo.svg";

import Rotas from "./rotas";
import Autenticado from "./autenticacao";
import {
  AuthenticationService,
  USER_NAME_SESSION_ATTRIBUTE_NAME
} from "../views/login/autenticacao-service";


import {
  GlobalContext,
  UsuarioContext,
  LoadingContext
} from "../comum/global-context";

import Loading from "../components/loading/loading";

import {
  Container,
  Nav,
  Row,
  Col,
  Button,
  Accordion,
  Breadcrumb
} from "react-bootstrap";

const App = () => {
  const [statusSideBar, setStatusSideBar] = useState("d-flex");
  const [menuCadastro, setMenuCadastro] = useState(false);
  // const [menuEmprestimo, setMenuEmprestimo] = useState(false);
  // const [menuAberturaConta, setMenuAberturaConta] = useState(false);
  const [info, setInfo] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [loader, setLoader] = useState([
    {
      loading: false,
      message: ""
    }
  ]);

  function mostrarEsconderSideBar() {
    if (statusSideBar === "d-flex") {
      setStatusSideBar("d-flex toggled");
    } else {
      setStatusSideBar("d-flex");
    }
  }

  function sair() {
    new AuthenticationService().logout();
    window.location = "/";
  }

  useEffect(() => {
    // if (usuario.length > 0) {
    //   localStorage.setItem(PARAMETRO_INICIAL, JSON.stringify(usuario));
    // }
    document.title = "MS";
    // Equivalente a componentWillUnmount
    return () => { };
  }, [usuario, loader]);

  function createBreadCrumb() {
    let items = [];
    let tam = info.length;
    info.map((el, i) => {
      let ultimo = i + 1 === tam;
      items.push(
        <Breadcrumb.Item active={ultimo} key={i} href={el.rota}>
          {el.texto.trim()}
        </Breadcrumb.Item>
      );
      return el;
    });
    return items;
  }

  const iconMenuCadastro = menuCadastro
    ? "fa fa-angle-double-down mr-2"
    : "fa fa-angle-double-right mr-2";

  return (
    <GlobalContext.Provider value={[info, setInfo]}>
      <UsuarioContext.Provider value={[usuario, setUsuario]}>
        <LoadingContext.Provider value={[loader, setLoader]}>
          <div className={statusSideBar} id="wrapper">
            <Loading {...loader} />
            {Autenticado() === true && (
              <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">
                  <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo" />
                    MS
                  </div>

                <div className="list-group list-group-flush">
                  <a
                    href="/home"
                    className="list-group-item list-group-item-action bg-light" >
                    <i
                      className="fa fa-home mr-2"
                      aria-hidden="true" ></i>
                      Home
                    </a>

                  <Accordion defaultActiveKey="1">
                    <Accordion.Toggle
                      onClick={() => {
                        setMenuCadastro(!menuCadastro);
                      }}
                      eventKey="0"
                      className="list-group-item list-group-item-action">
                      <span
                        className="fa fa-users mr-2"
                        aria-hidden="true"
                      ></span>
                      <span
                        className={iconMenuCadastro}
                        aria-hidden="true"
                      ></span>
                        Cadastros
                      </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                      <a
                        href="/clientes"
                        className="list-group-item dropdown-item list-group-submenu bg-gradient-warning"
                      > Clientes </a>

                    </Accordion.Collapse>

                  </Accordion>


                </div>
              </div>
            )}

            <div id="page-content-wrapper">
              {Autenticado() === true && (
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                  <button
                    onClick={mostrarEsconderSideBar}
                    className="botaoMenu"
                    id="menu-toggle"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                      <Nav className="mr-auto nav-item active">
                        <a className="nav-link" href="/home">
                          {sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)}
                          <span className="sr-only">(current)</span>
                        </a>
                      </Nav>

                      <Nav className="mr-auto">
                        <Button variant="outline-danger" onClick={sair}>
                          Sair
                          </Button>
                      </Nav>
                    </ul>
                  </div>
                </nav>
              )}

              <Container fluid>
                {Autenticado() === true && (
                  <Breadcrumb className="mt-2">
                    {createBreadCrumb()}
                  </Breadcrumb>
                )}
                <Row>
                  <Col sm={12}>
                    <Rotas></Rotas>
                  </Col>
                </Row>

              </Container>

            </div>

          </div>

          {Autenticado() === true && (<div className="footer">
            <span className="textoRodape">© MS - ReactJs</span>
          </div>)}

        </LoadingContext.Provider>
      </UsuarioContext.Provider>
    </GlobalContext.Provider>
  );
};

export default App;
