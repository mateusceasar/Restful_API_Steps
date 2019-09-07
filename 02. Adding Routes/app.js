const express = require('express');
const app = express();

const contactRoutes = require('./api/routes/contacts');
const orderRoutes = require('./api/routes/orders');

app.use('/contacts', contactRoutes);
app.use('/orders', orderRoutes);

module.exports = app;
