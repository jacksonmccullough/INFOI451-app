const fs = require("fs");
const path = require("path");

let employees = [];
let departments = [];

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, "data", "employees.json"), "utf8", (err, data) => {
      if (err) {
        reject("unable to read employees file");
        return;
      }

      try {
        employees = JSON.parse(data);
      } catch (parseErr) {
        reject("unable to parse employees file");
        return;
      }


      fs.readFile(path.join(__dirname, "data", "departments.json"), "utf8", (err, data) => {
        if (err) {
          reject("unable to read departments file");
          return;
        }

        try {
          departments = JSON.parse(data);
        } catch (parseErr) {
          reject("unable to parse departments file");
          return;
        }

        resolve();
      });
    });
  });
}

function getAllEmployees() {
  return new Promise((resolve, reject) => {
    if (employees.length === 0) {
      reject("no results returned");
    } else {
      resolve(employees);
    }
  });
}

function getManagers() {
  return new Promise((resolve, reject) => {
    const managers = employees.filter((emp) => emp.isManager === true);
    if (managers.length === 0) {
      reject("no results returned");
    } else {
      resolve(managers);
    }
  });
}

function getDepartments() {
  return new Promise((resolve, reject) => {
    if (departments.length === 0) {
      reject("no results returned");
    } else {
      resolve(departments);
    }
  });
}

module.exports = {
  initialize,
  getAllEmployees,
  getManagers,
  getDepartments,
};
