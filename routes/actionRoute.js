const express = require('express');
const actionsDB = require('../data/helpers/actionModel');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const actions = await actionsDB.get();
        res.status(200).json(actions);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the Projects',
            errorMessage: error.toString()
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const action = await actionsDB.get(req.params.id);
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({
                message: `The action with id ${req.params.id} does not exist`
            })
        }
    } catch (error) {

        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the Action',
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const action = await actionsDB.get(req.params.id);
        if (action) {
            const updateAction = await actionsDB.update(req.params.id, req.body);
            res.status(201).json(updateAction);
        } else {
            res.status(404).json({
                message: 'The action you want to update does not exist'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error updating the project',
            errorMessage: error.toString()
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const action = await actionsDB.get(req.params.id);
        if (action) {
            const deleteAction = await actionsDB.remove(action.id);
            res.status(200).json(deleteAction);
        } else {
            res.status(404).json({
                message: 'The Action you are trying to delete does not exist'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error deleting the Action',
            errorMessage: error.toString()
        });
    }
});

module.exports = router; 