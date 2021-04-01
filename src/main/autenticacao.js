import { USER_NAME_SESSION_ATTRIBUTE_NAME } from "../views/login/autenticacao-service";

const Autenticado = () => ( 
    sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) !== null
);

export default Autenticado;