require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

const productRoutes = require('./routes/productRoute');
const cartRoutes = require('./routes/cartRoute');
const orderRoutes = require('./routes/orderRoute');

const cors = require('cors');

<<<<<<< HEAD
app.use(cors());
app.use(express.urlencoded({ extended: true }));
=======
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');


>>>>>>> 38a1e0d8ffd24f823ed55e6367bca715e9a5ba80

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'coffee_shop' })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use(cors());
app.use(express.json());
app.use('/product', productRoutes);
<<<<<<< HEAD
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

=======
app.use('/api/orders', orderRoute);
app.use("/api/user", userRoute);
>>>>>>> 38a1e0d8ffd24f823ed55e6367bca715e9a5ba80
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
})