import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';

import {join, dirname } from 'path';
import { fileURLToPath } from 'url';

import connectToDb from './db/db.js';
import api from './routes/api/index.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

// enabling CORS for some specific origins only.
let corsOptions = {
  origin : [
    'http://localhost:3000',
    'https://sales-mern.onrender.com'
  ],
}

//cors handling
app.use(cors(corsOptions));

app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, 'public')));

app.use('/api', cors(corsOptions), api);

app.all("*", (req, res) => {
  res.status(404).send('404! Page not found');
});

Promise.all([connectToDb()])
    .then( () => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch((error) => {
        console.error(`MongoDB Atlas error: ${error}`);
        process.exit();
});