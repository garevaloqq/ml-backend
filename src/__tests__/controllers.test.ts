import request from 'supertest';
import app from '../app';

describe('Search products /api/items?q=:query', () => {
    it('should respond with query iphone', async () => {
        const res = await request(app).get('/api/items?q=iphone');
        expect(res.statusCode).toBe(200);

        expect(res).toHaveProperty('body');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('author');
        expect(res.body.data).toHaveProperty('items');
        expect(res.body.data.items.length).toBe(4);
    });
    it('should respond with query Empty', async () => {
        const res = await request(app).get('/api/items?q=');
        expect(res.statusCode).toBe(200);

        expect(res).toHaveProperty('body');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('author');
        expect(res.body.data).toHaveProperty('items');
        expect(res.body.data.items).toEqual([]);
    });
});

describe('Find one product /api/items/:id', () => {
    it('find valid product', async () => {
        const res = await request(app).get('/api/items/MLA1242342909');
        expect(res.statusCode).toBe(200);

        expect(res).toHaveProperty('body');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('item');
        expect(res.body.data.item.id).toEqual('MLA1242342909');
    });
    it('find not valid product', async () => {
        const res = await request(app).get('/api/items/asd8ds987d9s87d');
        expect(res.statusCode).toBe(400);

        expect(res).toHaveProperty('body');
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual(
            'Si quieres conocer los recursos de la API que se encuentran disponibles visita el Sitio de Desarrolladores de MercadoLibre (http://developers.mercadolibre.com)'
        );
    });
});
