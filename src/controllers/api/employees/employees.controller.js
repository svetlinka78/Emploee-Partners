
const employeeRep = require('../../../lib/employeesRepository'),
      partnersRep = require('../../../lib/partnersRepository'),
      util = require('util');

class EmployeesController {
  //get rooting + params in url and bind to the object Employee
    constructor(router) {
        router.get('/', this.getEmployees.bind(this));
        router.get('/page/:skip/:top', this.getEmployeesPage.bind(this));
        router.get('/:id', this.getEmployee.bind(this));
        router.post('/', this.insertEmployee.bind(this));
        router.put('/:id', this.updateEmployee.bind(this));
        router.delete('/:id', this.deleteEmployee.bind(this));
    }
    getEmployees(req, res) {
      //  console.log('svetla said: getEmployees');
        employeeRep.getEmployees((err, data) => {
            if (err) {
                console.log('svetla said: getEmployees error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('svetla said: getEmployees sucsess');
                res.json(data.employees);
            }
        });
    }

    getEmployeesPage(req, res) {
        console.log('svetla said getEmployeesPage');
        const topVal = req.params.top,
              skipVal = req.params.skip,
              top = (isNaN(topVal)) ? 10 : + topVal,
              skip = (isNaN(skipVal)) ? 0 : + skipVal;

      employeeRep.getPagedEmployees(skip, top, (err, data) => {
            res.setHeader('X-InlineCount', data.count);
            if (err) {
                console.log('svetla said error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('svetla said ok');
                res.json(data.employees);
            }
        });
    }

    getEmployee(req, res) {
        console.log('svetla said getEmployee');
        const id = req.params.id;
        console.log(id);

        employeeRep.getEmployee(id, (err, employee) => {
            if (err) {
                console.log('svetla said getEmployee error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('svetla said getEmployee ok');
                res.json(employee);
            }
        });
    }

    insertEmployee(req, res) {
        console.log('svetla said insertEmployee');
        partnersRep.getPartner(req.body.partnerId, (err, partner) => {
            if (err) {
                console.log('svetla partnersRep.getPartner error: ' + util.inspect(err));
                res.json({ status: false, error: 'Partner not found', employee: null });
            } else {
                employeeRep.insertEmployee(req.body, partner, (err, employee) => {
                    if (err) {
                        console.log('svetla said employeeRep.insertEmployee error: ' + util.inspect(err));
                        res.json({status: false, error: 'Insert failed', employee: null});
                    } else {
                        console.log('svetla insertEmployee ok');
                        res.json({ status: true, error: null, employee: employee });
                    }
                });
            }
        });
    }

    updateEmployee(req, res) {
        console.log('svetla said updateEmployee');
        console.log('svetla view req.body');
        console.log(req.body);

        if (!req.body || !req.body.partnerId) {
            throw new Error('Employee and associated Partner required');
        }

        partnersRep.getPartner(req.body.partnerId, (err, partner) => {
            if (err) {
                console.log('svetla said partnersRep.getPartner error: ' + util.inspect(err));
                res.json({ status: false, error: 'Partner not found', customer: null });
            } else {
                employeeRep.updateEmployee(req.params.id, req.body, partner, (err, employee) => {
                    if (err) {
                        console.log('svetla error: ' + util.inspect(err));
                        res.json({ status: false, error: 'Update failed', employee: null });
                    } else {
                        console.log('svetla updateemployee ok');
                        res.json({ status: true, error: null, employee: employee });
                    }
                });
            }
        });
    }

    deleteEmployee(req, res) {
        console.log('svetla deleteEmployee');

        employeeRep.deleteEmployee(req.params.id, (err) => {
            if (err) {
                console.log('svetla deleteEmployee error: ' + util.inspect(err));
                res.json({ status: false });
            } else {
                console.log('svetla deleteEmployee ok');
                res.json({ status: true });
            }
        });
    }

}

module.exports = EmployeesController;
