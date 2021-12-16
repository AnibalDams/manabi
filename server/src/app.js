import express, { json,urlencoded } from "express";

import morgan from "morgan";
import cors from "cors";
import routes from "./Routes/index.routes";
import { cloudinaryConfig } from "./config/cloudinary";

const app = express();

// Middlewares

app.use(cors());
app.use(morgan("dev"));
app.use(urlencoded({ extended: false }));
app.use(json());
app.use("*", cloudinaryConfig);

//Routes

app.use(routes);

// Archivos estaticos
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/audios", express.static(__dirname + "/public/audios"));

export default app;
