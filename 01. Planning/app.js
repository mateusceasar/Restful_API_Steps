const express = require('express');
const app = express();

const contactsRoutes = require('./api/routes/contacts');

app.use((req, res, next) => {
    res.status(200).json({
        message: 'funcionando..'
    });
});

module.exports = app;
