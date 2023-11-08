const Employee = require('../employee.model.js');
const expect = require('chai').expect;

describe('Employee', () => {

    it('should throw an error if no "firstName, lastName, department" arg', async () => {
        const emp = new Employee({}); // create new Employee, but don't set `name` attr value

        emp.validateSync(err => {
            expect(err).to.exist;
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        });
    });


    it('should throw an error if "firstName, lastName, department" is not a string', () => {

        const cases = [
            { firstName: [], lastName: [], department: [] },
            { firstName: {}, lastName: {}, department: {} }
        ];
        for (let name of cases) {
            const emp = new Employee({ name });

            emp.validateSync(err => {
                expect(err).to.exist;
                expect(err.errors.firstName).to.exist;
                expect(err.errors.lastName).to.exist;
                expect(err.errors.department).to.exist;
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