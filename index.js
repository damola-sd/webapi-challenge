const express = require('express');

const projectRoutes = require('./routes/projectRoute');
const actionRoutes = require('./routes/actionRoute');

const server = express();

require('dotenv').config();
const port = process.env.PORT;

server.use(express.json());
server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Sprint Challenge</h>
      <p>Projects and Actions</p>
    `);
});






server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
