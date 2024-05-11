


const socket = io();

const inputTitle = document.querySelector(`#Titleproduct`);
const inputPrice = document.querySelector(`#Priceproduct`);
const inputStock = document.querySelector(`#Stockproduct`);
const inputDescription = document.querySelector(`#Descriptionproduct`);
const inputThumbnail = document.querySelector(`#Thumbnailproduct`);
const inputCategory = document.querySelector(`#Categoryproduct`);

const enviardatos = document.querySelector(`#Enviar`);
const mensajesDiv = document.querySelector(`#mensajes`);

inputTitle.addEventListener(`keyup`, (evt) => {
  if (evt.key === `Enter`) {
    socket.emit(`title`, inputTitle.value);
    inputTitle.value = ``;
  }
});
inputDescription.addEventListener(`keyup`, (evt) => {
  if (evt.key === `Enter`) {
    socket.emit(`description`, inputDescription.value);
    inputDescription.value = ``;
  }
});
inputPrice.addEventListener(`keyup`, (evt) => {
  if (evt.key === `Enter`) {
    socket.emit(`message`, inputPrice.value);
    inputPrice.value = ``;
  }
});
inputCategory.addEventListener(`keyup`, (evt) => {
  if (evt.key === `Enter`) {
    socket.emit(`message`, inputCategory.value);
    inputCategory.value = ``;
  }
});
inputThumbnail.addEventListener(`keyup`, (evt) => {
  if (evt.key === `Enter`) {
    socket.emit(`message`, inputThumbnail.value);
    inputThumbnail.value = ``;
  }
});


enviardatos.addEventListener(`click`, () => {

    socket.emit(`enviardatos`, (inputDescription.value, inputTitle.value) )
    socket.on(`mensaje`, arraymsj =>{
        let mensajes = ''
        arraymsj.forEach((mensaje) => {
          mensajes += `<li style="color: white;">titulo:${mensaje.title} Producto: ${mensaje.description}</li>`;
        });
        mensajesDiv.innerHTML = mensajes;
    })
    
});

socket.on(`recibirmensaje`, (data) => {
  console.log(data);
});

socket.on('mensaje-cliente', (arraymsj) => {
  console.log(arraymsj);
  let mensajes = '';
  arraymsj.forEach((mensaje) => {
    mensajes += `<li>id:${mensaje.id} Producto: ${mensaje.message} ${mensaje.description}</li>`;
  });
  mensajesDiv.innerHTML = mensajes;
});
