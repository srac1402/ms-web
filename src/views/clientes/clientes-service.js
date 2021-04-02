import { urlApi, axiosConfig } from '../../comum/base-service';

export class ClientesService {

    listarTodos = async (params = null) => {
        const url = `${urlApi()}/clientes/pesquisar`;
        const resp = await axiosConfig().get(url, { params: params });
        return resp;
    }

    recuperarPorId = async (id) => {
        const url = `${urlApi()}/clientes/pesquisar/{id}`;
        try {
            const resp = await axiosConfig().get(url, { params: id });
            return resp;
        }
        catch (error) {
            console.log(error);
        }
    }

    enviarEmails = async (clientes) => {
        const url = `${urlApi()}/clientes/enviar-emails`;
        const resp = await axiosConfig().post(url, clientes);
        return resp;
    }

    salvar = async (cliente) => {
        const url = `${urlApi()}/clientes/salvar`;
        const resp = await axiosConfig().post(url, cliente);
        return resp;
    }

    atyalizar = async (cliente) => {

    }

}
