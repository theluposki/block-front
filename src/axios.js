import axios from "axios";
import config from "./config.js";

export const api = axios.create({
  baseURL: config.BASE_URL,
  mode: "cors",
  cache: "no-cache",
  withCredentials: true,
  referrerPolicy: "origin",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Requisições que chegaram ao servidor, mas retornaram código de erro
      switch (error.response.status) {
        case 401:
          // Tratar autenticação
          console.log(401)
          break;
        case 403:
          // Tratar permissões
          console.log(403)
          break;
        case 500:
          // Tratar erros do servidor
          console.log(500)
          break;
        default:
          return Promise.reject(error);
      }
    } else if (error.request) {
      // Requisições que não chegaram ao servidor
      console.error("Erro de rede:", error.request);
    } else {
      // Erros de validação ou outros erros
      console.error("Erro:", error.message);
    }
    return Promise.reject(error);
  }
);
