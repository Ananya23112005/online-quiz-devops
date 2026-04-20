const request = require('supertest');
const app = require('./index');

describe('Quiz API Tests', () => {
    it('should return welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe("Success");
    });

    it('should return a quiz question', async () => {
        const res = await request(app).get('/quiz');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('question');
    });
});
