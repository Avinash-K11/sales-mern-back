import express from 'express';
import cors from 'cors';
import compression from 'compression';

import connectToDb from './db/db.js';
import api from './routes/api/index.js';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(compression());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//cors handling
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
};

app.use(cors(corsOpts));

// Handle GET requests to / route
app.use("*", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.use('/api', api);

Promise.all([connectToDb()])
    .then( () => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch((error) => {
        console.error(`MongoDB Atlas error: ${error}`);
        process.exit();
});