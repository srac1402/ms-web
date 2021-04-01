import toastr from 'toastr';

// Command: toastr["success"]("Are you the six fingered man?")

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

const mostrarMensagem = (titulo, mensagem, tipo) => {
    toastr[tipo](mensagem, titulo)
}

const mensagemErro = (titulo = "Erro", mensagem) => {
    return mostrarMensagem(titulo, mensagem, "error")
}

const mensagemSucesso = (titulo = "Sucesso", mensagem) => {
    return mostrarMensagem(titulo, mensagem, "success")
}

const mensagemAlerta = (titulo = "Alerta", mensagem) => {
    return mostrarMensagem(titulo, mensagem, "warning")
}

export  { mostrarMensagem, mensagemErro, mensagemSucesso, mensagemAlerta };