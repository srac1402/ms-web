import React, { useState, useEffect, useContext } from "react";

import { GlobalContext } from "../../comum/global-context";
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from "../login/autenticacao-service";

const Home = () => {
  const [usuario, setUsuario] = useState();
  const [i, setI] = useContext(GlobalContext);
  i.state = {};

  useEffect(() => {

    console.log(USER_NAME_SESSION_ATTRIBUTE_NAME);

    setUsuario(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME));
    setI([{rota: '/home', texto: 'Home'}]);
  },[setI]);

  return (
    <div>
      <div id="home">
        <h1> Bem-vindo(a) - {usuario} </h1>
      </div>
    </div>
  );
};

export default Home;
