var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
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
           "View all employees in a specific department",
           "View all employees in a specific role",
           "View all employees under a certain manager",
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

       if (answer.start === "View all employees in a specific department") {
            viewAllEmployeesByDept();
       };

       if (answer.start === "View all employees in a specific role") {
            viewAllEmployeesByRole();
       };

       if (answer.start === "View all employees under a certain manager") {
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

// ------- BASIC VIEW QUERIES -------

// All employees
function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(["--- All Employees ----"], res);
    })
    startInquirer();
};

// Employees by department -ADD FUNCTION INTO CHOICES TO DISPLAY UP TO DATE LIST
function viewAllEmployeesByDept() {
    inquirer.prompt({
        name: "viewDepartment",
        type: "list",
        message: "What department would you like to view?",
        choices: [
            "Sales",
            "Accounting",
            "Shipping"
        ]
    }).then(function(answer) {
        var department = answer.viewDepartment;
        var query = "SELECT e.first_name, e.last_name FROM employee e, department d, role r WHERE (d.id = r.department_id AND r.id = e.role_id) AND d.name =?";
        connection.query(query, [department], function(err, res) {
            if (err) throw err;
            console.table(["--- All Employees in " + department + " ---"], res);
        });
        startInquirer();      
    })  
};

// Employees by role - ADD FUNCTION INTO CHOICES TO SHOW UP TO DATE ROLES
function viewAllEmployeesByRole() {
    inquirer.prompt({
        name: "viewRole",
        type: "list",
        message: "What role would you like to view?",
        choices: [
            "Manager",
            "Salesperson",
            "Junior Salesperson",
            "Accountant",
            "Lead Accountant",
            "Warehouse Manager",
            "Warehouse Staff"
        ]
    }).then(function(answer) {
        var role = answer.viewRole;
        var query = "SELECT employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON (employee.role_id = role.id) WHERE (role.title = ?)";
        connection.query(query, [role], function(err, res) {
            if (err) throw err;
            console.table(["--- All " + role + "s ---"], res);
    })  
    startInquirer();
});

}

// View by manager - BONUS
function viewAllEmployeesByManager() {
    console.log("View all employees by manager chosen");
    startInquirer();
};

// ------- ADD NEW ITEM -------

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

// ------- UPDATE ITEM --------

function updateEmployeeRole() {
    console.log("Update Employee Role chosen");
    startInquirer();
};

function updateEmployeeManager() {
    console.log("Update Employee Manager chosen");
    startInquirer();
};

// ------- DELETING ITEM -------

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

// -------- VIEWING SALARIES --------

function viewTotalSalaries() {
    console.log("View total salaries chosen");
    startInquirer();
};

function viewDepartmentSalaries() {
    console.log("View department salaries chosen");
    startInquirer();
};
