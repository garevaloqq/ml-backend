import request from 'supertest';
import app from '../src/app';

test('GET HealthCheck should respond with a 200 status code', async () => {
    await request(app)
        .get('/api/health-check')
        .then((res) => expect(res.statusCode).toBe(200));
});
