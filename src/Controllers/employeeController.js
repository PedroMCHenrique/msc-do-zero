const employeeService = require('../Services/employeeService');

const create = async (req, res, next) => {
  try {
    const { firstName, lastName, office } = req.body;
    const newEmployee = await employeeService.create({ firstName, lastName, office });
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
};

const createManyEmployees = async (req, res, next) => {
  try {
    const employees = req.body;
    const newTeam = await employeeService.createManyEmployees(employees);
    res.status(201).json(newTeam);
  } catch (error) {
    next(error);
  }
}

const getAll = async (_req, res) => {
  const employees = await employeeService.getAll();
  res.status(200).json(employees);
}

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
  const employee = await employeeService.getById(id);
  res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  createManyEmployees,
}