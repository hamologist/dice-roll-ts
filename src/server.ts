import express from "express";
import { rollRouter } from "./controllers/roll";

const app = express();
const port = process.env.PORT || 3000;

app.use('/roll', rollRouter);

app.listen(port, () => console.log(`Dice Roll listening on port ${port}!`));