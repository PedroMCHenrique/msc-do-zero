const officeModel = require('../Models/officeModel');

const checkOfficeExists = async (id) => {
  const officeFind = await officeModel.getById(id);
  if (!officeFind) return false;
  return true;
};

const validateOfficeExists = async (employees) => {
  const officesPromises = employees.map((employee) => checkOfficeExists(employee.office));
  const officesIds = await Promise.all(officesPromises);
  const notFoundOffice = officesIds.some((bool) => !bool);
  if (notFoundOffice) throw { status: 400, message: '"office" must be valid' };
}

module.exports = {
  checkOfficeExists,
  validateOfficeExists,
};