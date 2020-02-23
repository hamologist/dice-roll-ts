import express from "express";
import { rollRouter } from "./controllers/roll";

const app = express();
const port: number = Number(process.env.PORT) || 3000;
const hostname: string = process.env.HOSTNAME || 'localhost';

app.use('/roll', rollRouter);

app.listen(port, hostname, () => console.log(`Dice Roll listening on port ${port}!`));