const express = require('express');
const actionsDB = require('./data/helpers/actionModel');
const projectRoutes = require('./routes/projectRoute');

const server = express();

require('dotenv').config();
const port = process.env.PORT;

server.use(express.json());
server.use('/api/projects', projectRoutes);

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Sprint Challenge</h>
      <p>Projects and Actions</p>
    `);
});



server.get('/api/actions', async (req, res) => {
    try {
        const actions = await actionsDB.get();
        res.status(200).json(actions);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the Projects',
            errorMessage: error.toString()
        });
    }
});

server.get('/api/actions/:id', async (req, res) => {
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
        // log error to database
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the Action',
        });
    }
});

server.get('/api/projects/:id/actions', async (req, res) => {
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


server.post('/api/projects/:id/actions', async (req, res) => {
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
        // log error to database
        console.log(error);
        res.status(500).json({
            message: 'Error adding a new Action',
        });
    }
});


server.put('/api/actions/:id', async (req, res) => {
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

server.delete('/api/actions/:id', async (req, res) => {
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

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
