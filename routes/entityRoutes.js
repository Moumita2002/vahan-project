const express = require('express');
const mongoose = require('mongoose');
const Entity = require('../models/entityModel');
const { formatDate, formatDateToUTC } = require('../utils/dateUtils');

const router = express.Router();

// Middleware to ensure the dynamic model is registered
const ensureModelExists = async (req, res, next) => {
    const { entityName } = req.params;
    if (!mongoose.models[entityName]) {
        const entity = await Entity.findOne({ name: entityName });
        if (entity) {
            const schemaDefinition = entity.fields.reduce((acc, field) => {
                acc[field.fieldName] = mongoose.Schema.Types[field.fieldType] || String;
                return acc;
            }, {});

            const schema = new mongoose.Schema(schemaDefinition, {
                toJSON: { 
                    transform: (doc, ret) => {
                        for (let key in ret) {
                            if (ret[key] instanceof Date) {
                                ret[key] = formatDate(ret[key]);
                            }
                        }
                        return ret;
                    }
                }
            });

            mongoose.model(entityName, schema);
        } else {
            return res.status(404).send({ message: `Entity ${entityName} not found` });
        }
    }
    next();
};

router.post('/create-entity', async (req, res) => {
    const { name, fields } = req.body;
    const entity = new Entity({ name, fields });
    await entity.save();

    const schemaDefinition = fields.reduce((acc, field) => {
        acc[field.fieldName] = mongoose.Schema.Types[field.fieldType] || String;
        return acc;
    }, {});

    const schema = new mongoose.Schema(schemaDefinition, {
        toJSON: { 
            transform: (doc, ret) => {
                for (let key in ret) {
                    if (ret[key] instanceof Date) {
                        ret[key] = formatDate(ret[key]);
                    }
                }
                return ret;
            }
        }
    });

    mongoose.model(name, schema);

    res.status(201).send(entity);
});

router.get('/entities', async (req, res) => {
    const entities = await Entity.find();
    res.status(200).send(entities);
});

router.post('/:entityName', ensureModelExists, async (req, res) => {
    const { entityName } = req.params;
    const EntityModel = mongoose.model(entityName);
    const requestData = req.body;

    // Convert date fields to UTC
    for (let field in requestData) {
        if (requestData[field] instanceof Date) {
            requestData[field] = formatDateToUTC(requestData[field]);
        }
    }

    const newRecord = new EntityModel(requestData);
    await newRecord.save();
    res.status(201).send(newRecord);
});

router.get('/:entityName', ensureModelExists, async (req, res) => {
    const { entityName } = req.params;
    const EntityModel = mongoose.model(entityName);
    const records = await EntityModel.find();
    res.status(200).send(records);
});

router.put('/:entityName/:id', ensureModelExists, async (req, res) => {
    const { entityName, id } = req.params;
    const EntityModel = mongoose.model(entityName);
    const requestData = req.body;

    // Convert date fields to UTC
    for (let field in requestData) {
        if (requestData[field] instanceof Date) {
            requestData[field] = formatDateToUTC(requestData[field]);
        }
    }

    const updatedRecord = await EntityModel.findByIdAndUpdate(id, requestData, { new: true });
    res.status(200).send(updatedRecord);
});

router.delete('/:entityName/:id', ensureModelExists, async (req, res) => {
    const { entityName, id } = req.params;
    const EntityModel = mongoose.model(entityName);
    await EntityModel.findByIdAndDelete(id);
    res.status(204).send();
});

module.exports = router;
