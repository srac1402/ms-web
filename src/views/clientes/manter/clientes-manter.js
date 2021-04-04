import React, { useState, useEffect, useContext, useRef } from "react";
import { mensagemErro, mensagemSucesso } from "../../../components/toastr";

import { GlobalContext } from "../../../comum/global-context";
import { ClientesService } from "../clientes-service";

const ClientesManter = props => {

  const [cliente, setCliente] = useState(
    props.location.state.cliente
  );
  const [somenteLeitura] = useState(props.location.state.somenteLeitura);

  const txtNome = useRef();
  const txtEmail = useRef();
  const txtAssunto = useRef();
  const txtMensagem = useRef();

  const [titulo, setTitulo] = useState("");
  const [i, setI] = useContext(GlobalContext);
  i.state = {};

  function salvar() {
    preencherObjetoCliente();
  }

  function preencherObjetoCliente() {
    cliente.nome = txtNome.current.value;
    cliente.email = txtEmail.current.value;
    setCliente(cliente);
    new ClientesService().salvar(cliente).then(res => {
      console.log(res);
      if (res && res.status === 200) {
        mensagemSucesso('Cliente cadastrado com sucesso!');
        voltar();
      }
    }, err => {
      mensagemErro(err.response.data);
    }, () => {

    });
  }

  function voltar() {
    props.history.push("/clientes");
  }

  useEffect(() => {
    setTitulo(
      ` ${cliente.id === undefined
        ? "Cadastrar "
        : somenteLeitura === true
          ? "Visualizar "
          : "Atualizar "
      } Cliente`
    );
    const rota = [
      { rota: "/home", texto: "Home" },
      { rota: "/clientes", texto: "Pesquisar Cliente" },
      { rota: "/clientes/novo", texto: titulo }
    ];

    if (cliente.id) {
      txtNome.current.value = cliente.nome;
      txtEmail.current.value = cliente.email;
    }

    setI(rota);
  }, [setI, titulo, cliente, somenteLeitura]);

  return (

    <div className="container-fluid containerFormulario">

      <form>

        <div className="card">

          <div className="card-header">

            <div className="d-flex justify-content-between">

              <div className="p-2 bd-highlight"><h1>{titulo}</h1></div>

              <div className="p-2 bd-highlight">

                {somenteLeitura === false && (
                  <button
                    type="button"
                    onClick={salvar}
                    className="btn btn-primary btn-md mr-1">
                    {cliente.id === undefined ? "Salvar" : "Atualizar"}
                  </button>
                )}

                <button type="submit" onClick={voltar} className="btn btn-danger btn-md mr-1">
                  Voltar
                  </button>
              </div>

            </div>


          </div>


          <div className="card-body">
            <div className="form-group col-6">

              <label htmlFor="inputNumPessoa">Nome:</label>

              <input
                ref={txtNome}
                type="nome"
                className="form-control form-control-sm"
                id="inputNome"
                placeholder="Nome"
                required=""
                readOnly={somenteLeitura}
              />
            </div>

            <div className="form-group col-6">
              <label htmlFor="inputNome">Email:</label>
              <input
                ref={txtEmail}
                type="text"
                className="form-control form-control-sm"
                id="inputEmail"
                placeholder="Email"
                readOnly={somenteLeitura}
              />
            </div>

            <div className="form-group col-6">
              <label htmlFor="inputNome">Assunto:</label>
              <input
                ref={txtAssunto}
                type="text"
                className="form-control form-control-sm"
                id="inputAssunto"
                placeholder="Assunto"
                readOnly={somenteLeitura}
              />
            </div>

            <div className="form-group col-6">
              <label htmlFor="inputNome">Mensagem:</label>
              <textarea
                ref={txtMensagem}
                type="text"
                className="form-control form-control-sm"
                id="inputMensagem"
                placeholder="Mensagem"
                readOnly={somenteLeitura}
              />
            </div>

          </div>

          <div className="card-footer">

            <div className="d-flex justify-content-end">

              <div className="p-2 bd-highlight">

                {somenteLeitura === false && (
                  <button
                    type="button"
                    onClick={salvar}
                    className="btn btn-primary btn-md mr-1">
                    {cliente.id === undefined ? "Salvar" : "Atualizar"}
                  </button>
                )}

                <button type="submit" onClick={voltar} className="btn btn-danger btn-md mr-1">
                  Voltar
                </button>
              </div>

            </div>

          </div>

        </div>

      </form>
    </div>

  );
};

export default ClientesManter;
