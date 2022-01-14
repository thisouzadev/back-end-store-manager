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
  const salesProduct = await db.collection('sales').find().toArray();

  return { sales: salesProduct };
};

const findByIdMongo = async (id) => {
  const db = await connect();
  const insertedId = await db.collection('sales').findOne({ _id: ObjectId(id) });
  console.log(insertedId, 'model');
  return insertedId;
};

module.exports = {
  create,
  findAll,
  findByIdMongo,
};
