const express = require('express');
const actionsDB = require('./data/helpers/actionModel');
const projectDB = require('./data/helpers/projectModel');

const server = express();

require('dotenv').config();
const port = process.env.PORT;

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Sprint Challenge</h>
      <p>Projects and Actions</p>
    `);
  });

  server.get('/api/projects', async (req, res) => {
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

  server.get('/api/projects/:id', async (req, res) => {
    try {
      const project = await projectDB.get(req.params.id);
      if (project) {
          res.status(200).json(project);
      }else {
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

  server.post('/api/projects', async (req, res) => {
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

  server.put('/api/projects/:id', async (req, res) => {
    try {
      const project = await projectDB.get(req.params.id);
      if(project) {
          const updateProject = await projectDB.update( project.id, req.body);
          res.status(201).json(updateProject);
      }else {
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

  server.delete('/api/projects/:id', async (req, res) => {
    try {
      const project = await projectDB.get(req.params.id);
      if (project) {
          const deleteProject = await projectDB.remove(project.id);
          res.status(200).json(deleteProject);
      }else {
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

  

  server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
  });
  