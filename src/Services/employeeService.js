const Joi = require('joi');
const employeeModel = require('../Models/employeeModel');
const officeService = require('./officeServices');

const create = async ({ firstName, lastName, office }) => {
  const { error } = employeeSchema.validate({ firstName, lastName, office });
  if (error) {
    throw { status: 400, message: error.message };
  }
  
  const id = await employeeModel.create({ firstName, lastName, office });
  return { id, firstName, lastName, office };
};


const getById = async (id) => {
  const employee = await employeeModel.getById(id);
  if (!employee) throw { status: 404, message: 'Employee not found' };
  return employee;
}

const getAll = async () => {
  const employees = await employeeModel.getAll();
  return employees;
}


const employeeSchema = Joi.object({
  firstName: Joi.string().min(2).max(45).required().label('firstName'),
  lastName: Joi.string().min(2).max(45).required().label('lastName'),
  office: Joi.number().required().label('office'),
}).messages({
  'string.empty': '{{#label}} cannot be empty',
  'string.min': '{{#label}} must be at least {{#limit}} characters',
  'string.max': '{{#label}} must be at least {{#limit}} characters',
  'any.required': '{{#label}} is required',
});

const validateEmployeesBody = (employees) => {
  const employeeArraySchema = Joi.array().items(employeeSchema);
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

module.exports = {
  create,
  getAll,
  getById,
  createManyEmployees,
};