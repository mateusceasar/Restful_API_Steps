const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Contact = require('../models/contacts');

router.get('/', (req, res, next) =>  {
    Contact.find()
        .select('_id name price')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                contacts: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/contacts/' + doc._id
                        }
                    }
                })
            };

//            if (docs.length >= 0) {
            res.status(200).json(response);
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
                message:'Contato criado com sucesso!',
                createdContact: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/contacts/' + result._id
                    }
                }
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
        .select('_id name price')
        .exec()
        .then(doc => {
            console.log("From DataBase", doc);
            if (doc) {
                res.status(200).json({
                    contact: doc,
                    request: {
                        type: 'GET',
                        description: 'Get all contacts',
                        url: 'http://localhost:3000/contacts/'
                    }
                });
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
            res.status(200).json({
                    message: 'Contato Atualizado!',
                    request: {
                        type: 'GET',
                        description: 'Get all contacts',
                        url: 'http://localhost:3000/contacts' + id
                    }
            });
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
            res.status(200).json({
                message: 'Contato Excluído com Sucesso!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/contacts', 
                    body: { name: 'String', price: 'Number' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

});

module.exports = router;
