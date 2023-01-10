const Joi = require('joi');
const employeeModel = require('../Models/employeeModel');
const officeService = require('./officeServices');

const employeeSchema = Joi.object({
  firstName: Joi.string().min(2).max(45).required(),
  lastName: Joi.string().min(2).max(45).required(),
  office: Joi.number().required(),
});

const employeeArraySchema = Joi.array().items(employeeSchema);

const create = async ({ firstName, lastName, office }) => {
  const { error } = employeeSchema.validate({ firstName, lastName, office });
  if (error) {
    throw { status: 400, message: error.message };
  }

  const id = await employeeModel.create({ firstName, lastName, office });
  return { id, firstName, lastName, office };
};

const validateEmployeesBody = (employees) => {
  const { error } = employeeArraySchema.validate(employees);
  if (error) throw { status: 400, message: error.message };
}

const createManyEmployees = async (employees) => {
  validateEmployeesBody(employees);
  await officeService.validateOfficeExists(employees);
  
  const employeesPromises = employees.map((employee) => employeeModel.create(employee));
  const employeesIds = await Promise.all(employeesPromises);

  const newEmployees = employees.map((employee, index) => ({ id: employeesIds[index], ...employee }));

  return newEmployees.sort((a, b) => a.id - b.id);
}

const getAll = async () => {
  const employees = await employeeModel.getAll();
  return employees;
}

const getById = async (id) => {
  const employee = await employeeModel.getById(id);
  if (!employee) throw { status: 404, message: 'Employee not found' };
  return employee;
}

module.exports = {
  create,
  getAll,
  getById,
  createManyEmployees,
};