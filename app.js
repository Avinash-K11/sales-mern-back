import express from 'express';
// import cors from 'cors';
import compression from 'compression';
import { fileURLToPath } from 'url';
import path, { join, dirname } from 'path';

import connectToDb from './db/db.js';
import api from './routes/api/index.js';

const PORT = process.env.PORT || 3000;
const app = express();
const __filename = dirname(fileURLToPath(import.meta.url));
const __dirname = path.dirname(__filename);

app.use(compression());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/api', api);

Promise.all([connectToDb()])
    .then( () => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch((error) => {
        console.error(`MongoDB Atlas error: ${error}`);
        process.exit();
});