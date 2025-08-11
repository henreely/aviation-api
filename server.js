//const http = require('http');

//const server = http.createServer((req, res) => {
  //  res.end("Hello world!");
//});

//server.listen(4000, () => {
   // console.log('Server is running on http://localhost:4000')
//});

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const passengerRoutes = require('./routes/passenger.routes');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
.then(() => console.log("Db connected successfully..."))
.catch((err) => console.log("could not connect to the database successfully...",err));

// Middleware json
app.use(express.json());

// Endpoints
app.use('/api/auth', userRoutes);
app.use('/api/bookings', passengerRoutes);

// Port number
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));