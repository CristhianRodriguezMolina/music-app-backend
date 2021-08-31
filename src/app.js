// NPM Module imports
import express from "express"; //To use express framework
import morgan from "morgan"; //To print API requests
import helmet from "helmet"; //Helmet helps you secure your Express apps by setting various HTTP headers.
import cors from "cors"; //To allow different origins
import path from "path"; //To join paths

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { options } from './swaggerOptions';
const specs = swaggerJSDoc(options);

// API module imports
import songRoutes from "./routes/song.routes";

// App declaration
const app = express();

// SETTINGS

// Set the port
app.set("port", process.env.PORT || 4000);

//Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Relacionado con el bodyparser de express

/**
 * Routes
 *
 * Se configuran las rutas de la API
 */
app.use("/api/song", songRoutes); //Route to user administration

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs));

/**
 * express static
 * Se configura la carpeta de los archivos estaticos de la aplicacion
 */
app.use(express.static(path.join(__dirname, "../static"))); //route where all static files are stored

export default app