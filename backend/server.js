const express = require('express');
const { connectToDatabase } = require('./db/mongodb')
const { PORT } = require('./constants/constant')
const cors = require('cors')

const taskRoutes = require('./routes/taskRoutes')

const app = express();

connectToDatabase();

// express middlewares
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api', taskRoutes);

// starting my server
app.listen(PORT, () => console.log("Server Connected on Port Number " + PORT))