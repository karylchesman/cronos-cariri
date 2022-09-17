import '../infra/envconfig';
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import https from 'https';
import { routes } from './routes';
import "../infra/typeORM/connection";

let whiteList: any[];

if (process.env.ENVIROMENT === "development") {
    whiteList = ["http://localhost:3000", undefined]
} else {
    whiteList = ["https://cronoscariri.com.br"]
}

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    exposedHeaders: ["x-new-token"]
}));

app.use(express.json());
app.use(routes);

app.disable('x-powered-by');

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

    console.log(err)
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

if (process.env.ENVIROMENT === "development") {
    app.listen(process.env.HTTP_PORT, () => {
        console.log(`Server is running on port: ${process.env.HTTP_PORT} | Enviroment: ${process.env.ENVIROMENT}`);
    })
} else {

    const httpsOptions = {
        key: fs.readFileSync(path.join("C:", "xampp", "apache", "Certificados", "sis-sia", "private.key")),
        cert: fs.readFileSync(path.join("C:", "xampp", "apache", "Certificados", "sis-sia", "cert.pem"))
    };

    https.createServer(httpsOptions, app).listen(process.env.HTTP_PORT, () => {
        console.log(`Server is running on port: ${process.env.HTTP_PORT} | Enviroment: ${process.env.ENVIROMENT}`);
    })
}


