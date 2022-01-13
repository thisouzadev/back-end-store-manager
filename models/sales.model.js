const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (array) => {
  const db = await connect();
  const query = await db.collection('sales').insertOne({ itensSold: array });
  const { insertedId } = query;
  return insertedId;
};

const findAll = async () => {
  const db = await connect();
  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const findByIdMongo = async (id) => {
  const db = await connect();
  const insertedId = await db.collection('sales').findOne(new ObjectId(id));

  return insertedId;
};

module.exports = {
  create,
  findAll,
  findByIdMongo,
};
