const handlebars = require(`express-handlebars`);
const express = require(`express`);
const { Server } = require(`socket.io`);
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo');
const passport = require('passport');
const { addLogger, logger } = require('./utils/logger.js');
const { connectDb } = require('./config/config.js');
const cors = require('cors');
const appRouter = require('./routes/general.router.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');
const { initializePassport } = require('./config/passport.config.js');
const { model } = require('mongoose');
const handlebarsHelpers = require('handlebars-helpers')();
const eq = handlebarsHelpers.eq;

const app = express();
const port = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(session({
  store: mongoStore.create({
    mongoUrl: process.env.MONGO_URI, 
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    ttl: 15000000000,
  }),
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

initializePassport();
app.use(passport.initialize());
app.use(appRouter);

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Ecommerce Documentation',
      description: 'Api Doc for Ecommerce',
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

connectDb();

app.use(addLogger);

app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      eq: eq,
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.engine(`hbs`, handlebars.engine());

app.get(`/single`, (req, res) => {
  res.send('archivo subido');
});
app.get('/usuario', (req, res) => {
  res.json({ nombre: 'Julian', edad: 85, apellido: 'Alvarez', correo: 'Julianalv@gmail.com' });
});

const serverHttp = app.listen(port, () => {
  logger.info(`Server is running on port http://localhost:${port}`);
});

const socketserver = new Server(serverHttp);
socketserver.on(`connection`, (socket) => {
  console.log('nuevo cliente conectado');

  let arraymsj = [];

  socket.emit(`recibirmensaje`, arraymsj);

  socket.on(`title`, (title) => {
    console.log(title);
    arraymsj.push({ id: socket.id, message: title });
    socketserver.emit('mensaje-cliente', arraymsj);
  });
  socket.on(`description`, (description) => {
    console.log(description);
    arraymsj.push({ description: description });
    socketserver.emit('mensaje-cliente', arraymsj);
  });
  socket.on(`enviardatos`, (title, description) => {
    arraymsj.push({ title: title, description: description });
    socketserver.emit('mensaje', arraymsj);
  });

  socket.on(`inputmensaje`, (data) => {
    arraymsj.push(data);
    socketserver.emit(`mensajeuser`, arraymsj);
  });
});

module.exports = app