import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext
} from "react";

import "./clientes-pesquisar.css";
import { ClientesService } from "../clientes-service";
import RemotePagination from "../../../components/tabela";
import { GlobalContext } from "../../../comum/global-context";
import { useLoader } from "../../../comum/hooks";
import ClienteInfo from "./cliente.info";
import { mensagemSucesso, mensagemErro } from "../../../components/toastr";
// import { PanelGroup } from "react-bootstrap";

const ClientePesquisar = props => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalSize, setTotalSize] = useState(0);
  const [propriedadeOrdenacao, setPropriedadeOrdenacao] = useState(null);
  const [ascendente, setAscendente] = useState(true);
  // const [filtroNome, setFiltroNome] = useState({});
  const [mostrarInfo, setMostrarInfo] = useState({});
  const [filtro, setFiltro] = useState(false);
  const inputFiltroNome = useRef("");
  const [i, setI] = useContext(GlobalContext);
  const [loading] = useLoader();
  const [clientes, setClientes] = useState([]);

  const carregarClientes = useCallback(() => {
    new ClientesService().listarTodos().then(res => {
      setClientes(res.data);
    }).catch(erro => {
      console.error(erro);
    }).finally(() => {
      loading(false);
    });
  }, [loading]);

  const emMemoria = useCallback(() => {
    loading("Carregando Clientes...");

    if (clientes.length <= 0) {
      carregarClientes();
    }

    if (!filtro) {
      let ordem = ascendente ? 1 : -1;
      let propriedade = propriedadeOrdenacao;
      if ('-' === propriedade) {
        ordem = -1;
        propriedade = propriedade.substr(1);
      }
      const sort = function (c1, c2) {
        let result = (c1[propriedade] < c2[propriedade]) ? -1 : (c1[propriedade] > c2[propriedade]) ? 1 : 0;
        return result * ordem;
      }
      clientes.sort(sort);
      setTotalSize(clientes.length);
      setPage(page);
      setSizePerPage(sizePerPage);
      const pag = clientes.slice((page - 1) * sizePerPage, page * sizePerPage);
      setData(pag);
    }
    loading(false);
  }, [
    page,
    sizePerPage,
    ascendente,
    propriedadeOrdenacao,
    carregarClientes,
    clientes,
    filtro,
    loading
  ]);

  useEffect(() => {
    const rota = [
      { rota: "/home", texto: "Home" },
      { rota: "/cliente", texto: "Pesquisar Cliente" }
    ];
    setI(rota);
    emMemoria();
  }, [emMemoria, setI]);

  const handleTableChange = useCallback((type, { page, sizePerPage }) => {
    console.log("TIPO DO EVENTO", type);
    setPage(page);
    setSizePerPage(sizePerPage);
  }, []);

  /**
   * Não se deve chamar o fetch, pois a cada callback o useEffect,
   * é chamado para remontar o componente
   */
  const handleSort = useCallback((field, order) => {
    setPropriedadeOrdenacao(field);
    setAscendente(order === "asc" ? true : false);
  }, []);

  function filtrar() {
    console.log(inputFiltroNome.current.value.toLowerCase());
    setData([...clientes]);
    setFiltro(false);
    if (inputFiltroNome.current.value) {
      const dadosFiltrados = clientes.filter(c => {
        return c.nome.toLowerCase() === inputFiltroNome.current.value.toLowerCase();
      });
      setTotalSize(dadosFiltrados.length);
      setData(dadosFiltrados);
      setFiltro(true);
    }
  }

  function enviar() {
    const clientesSelecionados = clientes.filter(c => {
      return c.selecionado === true;
    });
    console.log(clientesSelecionados);
    new ClientesService().enviarEmails(clientesSelecionados).then(res => {
      console.log(res);
      if (res && res.status === 200) {
        mensagemSucesso('Emails enviados com sucesso!');
      }
    }, err => {
      console.log('>>>>>>>>>>', err.response.data);
      mensagemErro(err.response.data);
    }, () => {

    });
  }

  function novoCliente() {
    props.history.push({
      pathname: "/clientes/novo",
      state: { cliente: {}, somenteLeitura: false }
    })
  }

  const onSelectAll = (isSelected) => {
    clientes.forEach(c => {
      c.selecionado = isSelected;
    });
  }

  const onSelect = (row, isSelect) => {
    const index = clientes.indexOf(row);
    row.selecionado = isSelect;
    if (index !== -1) {
      clientes[index] = row;
    }
  }

  const selectRowProp = {
    mode: 'checkbox',
    onSelectAll: onSelectAll,
    onSelect: onSelect,
    selectColumnPosition: 'left',
    // hideSelectColumn: true,
    // clickToSelect: true,
    // bgColor: 'red'
    // selectionRenderer: ({ mode, checked, disabled }) => (
    //   <input style={{magin: "4px"}} type="checkbox" mode={mode} checked={checked} disabled={disabled} />
    // )
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      onSort: handleSort,
      style: { width: "90px", textAlign: "center" }
    },
    {
      dataField: "nome",
      text: "Nome",
      sort: true,
      onSort: handleSort
    },
    {
      dataField: "buttons",
      text: "Ações",
      headerStyle: { width: 10 + "rem", textAlign: "center" },
      formatter: renderButtons
    }
  ];

  function editar(row, somenteLeitura) {
    props.history.push({
      pathname: "/clientes/novo",
      state: { cliente: row, somenteLeitura: somenteLeitura }
    });
  }

  function renderButtons(cell, row) {
    const botaoEditar = (
      <button
        className="btn btn-success btn-sm py-0"
        onClick={() => editar(row, false)}
      >
        <i className="fa fa-edit"></i>
      </button>
    );
    const botaoVisualizar = (
      <button
        className="btn btn-primary btn-sm py-0"
        onClick={() => editar(row, true)}
      >
        <i className="fa fa-eye"></i>
      </button>
    );

    return (
      <div className="tdAcoes">
        {botaoEditar} {botaoVisualizar}
      </div>
    );
  }

  return (
    <div className="container containerFormulario">

      <div className="card">


        <div class="card-header">

          <div class="d-flex justify-content-between">

            <div class="p-2 bd-highlight"><h1>Pesquisar Cliente</h1></div>

            <div class="p-2 bd-highlight">


              <button
                className="btn btn-primary btn-md float-right mr-1"
                id="btnEnviar"
                name="btnEnviar"
                type="button"
                onClick={() => enviar()}> Enviar Emails &nbsp;
            <i className="fa fa-send"></i>
              </button>

              <button
                className="btn btn-success btn-md float-right mr-1"
                id="btnNovo"
                name="btnNovo"
                onClick={() => novoCliente()}> Novo Cliente &nbsp;
            <i className="fa fa-plus"></i>
              </button>


            </div>

          </div>

        </div>

        <div class="card-body">

          <div className="row mb-3">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <label htmlFor="inputNome">Nome do Cliente</label>
              <input
                ref={inputFiltroNome}
                type="text"
                placeholder="Nome"
                id="inputNome"
                className="form-control form-control-sm"
              />
            </div>

            <div className="col-sm-12 col-lg-3 align-self-end">
              <button
                className="btn btn-success form-control-sm py-0"
                id="btnPesquisar"
                name="btnPesquisar"
                type="button"
                onClick={() => filtrar()}>
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-lg-12">
              <fieldset>
                <legend>Listagem de Clientes </legend>
                <div className="mr-2">
                  <RemotePagination
                    data={data}
                    page={page}
                    columns={columns}
                    keyField="id"
                    sizePerPage={sizePerPage}
                    totalSize={totalSize}
                    onTableChange={handleTableChange}
                    selectRow={selectRowProp}
                  />
                  {mostrarInfo.mostrar === true && (
                    <ClienteInfo
                      cliente={mostrarInfo.cliente}
                      open={mostrarInfo.mostrar === true}
                      hide={() =>
                        setMostrarInfo({ cliente: null, mostrar: false })
                      }
                    ></ClienteInfo>
                  )}
                </div>
              </fieldset>
            </div>

          </div>
        </div>


        <div className="card-footer">

          <div class="d-flex justify-content-end">

            <div class="p-2 bd-highlight">

              <button
                className="btn btn-primary btn-md float-right mr-1"
                id="btnEnviar"
                name="btnEnviar"
                type="button"
                onClick={() => enviar()}> Enviar Emails &nbsp;
                <i className="fa fa-send"></i>
              </button>

              <button
                className="btn btn-success btn-md float-right mr-1"
                id="btnNovo"
                name="btnNovo"
                onClick={() => novoCliente()}> Novo Cliente &nbsp;
                <i className="fa fa-plus"></i>
              </button>


            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ClientePesquisar;
