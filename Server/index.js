const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const app = express();

app.use(express.json({ limit: 52428800 }));
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true,
}));
  
const port=process.env.PORT
app.listen(port, () => {
    console.log("Server started at port" + port);
})