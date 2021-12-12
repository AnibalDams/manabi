import express, { json } from "express";
import path from "path";
import uuid from 'uuid'
import multer from "multer";
import morgan from "morgan";
import cors from "cors";
import routes from "./Routes/index.routes";


const app = express();
const almacenamientoDeLasFotos = multer.diskStorage({
    destination:  function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/img'))
      },
    filename: (req, file, cb) => {
        const nombreDelArchivo = Date.now() +path.extname(file.originalname).toLowerCase()
        cb(null, nombreDelArchivo);
    },
});

// Middlewares

app.use(cors());
app.use(morgan("dev"));
app.use(
    multer({
        storage:almacenamientoDeLasFotos,
    }).single("image")
);
app.use(json());

//Routes

app.use(routes);

// Archivos estaticos
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/audios", express.static(__dirname + "/public/audios"));

export default app;
