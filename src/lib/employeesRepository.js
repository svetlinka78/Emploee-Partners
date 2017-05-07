const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Employee = require('../models/employee');

class EmployeesRepository {

    // get all the employees
    getEmployees(callback) {
        console.log('svetla getEmployeesRepository.getEmployees');
        Employee.count((err, employeesCount) => {
            var count = employeesCount;
            console.log(`Employees count: ${count}`);

            Employee.find({}, (err, employees) => {
                if (err) {
                    console.log(`svetla EmployeesRepository.getEmployees error: ${err}`);
                    return callback(err);
                }
                callback(null, {
                    count: count,
                    employees: employees
                });
            });

        });
    }

    getPagedEmployees(skip, top, callback) {
        console.log('svetla EmployeesRepository.getPagedEmployees');
        Employee.count((err, employeeCount) => {
            var count = employeeCount;
            console.log(`svetla Skip: ${skip} Top: ${top}`);
            console.log(`svetla Employee count: ${count}`);

            Employee.find({})
                    .sort({name: 1})
                    .skip(skip)
                    .limit(top)
                    .exec((err, employees) => {
                        if (err) {
                            console.log(`svetla EmployeeRepository.getPagedEmployees error: ${err}`);
                            return callback(err);
                        }
                        callback(null, {
                            count: count,
                            employees: employees
                        });
                    });

        });
    }

    getEmployeesSummary(skip, top, callback) {
        console.log('svetla EmployeesRepository.getEmployeesSummary');
        Employee.count((err, employeeCount) => {
            var count = employeeCount;
            console.log(`Employee count: ${count}`);

            Employee.find({}, { '_id': 0,
                                'name': 1,
                                 'position': 1
                               })
                    .skip(skip)
                    .limit(top)
                    .exec((err, employeesSummary) => {
                        callback(null, {
                            count: count,
                            employeesSummary: employeesSummary
                        });
                    });

        });
    }

    getEmployee(id, callback) {
        console.log('svetla EmployeesRepository.getEmployee');
        Employee.findById(id, (err, employee) => {
            if (err) {
                console.log(`svetla EmployeeRepository.getEmployee error: ${err}`);
                return callback(err);
            }
            callback(null, employee);
            console.log(`svetla EmployeeRepository.getEmployee ok: ${employee}`);
        });
    }


    insertEmployee(body, partner, callback) {
        console.log('svetla EmployeesRepository.insertEmployee');
        var employee = new Employee();
        var newPartner = { 'id': partner[0].id, 'name': partner[0].name,'email': partner[0].email,'phone': partner[0].phone}
        console.log(body);

        employee.name = body.name;
        employee.position = body.position;
        employee.partnerId = body.partnerId;
        employee.partner = newPartner;
        //employee.partners = body.partners;

        employee.save((err, employee) => {
            if (err) {
                console.log(`svetla EmployeesRepository insertEmployee error: ${err}`);
                return callback(err, null);
            }
            callback(null, employee);
        });
    }

    updateEmployee(id, body, partner, callback) {
        console.log('svetla EmployeesRepository.updateEmployee');

        var partner = { 'id': partner[0].id, 'name': partner[0].name, 'email': partner[0].email, 'phone': partner[0].phone}

      Employee.findById(id, (err, employee)  => {
            if (err) {
                console.log(`EmployeesRepository.editCustomer error: ${err}`);
                return callback(err);
            }

            employee.name = body.name || employee.name;
            employee.position = body.position || employee.position;
            employee.partner = partner;
            employee.partnerId = partner.id;

            employee.save((err, employee) => {
                if (err) {
                    console.log(`svetla EmployeesRepository.UpdateEmployees error: ${err}`);
                    return callback(err, null);
                }
                callback(null, employee);
            });

        });
    }


    deleteEmployee(id, callback) {
        console.log('svetla EmployeesRepository.deleteEmployee');
        Employee.remove({ '_id': id }, (err, employee) => {
            if (err) {
                console.log(`svetla EmployeesRepository.deleteEmployee error: ${err}`);
                return callback(err, null);
            }
            callback(null, employee);
        });
    }
}

module.exports = new EmployeesRepository();
