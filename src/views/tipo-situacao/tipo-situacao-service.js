import { urlApi, axiosConfig } from '../../comum/base-service';

export class TipoSituacaoService {

    listarTodos = async (params = null) => { 
        const url = `${urlApi()}/tiposituacao/pesquisar`;
        try {
            const resp = await axiosConfig().get(url, { params: params });
            return resp;
        }
        catch (error) {
            console.log(error);
        }
    }

    recuperarPorId = async (id) => {

    }

    salvar() {

    }

    atualizar() {

    }
}