const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    before(async () => {

        try {
            await mongoose.connect('mongodb://0.0.0.0:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });

        } catch (err) {
            console.error(err);
        }
    });

    describe('Reading data', () => {
        before(async () => {

            const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'Employee #1' });
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Employee #2', department: 'Employee #2' });
            await testEmpTwo.save();

            const testEmpThree = new Employee({ firstName: 'Employee #3', lastName: 'Employee #3', department: 'Employee #3' });
            await testEmpThree.save();
        });

        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 3;
            expect(employees.length).to.be.equal(expectedLength);
        });

        it('should return proper document by various params with findOne method.', async () => {
            const employee1 = await Employee.findOne({ firstName: 'Employee #1' });
            const expectedFirstName = 'Employee #1';
            expect(employee1.firstName).to.be.equal(expectedFirstName);

            const employee2 = await Employee.findOne({ lastName: 'Employee #2' });
            const expectedLastName = 'Employee #2';
            expect(employee2.lastName).to.be.equal(expectedLastName);

            const employee3 = await Employee.findOne({ department: 'Employee #3' });
            const expectedDepartment = 'Employee #3';
            expect(employee3.lastName).to.be.equal(expectedDepartment);
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'Employee #1' });
            await employee.save();
            expect(employee.isNew).to.be.false;
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Updating data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'Employee #1' });
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Employee #2', department: 'Employee #2' });
            await testEmpTwo.save();

        });

        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'Employee #1' }, { $set: { firstName: '=Employee #1=', lastName: '=Employee #1=', department: '=Employee #1=' } });
            const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=', lastName: '=Employee #1=', department: '=Employee #1=' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ lastName: 'Employee #2' });
            employee.lastName = '=Employee #2=';
            await employee.save();

            const updatedEmployee = await Employee.findOne({ lastName: '=Employee #2=' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { department: 'Updated!' } });
            const employees = await Employee.find();
            expect(employees[0].department).to.be.equal('Updated!');
            expect(employees[1].department).to.be.equal('Updated!');
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Removing data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'Employee #1' });
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Employee #2', department: 'Employee #2' });
            await testEmpTwo.save();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ lastName: 'Employee #1' });
            const removeEmployee = await Employee.findOne({ lastName: 'Employee #1' });
            expect(removeEmployee).to.be.null;
        });

        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employees = await Employee.find();
            expect(employees.length).to.be.equal(0);
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });
    });
});