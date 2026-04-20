const request = require('supertest');
const app = require('./index');

describe('Quiz App UI Tests', () => {
    it('should load the HTML UI successfully', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Online Quiz System');
    });

    it('should return quiz data from /quiz', async () => {
        const res = await request(app).get('/quiz');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('question');
    });
});
