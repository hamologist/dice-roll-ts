import express from "express";
import { rollRouter } from "./controllers/roll";

const app = express();
const port = 3000;

app.use('/roll', rollRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));