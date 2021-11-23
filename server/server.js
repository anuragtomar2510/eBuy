require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/db');
const PORT = process.env.PORT;



const app = express();
app.use(cors());


// middleware for form-data and json data
app.use(express.urlencoded({ extended : false}));
app.use(express.json());



// database connection
dbConnection();



// require routes and use as middleware
app.use('/api/auth', require(`./routes/auth`));
app.use('/api/users', require(`./routes/user`));
app.use('/api/products', require(`./routes/product`));
app.use('/api/cart', require(`./routes/cart`));
app.use('/api/orders', require(`./routes/order`));
app.use('/api/checkout', require(`./routes/checkout`))



// listen to requests
app.listen(PORT, () => console.log(`Server started and tuned at port ${PORT}`));















