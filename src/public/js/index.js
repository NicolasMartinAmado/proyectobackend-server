const socket = io();

let user;
let chatbox = document.querySelector(`#chat`);

Swal.fire({
  title: `Ingrese su nombre de usuario`,
  input: `text`,
  text: `Ingresde el usuario para identificarse`,
  allowOutsideClick: false,
  inputValidator: (value) => {
    return !value && `Agrege un usuario!`;
  },
}).then((result) => {
  user = result.value;
  console.log(user);
});

chatbox.addEventListener(`keyup`, evt =>{
    if(evt.key === `Enter`){
        if(chatbox.value.trim().length > 0){
            console.log(user, chatbox.value)
socket.emit(`inputmensaje`, {user, message : chatbox.value} )
chatbox.value = ``
        }

    }
    
})

socket.on(`mensajeuser`, arraymsj =>{
    let mensajeuser = document.querySelector(`#mensajesswal`)
    let mensajes = ''
    arraymsj.forEach((mensaje) => {
      mensajes += `<li style="color: white;">${mensaje.user} Dice: ${mensaje.message}</li>`;
    });
    mensajeuser.innerHTML = mensajes;
})