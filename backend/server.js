import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/api.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api', routes);
// app.use('/' , (req, res) => {
//     res.send('Hello World');
// });
// app.use('/:id' , (req, res) => {
//     res.send('Hello World');
// });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});