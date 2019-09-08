const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>  {
    res.status(200).json({
        message:'Handling GET requests to /contacts'
    });
});

router.post('/', (req, res, next) =>  {
    const contact = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message:'Handling POST requests to /contacts',
        createdContact: contact
    });
});

router.get('/:contactId', (req, res, next) => {
    const id = req.params.contactId;
    if (id === 'special') {
        res.status(200).json({
            message:'Right ID',
            id: id 
        });
    } else {
            res.status(200).json({
                message: 'Wrong ID'
        });
    }
});

router.patch('/:contactId', (req, res, next) => {
    res.status(200).json ({
        message: 'Updated Contact!'
    });
});

router.delete('/:contactId', (req, res, next) => {
    res.status(200).json ({
        message: 'Deleted Contact!'
    });
});

module.exports = router;
