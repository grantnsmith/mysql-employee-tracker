var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Graysa21!",
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  startInquirer();
});

function startInquirer() {
    inquirer.prompt({
       name: "start",
       type: "list",
       message: "What would you like to do?",
       choices: [
           "View all employees",
           "View all employees by department",
           "View all employees by role",
           "View all employees by manager",
           new inquirer.Separator(),
           "Add new employee",
           "Add new department",
           "Add new role",
           new inquirer.Separator(),
           "Update an employees role",
           "Update an employees manager",
           new inquirer.Separator(),
           "Delete a department",
           "Delete a role",
           "Delete an employee",
           new inquirer.Separator(),
           "View total of all employee salaries",
           "View total of a departments salaries",
           new inquirer.Separator(),
       ]
    })
    .then(function(answer) {
       if (answer.start === "View all employees") {
           viewAllEmployees();
       };

       if (answer.start === "View all employees by department") {
            viewAllEmployeesByDept();
       };

       if (answer.start === "View all employees by role") {
            viewAllEmployeesByRole();
       };

       if (answer.start === "View all employees by manager") {
            viewAllEmployeesByManager();
       };

       if (answer.start === "Add new employee") {
            addNewEmployee();
       };

       if (answer.start === "Add new department") {
            addNewDepartment();
       };

       if (answer.start === "Add new role") {
            addNewRole();
       };

       if (answer.start === "Update an employees role") {
            updateEmployeeRole();
       };

       if (answer.start === "Update an employees manager") {
            updateEmployeeManager();
       };

       if (answer.start === "Delete a department") {
            deleteDepartment();
       };

       if (answer.start === "Delete a role") {
            deleteRole();
       };

       if (answer.start === "Delete an employee") {
            deleteEmployee();
       };

       if (answer.start === "View total of all employee salaries") {
            viewTotalSalaries();
       };

       if (answer.start === "View total of a departments salaries") {
            viewDepartmentSalaries();
       };
    })
};




function viewAllEmployees() {
    console.log("View all employees chosen");
    startInquirer();
};

function viewAllEmployeesByDept() {
    console.log("View all employees by department chosen");
    startInquirer();
};

function viewAllEmployeesByRole() {
    console.log("View all employees by role chosen");
    startInquirer();
};

function viewAllEmployeesByManager() {
    console.log("View all employees by manager chosen");
    startInquirer();
};

function addNewEmployee() {
    console.log("Add new employee chosen");
    startInquirer();
};

function addNewDepartment() {
    console.log("Add new department chosen");
    startInquirer();
};

function addNewRole() {
    console.log("Add new role chosen");
    startInquirer();
};

function updateEmployeeRole() {
    console.log("Update Employee Role chosen");
    startInquirer();
};

function updateEmployeeManager() {
    console.log("Update Employee Manager chosen");
    startInquirer();
};

function deleteDepartment() {
    console.log("Delete department chosen");
    startInquirer();
};

function deleteRole() {
    console.log("Delete role chosen");
    startInquirer();
};

function deleteEmployee() {
    console.log("Delete Employee chosen");
    startInquirer();
};

function viewTotalSalaries() {
    console.log("View total salaries chosen");
    startInquirer();
};

function viewDepartmentSalaries() {
    console.log("View department salaries chosen");
    startInquirer();
};
