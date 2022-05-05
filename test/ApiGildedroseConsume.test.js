const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

const urlBase = 'http://localhost:8080/api';

// SE DEBE CORRER PROYECTO
// TENER AL MENOS UN OBJETO CREADO (POR AHORA)

describe('Praxis Gildedrose API Test', () => {
  describe('Testing POST Services', () => {
    it('Consume POST, creating item', async () => {
      const response = await agent.post(`${urlBase}/items`)
        .send({
          name: 'Chicharrón',
          sellIn: 12,
          quality: 23,
          type: 'AGED'
        });
      expect(response.statusCode).to.equal(statusCode.CREATED);
      expect(response.body).to.have.property('name').to.eql('Chicharrón');
      expect(response.body).to.have.property('sellIn').to.eql(12);
      expect(response.body).to.have.property('quality').to.eql(23);
      expect(response.body).to.have.property('type').to.eql('AGED');
    });
    it('Consume POST, create batch items', async () => {
      const response = await agent.post(`${urlBase}/items/createItems`)
        .send([
          {
            name: 'Miel',
            sellIn: 20,
            quality: 35,
            type: 'AGED'
          },
          {
            name: 'Miel2',
            sellIn: 20,
            quality: 35,
            type: 'NORMAL'
          }
        ]);
      expect(response.statusCode).to.equal(statusCode.CREATED);
      expect(response.body[0]).to.have.property('name').to.eql('Miel');
      expect(response.body[0]).to.have.property('sellIn').to.eql(20);
      expect(response.body[0]).to.have.property('quality').to.eql(35);
      expect(response.body[0]).to.have.property('type').to.eql('AGED');

      expect(response.body[1]).to.have.property('name').to.eql('Miel2');
      expect(response.body[1]).to.have.property('sellIn').to.eql(20);
      expect(response.body[1]).to.have.property('quality').to.eql(35);
      expect(response.body[1]).to.have.property('type').to.eql('NORMAL');
    });
    // Tener presente en el segundo expect cambiar el id que coincida con el que vamos a crear
    it('Consume POST, update Quality', async () => {
      const response = await agent.post(`${urlBase}/items/quality`)
        .send({
          name: 'barra de chocorramo',
          sellIn: 5,
          quality: 100
        });
      expect(response.statusCode).to.equal(statusCode.OK);
      // expect to return a list
      // expect elements into list have a quality +1 and others conditions
    });
  });

  describe('Testing GET Services', () => {
    it('Consume GET, GET items', async () => {
      const response = await agent.get(`${urlBase}/items`);

      expect(response.statusCode).to.equal(statusCode.OK);
    });
    // Añadir un segundo expect con el que se compruebe (creería yo) que la respuesta es una lista
    it('Consume GET, GET item by id', async () => {
      const response = await agent.get(`${urlBase}/items/1`);

      expect(response.statusCode).to.equal(statusCode.OK);
      expect(response.body).to.have.property('id').to.eql(1);
    });
    // Tener presente en el segundo expect cambiar el id que coincida con el que vamos a recibir
  });

  describe('Testing PUT Services', () => {
    it('Consume PUT service, update item by id', async () => {
      const response = await agent.put(`${urlBase}/items/1`)
        .send({
          name: 'item editado',
          sellIn: 5,
          quality: 100,
          type: 'AGED'
        });
      expect(response.statusCode).to.equal(statusCode.CREATED);
      expect(response.body).to.have.property('name').to.eql('item editado');
      expect(response.body).to.have.property('sellIn').to.eql(5);
      expect(response.body).to.have.property('quality').to.eql(100);
      expect(response.body).to.have.property('type').to.eql('AGED');
    });
  });

  describe('Testing DELETE Services', () => {
    it('Consume DELETE, delete item by id', async () => {
      const response = await agent.delete(`${urlBase}/items/1`);

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body).to.have.property('id').to.eql(1);
    });
    // Tener presente en el segundo expect cambiar el id que coincida con el que vamos a eliminar
  });
});
