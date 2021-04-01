import React, { useEffect, useRef } from "react";

import "./login-acessar.css";

import { AuthenticationService, USER_NAME_SESSION_ATTRIBUTE_NAME } from "../autenticacao-service";
import { useLoader } from "../../../comum/hooks"
import { mensagemErro } from '../../../components/toastr'


const Login = props => {

  const txtUsuario = useRef(null);
  const txtSenha = useRef(null);

  // const [permissoes, setPermissoes] = useContext(UsuarioContext);
  const authenticationService = new AuthenticationService();
  const [loading] = useLoader();

  const loginClicked = () => {

    loading('Acessando...')
    authenticationService
      .executeJwtAuthenticationService(txtUsuario.current.value, txtSenha.current.value)
      .then(response => {

        // console.log(response);

        const login = response.data;
        // const nomeDeUsuario = login.colaborador
        //   ? login.colaborador.nome
        //   : "Usuário Não Identificado";
        authenticationService.registerSuccessfulLoginForJwt(
          login.usuario,
          login.token,
          '', // permissoes de usuario
        );
        // permissoes.state = {};
        // setPermissoes(login.nivelUsuario.permissoes);
        props.history.push(`/home`);
      })
      .catch(e => {
        mensagemErro("Erro ao acessar o Sistema!");
      }).finally(() => {
        loading(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) !== null) {
      props.history.push("home");
    } else {
      props.history.push("login");
    }
  }, [props.history]);

  return (
    <div className="login">
      <h1>Acesso</h1>
      <span className="p-float-label">

        <label htmlFor="inputUsuario">Usuário:</label>
        <input
          ref={txtUsuario}
          type="usuario"
          className="form-control"
          id="inputUsuario"
          placeholder="Digite o Usuário"
          autoComplete="off"
        />
      </span>
      <span className="p-float-label">
        <label htmlFor="inputSenha">Senha:</label>
        <input
          ref={txtSenha}
          type="password"
          className="form-control"
          id="inputSenha"
          placeholder="Senha" />
      </span>

      <button
        onClick={loginClicked}
        type="button"
        className="btn btn-success mt-2">
        <i className="fa fa-sign-in"></i> Entrar</button>

    </div>
  );
};

export default Login;
