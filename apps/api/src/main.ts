import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { corsOptions } from './config/corsConfig';
import { verifyToken } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import auth from './routes/auth';
import categories from './routes/categories';
import posts from './routes/posts';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' }); // Load environment variables from .env.local file so that we don't have them in the repo

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json()); // middleware to parse json
app.use(helmet()); // middleware to secure the app / remove x-powered-by
app.use(cors(corsOptions)); // middleware to enable cors

app.use('/api/auth', auth);

app.use(verifyToken);
app.use('/api/categories', categories); // EXAMPLE
app.use('/api/posts', posts);

// catch all non-existing routes
app.use((req, res) => {
  res.status(404).json({ message: 'route not found' });
});

app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
