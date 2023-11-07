const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw an error if no "firstName, lastName, department" arg', async () => {
        const emp = new Employee({}); // create new Employee, but don't set `name` attr value

        emp.validateSync(err => {
            expect(err.errors.name).to.exist;
        });
    });


    it('should throw an error if "firstName, lastName, department" is not a string', () => {

        const cases = [[], {}];
        for (let name of cases) {
            const emp = new Employee({ name });

            emp.validateSync(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });

    it('should not throw an error if "firstName, lastName, department" is okay', () => {

        const cases = [
            { firstName: 'random', lastName: 'random', department: 'random' },
            { firstName: 'any', lastName: 'any', department: 'any' },
        ];
        for (let name of cases) {
            const emp = new Employee(name);
            emp.validateSync(err => {
                expect(err).to.not.exist;
            });
        }
    });
});

after(() => {
    mongoose.models = {};
});