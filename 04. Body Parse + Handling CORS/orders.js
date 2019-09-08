const express = require('express');
const router = express.Router();

//Handling GET requests to /orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched!'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        contactId: req.body.contactId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Orders were created!',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Orders detais!',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Orders deleted!',
        orderId: req.params.orderId
    });
});

module.exports = router;
