const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {

    before(async () => {
        const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
        await testDepOne.save();
    });

    it('/:id should update chosen document and return success', async () => {
        const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.not.be.null;
    });

    it('/:id should return 404 if the department is not found', async () => {
        const nonExistentId = '5d9f1140f10a81216cfd4409';
        const res = await request(server).delete(`/api/departments/${nonExistentId}`);
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('message').that.includes('Not found');
    });

    it('/:id should return 500 if there is an internal server error', async () => {
        const res = await request(server).delete('/api/departments/invalidObjectId');
        expect(res.status).to.be.equal(500);
        expect(res.body).to.have.property('message').to.have.property('message')
        .that.includes('Cast to ObjectId failed for value "invalidObjectId" (type string) at path "_id" for model "Department"')
    });

    after(async () => {
        await Department.deleteMany();
    });

});

'Cast to ObjectId failed for value "invalidObjectId" (type string) at path "_id" for model "Department"'