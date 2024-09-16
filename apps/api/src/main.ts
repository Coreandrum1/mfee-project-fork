import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { corsOptions } from './config/corsConfig';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json()); // middleware to parse json
app.use(helmet()); // middleware to secure the app / remove x-powered-by
app.use(cors(corsOptions)); // middleware to enable cors

app.get('/', (req, res) => {
  res.send({ message: 'Hello MFEE! 22' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
