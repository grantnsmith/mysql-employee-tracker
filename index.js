var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
require("dotenv").config();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "employees_db",
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) throw err;
  startInquirer();
});

// INQUIRER RESPONSE VALIDATION

// Requiring response for inquirer prompts
const emptyResponseValidation = value => {
    if (/\w/.test(value)) {
        return true;
    } else {
    return "Input required";
    }
};

// Checking if manager choice is valid ------------------------ NOT WORKING YET
const checkManagerValidation = value => {
    var nameArr = value.split(" ");
    firstName = nameArr[0];
    lastName = nameArr[1];
    connection.query("SELECT EXISTS (SELECT first_name, last_name FROM employee WHERE first_name = ? AND last_name = ?) AS result;", [firstName, lastName], function(err, res) {
        if (err) throw err; 

        console.log(res[0].result);
        
        if (res[0].result == 1) {
            return true;
        } else {
            return "That is not a valid Manager choice."
        } 
    })
};

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
        console.table(["-------- All Employees ---------"], res);
        startInquirer();
    })
};


// Employees by department 
function viewAllEmployeesByDept() {
    connection.query("SELECT name FROM department", function(err, res) {
    if (err) throw err;

    inquirer.prompt({
        name: "viewDepartment",
        type: "list",
        choices: function() {
            var departmentsArr = [];
                for (i=0; i<res.length; i++) {
                    departmentsArr.push(res[i].name)
                }  
                return departmentsArr;
            },

        message: "What department would you like to view?",
           
    }).then(function(answer) {
        var department = answer.viewDepartment;
        var query = "SELECT e.first_name, e.last_name FROM employee e, department d, role r WHERE (d.id = r.department_id AND r.id = e.role_id) AND d.name =?";
        connection.query(query, [department], function(err, res) {
            if (err) throw err;
            console.table(["-------- All Employees in " + department + " --------"], res);
            startInquirer(); 
        });     
    });  
    
  });
}


// Employees by role - 
function viewAllEmployeesByRole() {
    connection.query("SELECT title FROM role", function(err, res) {
        if (err) throw err;

    inquirer.prompt({
        name: "viewRole",
        type: "list",
        choices: function() {
            var rolesArr = [];
                for (i=0; i<res.length; i++) {
                    rolesArr.push(res[i].title)
                }  
                return rolesArr;
            },

        message: "What role would you like to view?",
            
    }).then(function(answer) {
        var role = answer.viewRole;
        var query = "SELECT employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON (employee.role_id = role.id) WHERE (role.title = ?)";
        connection.query(query, [role], function(err, res) {
            if (err) throw err;
            console.table(["-------- All " + role + " --------"], res);
            startInquirer();
        })  
    });
  });
}

// View by manager - BONUS
function viewAllEmployeesByManager() {
    console.log("View all employees by manager chosen");
    startInquirer();
};

// ------- ADD NEW ITEMS -------

// Add new employee
function addNewEmployee() {
    connection.query("SELECT department.name, role.title FROM department INNER JOIN role ON (department.id = role.department_id);", function(err, res) {
    if (err) throw err;
        
    inquirer.prompt([
        {
            name: "firstName",
            type:"input",
            message: "What is the new employees first name?",
            validate: emptyResponseValidation
        },
        {
            name: "lastName",
            type:"input",
            message: "What is the new employees last name?",
            validate: emptyResponseValidation
        },
        {
            name: "chooseDepartment",
            type: "list",
            choices: function() {
                var departmentsArr = [];
                for (i=0; i<res.length; i++) {
                departmentsArr.indexOf(res[i].name) === -1 ? departmentsArr.push(res[i].name) : console.log();
                }  
                return departmentsArr;
                },
            message: "What department is the new employee joining?",         
        },
        {
            name: "chooseRole",
            type: "list",
            choices: function() {
                var rolesArr = [];
                for (i=0; i<res.length; i++) {
                rolesArr.push(res[i].title)
                }  
                  return rolesArr;
                },          
            message: "What role is the new employee?"                 
        },
        {
            name: "manager",
            type:"input",
            message: "Who is the new employees Manager?",
            // validate: checkManagerValidation -------------------- NOT WORKING YET
        },

    ]).then(function(answer) {
        var nameArr = answer.manager.split(" ");
        var manFirstName = nameArr[0];
        var manLastName = nameArr[1];
        var query = "SELECT id FROM role WHERE title = ?;SELECT id FROM employee WHERE first_name = ? AND last_name = ?"
        var firstName = answer.firstName;
        var lastName = answer.lastName;
        
        connection.query(query, [answer.chooseRole, manFirstName, manLastName], function(err, res) {
            if (err) throw err;
        
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: firstName,
                last_name: lastName,
                role_id: res[0][0].id,
                manager_id: res[1][0].id
            },
                function(err) {
                    if (err) throw err;
                    console.log("------- New Employee " + firstName + " " + lastName + " Added! -------");
                    startInquirer();
                } 
            )
        })
    });
  })
}

// Add new Department
function addNewDepartment() {
    inquirer.prompt({
        name: "addDepartment",
        type: "input",
        message: "What department would you like to add?",
            
    }).then(function(answer) {
        connection.query("INSERT INTO department SET ?",
        {
            name: answer.addDepartment
        } , 
        function(err) {
            if (err) throw err;
            console.table(["-------- Added New Department: " + answer.addDepartment + " --------"]);
            startInquirer();
        })  
    });
} 

// Add new Role
function addNewRole() {
    connection.query("SELECT name FROM department", function(err, res) {
        if (err) throw err;
    
        inquirer.prompt([
            {
            name: "department",
            type: "list",
            choices: function() {
                var departmentsArr = [];
                    for (i=0; i<res.length; i++) {
                        departmentsArr.push(res[i].name)
                    }  
                    return departmentsArr;
                },
            message: "What department will this new role be in?",             
            },
            {
                name: "addRole",
                type: "input",
                message: "What is the role called?",     
            },
            {
                name: "salary",
                type: "input",
                message: "How much will they get paid?",     
            },

    ]).then(function(answer) {
            var department = answer.department;
            var query = "SELECT id FROM department WHERE name = ?";
            var role = answer.addRole;
            var salary = answer.salary;

            connection.query(query, [department], function(err, res) {
                if (err) throw err;

            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: role,
                    salary: salary,
                    department_id: res[0].id
                },
                function(err) {
                    if (err) throw err;
                    console.log( "------- New Role of " + role + " Added in " + answer.department + " -------");
                    startInquirer();
                }
            )

            });     
        });  
        
      });
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
