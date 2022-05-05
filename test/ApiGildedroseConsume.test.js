const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');
const { listApiGildedroseSchema } = require('../schema/ListApiGildedrose.schema');

const { expect } = chai;

const urlBase = 'http://localhost:8080/api';
let idItemTest = 0;
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
      it('then the body should have a schema', () => expect(response.body).to.be.jsonSchema(listApiGildedroseSchema[0]));
      expect(response.body).to.have.property('name').to.eql('Chicharrón');
      expect(response.body).to.have.property('sellIn').to.eql(12);
      expect(response.body).to.have.property('quality').to.eql(23);
      expect(response.body).to.have.property('type').to.eql('AGED');
      // take the item id how a reference. 
      idItemTest = response.body.id;
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
      it('then the body should have a schema', () => expect(response.body).to.be.jsonSchema(listApiGildedroseSchema[1]));
      expect(response.body.length).to.equal(2);
      expect(response.body[0]).to.have.property('name').to.eql('Miel');
      expect(response.body[0]).to.have.property('sellIn').to.eql(20);
      expect(response.body[0]).to.have.property('quality').to.eql(35);
      expect(response.body[0]).to.have.property('type').to.eql('AGED');

      expect(response.body[1]).to.have.property('name').to.eql('Miel2');
      expect(response.body[1]).to.have.property('sellIn').to.eql(20);
      expect(response.body[1]).to.have.property('quality').to.eql(35);
      expect(response.body[1]).to.have.property('type').to.eql('NORMAL');
    });

    it('Consume POST, update Quality', async () => {
      const response = await agent.post(`${urlBase}/items/quality`);
      expect(response.statusCode).to.equal(statusCode.OK);
      it('then the body should have a schema', () => expect(response.body).to.be.jsonSchema(listApiGildedroseSchema[2]));
      expect(response.body.length).to.equal(3);

      expect(response.body[0]).to.have.property('name').to.eql('Chicharrón');
      expect(response.body[0]).to.have.property('sellIn').to.eql(11);
      expect(response.body[0]).to.have.property('quality').to.eql(24);
      expect(response.body[0]).to.have.property('type').to.eql('AGED');

      expect(response.body[1]).to.have.property('name').to.eql('Miel');
      expect(response.body[1]).to.have.property('sellIn').to.eql(19);
      expect(response.body[1]).to.have.property('quality').to.eql(36);
      expect(response.body[1]).to.have.property('type').to.eql('AGED');

      expect(response.body[2]).to.have.property('name').to.eql('Miel2');
      expect(response.body[2]).to.have.property('sellIn').to.eql(19);
      expect(response.body[2]).to.have.property('quality').to.eql(34);
      expect(response.body[2]).to.have.property('type').to.eql('NORMAL');
    });
  });

  describe('Testing GET Services', () => {
    it('Consume GET, GET items', async () => {
      const response = await agent.get(`${urlBase}/items`);

      expect(response.statusCode).to.equal(statusCode.OK);
      it('then the body should have a schema', () => expect(response.body).to.be.jsonSchema(listApiGildedroseSchema[2]));

      expect(response.body.length).to.equal(3);
    });

    it('Consume GET, GET item by id', async () => {
      const response = await agent.get(`${urlBase}/items/${idItemTest}`);

      expect(response.statusCode).to.equal(statusCode.OK);
      it('then the body should have a schema', () => expect(response.body).to.be.jsonSchema(listApiGildedroseSchema[0]));
      expect(response.body).to.have.property('id').to.eql(idItemTest);
    });
  });

  describe('Testing PUT Services', () => {
    it('Consume PUT service, update item by id', async () => {
      const response = await agent.put(`${urlBase}/items/${idItemTest}`)
        .send({
          name: 'item editado',
          sellIn: 5,
          quality: 100,
          type: 'AGED'
        });
      expect(response.statusCode).to.equal(statusCode.CREATED);
      it('then the body should have a schema', () => expect(response.body).to.be.jsonSchema(listApiGildedroseSchema[0]));
      expect(response.body).to.have.property('name').to.eql('item editado');
      expect(response.body).to.have.property('sellIn').to.eql(5);
      expect(response.body).to.have.property('quality').to.eql(100);
      expect(response.body).to.have.property('type').to.eql('AGED');
    });
  });

  describe('Testing DELETE Services', () => {
    it('Consume DELETE, delete item by id', async () => {
      const response = await agent.delete(`${urlBase}/items/${idItemTest}`);
      expect(response.status).to.equal(statusCode.OK);
      it('then the body should have a schema', () => expect(response.body).to.be.jsonSchema(listApiGildedroseSchema[0]));
      expect(response.body).to.have.property('id').to.eql(idItemTest);
    });
  });
});
