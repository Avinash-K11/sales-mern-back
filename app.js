import express from 'express';
import cors from 'cors';
import compression from 'compression';

import connectToDb from './db/db.js';
import api from './routes/api/index.js';

const PORT = process.env.PORT || 4000;
const app = express();

// enabling CORS for some specific origins only.
let corsOptions = {
  origin : ['http://localhost:3000'],
}

//cors handling
app.use(cors(corsOptions));

app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handle GET requests to / route
app.get('/', (req, res) => {
  res.send('Home page');
});

app.use('/api', cors(corsOptions), api);

// handleing not implemented routes
app.all("*", (req, res) => {
  res.status(404).send('404! Page not found');
});

Promise.all([connectToDb()])
    .then( () => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch((error) => {
        console.error(`MongoDB Atlas error: ${error}`);
        process.exit();
});