const express = require('express');
const projectDB = require('../data/helpers/projectModel');
const actionsDB = require('../data/helpers/actionModel');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await projectDB.get();
        res.status(200).json(projects);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the Projects',
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await projectDB.get(req.params.id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({
                message: `The project with id ${req.params.id} does not exist`
            })
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the Projects',
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const project = await projectDB.insert(req.body);
        res.status(200).json(project);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the Projects',
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const project = await projectDB.get(req.params.id);
        if (project) {
            const updateProject = await projectDB.update(project.id, req.body);
            res.status(201).json(updateProject);
        } else {
            res.status(404).json({
                message: 'The project you want to update does not exist'
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
        const project = await projectDB.get(req.params.id);
        if (project) {
            const deleteProject = await projectDB.remove(project.id);
            res.status(200).json(deleteProject);
        } else {
            res.status(404).json({
                message: 'The Project you are trying to delete does not exist'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error deleting the Projects',
            errorMessage: error.toString()
        });
    }
});

router.get('/:id/actions', async (req, res) => {
    try {
        const project = await projectDB.get(req.params.id);
        if (project) {
            const actions = await projectDB.getProjectActions(project.id)
            res.status(200).json(actions);
        }else {
            res.status(404).json({
                message: 'You cannot get actions from a project that does not exist'
            })
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: 'Error adding a new Action',
        });
    }
});


router.post('/:id/actions', async (req, res) => {
    const { id } = req.params;
    const { description, notes } = req.body;
    try {
        const project = await projectDB.get(req.params.id);
        if (project) {
            const addAction = await actionsDB.insert({project_id: id, description, notes })
            res.status(200).json(addAction);
        }else {
            res.status(404).json({
                message: 'You cannot add actions to a project that does not exist'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error adding a new Action',
        });
    }
});

module.exports = router; 