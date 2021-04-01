import { axiosConfig, urlApi } from '../../comum/base-service';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'usuario-autenticado-sessao'
// export const PARAMETRO_INICIAL = 'parametroInicial'

export class AuthenticationService {

    /**
     * envia o usuário e a senha para obter o token
     * preenche CredenciaisDTO no back
     * @param {*} username 
     * @param {*} password 
     */
    executeJwtAuthenticationService(login, senha) {
        return axiosConfig().post(`${urlApi()}/usuarios/autenticar`, {
            login,
            senha
        })
    }

    registerSuccessfulLoginForJwt(username, token, permissoes) {
        console.log('TOKEN', token);
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        localStorage.setItem("token", token);
        sessionStorage.setItem('Permissoes', permissoes);
    }

    // createJWTToken(token) {
    //     return 'Bearer ' + token
    // }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        // sessionStorage.removeItem(PARAMETRO_INICIAL);
        sessionStorage.removeItem("token");
    }

    // isUserLoggedIn() {
    //     let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    //     if (user === null) return false
    //     return true
    // }

    // getLoggedInUserName() {
    //     let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    //     if (user === null) return ''
    //     return user
    // }

    /**
     * Método de interceptor transferido para o configuração do 
     * axios
     */
    // setupAxiosInterceptors(token) {
    //     axios.interceptors.request.use(
    //         (config) => {
    //             if (this.isUserLoggedIn()) {
    //                 config.headers.authorization = token;
    //             }
    //             return config
    //         }
    //     )
    // }
}
