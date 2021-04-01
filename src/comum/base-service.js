import axios from 'axios';
import { mensagemErro } from '../components/toastr';
import { AuthenticationService } from '../views/login/autenticacao-service';

export const urlApi = () => (
    // 'http://192.168.1.101:8080/ms-api'
    'http://localhost:8080/ms-api'
);

export function axiosConfig() {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    // Início interceptor

    // axios.interceptors.response.use_ = function(onFullfilled, onRejected) {
    //     axios.interceptors.response.use(
    //         // onFullfilled
    //         function(response) {
    //             try {
    //                 return onFullfilled.call(this, response);
    //             }
    //             catch(e) {
    //                 return onRejected.call(this, e);
    //             }
    //         },
    //         // onRejected
    //         onRejected
    //     )
    // };

    axios.interceptors.response.use(
        response => {
            console.log(response);
            return response;
        },
        error => {
            if (error.response.status === 401) { // UNAUTHORIZED
                tratarErro('Erro de autenticação, redirecionando...', '/');
            } else if (error.response.status === 403) { // FORBIDDEN
                tratarErro('Erro de autenticação, redirecionando...', '/');
            } else {
                return Promise.reject(error);
            }
        });
    // Fim interceptor

    return axios;
};

const tratarErro = (mensagem, url) => {
    mensagemErro(mensagem);
    // Promise.reject(error);
    window.setTimeout(
        function () {
            new AuthenticationService().logout();
            window.location = url;
        }, 3000);
}

