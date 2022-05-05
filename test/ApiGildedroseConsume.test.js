const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

const urlBase = 'http://localhost:8080/api';

// SE DEBE CORRER PROYECTO
// TENER AL MENOS UN OBJETO CREADO (POR AHORA)

describe('Praxis Gildedrose API Test', () => {

  describe('Testing GET Services', () => {
    it('Consume GET, GET items', async () => {
      const response = await agent.get(`${urlBase}/items`);

      expect(response.statusCode).to.equal(statusCode.OK);
    });
    // Añadir un segundo expect con el que se compruebe (creería yo) que la respuesta es una lista
    it('Consume GET, GET item by id', async () => {
      const response = await agent.get(`${urlBase}/items/4`);

      expect(response.statusCode).to.equal(statusCode.OK);
      expect(response.body).to.have.property('id').to.eql(4);
    });
    // Tener presente en el segundo expect cambiar el id que coincida con el que vamos a recibir
  });

  describe('Testing DELETE Services', () => {
    it('Consume DELETE, delete item by id', async () => {
      const response = await agent.delete(`${urlBase}/items/4`);

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body).to.have.property('id').to.eql(4);
    });
    // Tener presente en el segundo expect cambiar el id que coincida con el que vamos a eliminar
  });

  describe('Testing POST Services', () => {
    it('Consume POST, creating item', async () => {
      const response = await agent.post(`${urlBase}/items`)
        .send({
          name: 'Chicharrón',
          sellIn: 12,
          quality: 23,
          type: 'AGED'
        });
      it('then the body should have a schema', console.log(response.body));
      expect(response.statusCode).to.equal(statusCode.CREATED);
      expect(response.body).to.have.property('name').to.eql('Chicharrón');
      expect(response.body).to.have.property('sellIn').to.eql(12);
      expect(response.body).to.have.property('quality').to.eql(23);
      expect(response.body).to.have.property('type').to.eql('AGED');
    });
    it('Consume POST, create batch items', async () => {
      const response = await agent.post(`${urlBase}/items`)
        .send({
          name: 'Chicharrón',
          sellIn: 12,
          quality: 23,
          type: 'AGED'
        });
      it('then the body should have a schema', console.log(response.body));
      expect(response.statusCode).to.equal(statusCode.CREATED);
      expect(response.body).to.have.property('name').to.eql('Chicharrón');
      expect(response.body).to.have.property('sellIn').to.eql(12);
      expect(response.body).to.have.property('quality').to.eql(23);
      expect(response.body).to.have.property('type').to.eql('AGED');
    });
    // Tener presente en el segundo expect cambiar el id que coincida con el que vamos a crear
    it('Consume POST, update Quality', async () => {
      const response = await agent.post(`${urlBase}/items/quality`)
        .send({
          name: "barra de chocorramo",
          sellIn: 5,
          quality: 100
        })
      expect(response.statusCode).to.equal(statusCode.CREATED);
      //expect to return a list
      //expect elements into list have a quality +1 and others conditions
    });
  });
  describe('Testing PUT Services', () => {

    it('Consume PUT service, update item by id', async () => {
      const response = await agent.put(`${urlBase}/items/5`)
        .send({
          name: 'barra2 de chocorramo',
          sellIn: 5,
          quality: 100,
          type: 'AGED'
        });
      expect(response.statusCode).to.equal(statusCode.CREATED);
      expect(response.body).to.have.property('name').to.eql('barra2 de chocorramo');
      expect(response.body).to.have.property('sellIn').to.eql(5);
      expect(response.body).to.have.property('quality').to.eql(100);
      expect(response.body).to.have.property('type').to.eql('AGED');
    });
  });
});
