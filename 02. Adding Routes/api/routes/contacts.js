const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>  {
    res.status(200).json({
        message:'Handling GET requests to /contacts'
    });
});

router.post('/', (req, res, next) =>  {
    res.status(201).json({
        message:'Handling POST requests to /contacts'
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

router.patch('/:productId', (req, res, next) => {
    res.status(200).json ({
        message: 'Updated Product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json ({
        message: 'Deleted Product!'
    });
});

module.exports = router;
