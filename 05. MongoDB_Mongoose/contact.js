  
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Contact = require('../models/contacts');

router.get('/', (req, res, next) =>  {
    Contact.find()
        .exec()
        .then(docs => {
            console.log(docs);
//            if (docs.length >= 0) {
            res.status(200).json(docs);
//            } else {
//               res.status(404).json(docs);
//                    message: 'No Entry Found!'
//            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

router.post('/', (req, res, next) =>  {
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    contact
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:'Handling POST requests to /contacts',
                createdContact: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Code for FETCHING data (GET) 
router.get('/:contactId', (req, res, next) => {
    const id = req.params.contactId;
    Contact.findById(id)
        .exec()
        .then(doc => {
            console.log("From DataBase", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: "No Valid Entry Found!"})
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
    });
});

router.patch('/:contactId', (req, res, next) => {
    const id = req.params.contactId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps [ops.propName] = ops.value;
    }
    
    Contact.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

router.delete('/:contactId', (req, res, next) => {
    const id = req.params.contactId;
    Contact.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

});

module.exports = router;
