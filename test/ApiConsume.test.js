const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

const urlBase = 'http://localhost:8080/api';
// const githubUserName = 'jsapuyesp';
// const repository = 'workshop-api-testing-js';

describe('Praxix Gildedrose API Test', () => {
  describe('Testing GET Services', () => {
    it('Consume GET, GET items', async () => {
      const response = await agent.get(`${urlBase}/items`);

      expect(response.statusCode).to.equal(statusCode.OK);
    });
    // Añadir un segundo expect con el que se compruebe (creería yo) que la respuesta es una lista
  });
  describe('Testing DELETE Services', () => {
    it('Consume DELETE, delete item by id', async () => {
      const response = await agent.delete(`${urlBase}/items/3`);

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body).to.have.property('id').to.eql(3);
    });
    // Tener presente en el segundo expect cambiar el id que coincida con el que vamos a eliminar
  });
  describe('Testing POST Services', () => {
    it('Consume POST, creating item', async () => {
      const response = await agent.post(`${urlBase}/items`)
        .send({
          name: 'Papa',
          sellIn: 12,
          quality: 25,
          type: 'AGED'
        });

      expect(response.statusCode).to.equal(statusCode.CREATED);
    });
    // Sería poner un segundo expect
    // (Viendo la respuesta en postman, sería verificar el return)
  });
  describe('Testing PUT Services', () => {

  });
});
