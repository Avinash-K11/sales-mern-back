import express from 'express';
import cors from 'cors';
import compression from 'compression';

import connectToDb from './db/db.js';
import api from './routes/api/index.js';

const PORT = process.env.PORT || 3000;
const app = express();

//cors handling
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handle GET requests to / route
app.get('/', (req, res) => {
  res.send('<h1>Home page</h1>');
});

app.use('/api', api);

// handleing not implemented routes
app.all("*", (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});

Promise.all([connectToDb()])
    .then( () => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch((error) => {
        console.error(`MongoDB Atlas error: ${error}`);
        process.exit();
});