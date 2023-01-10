const express = require('express');

const app = express();
const employeeController = require('./Controllers/employeeController');

app.use(express.json());

app.post('/employee', employeeController.create);
app.post('/employees', employeeController.createManyEmployees);
app.get('/employee', employeeController.getAll);
app.get('/employee/:id', employeeController.getById);

app.use((error, req, res, _next) => {
  if (error.status) return res.status(error.status).json({ message: error.message });
  return res.status(500).json({ message: error.message });
});

app.listen(3000, () => console.log('App running on Port: 3000'));