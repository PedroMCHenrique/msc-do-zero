require('dotenv').config();
const express = require('express');
const employeeController = require('./Controllers/employeeController');

const app = express();

const PORT = process.env.APP_PORT;

app.use(express.json());

app.post('/employees', employeeController.createManyEmployees);
app.post('/employee', employeeController.create);
app.get('/employee', employeeController.getAll);
app.get('/employee/:id', employeeController.getById);

app.use((error, req, res, _next) => {
  if (error.status) return res.status(error.status).json({ message: error.message });
  return res.status(500).json({ message: error.message });
});

app.listen(PORT, () => console.log(`App running on Port: ${PORT}`));