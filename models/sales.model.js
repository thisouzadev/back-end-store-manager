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
  return insertedId;
};

const update = async (id, array) => {
  const db = await connect();
  const sales = await db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $addToSet: { itensSold: array } },
  );
  if (!sales) return create(array);
  console.log(id, array, 'model');
  return { _id: id, itensSold: array };
};

const exclude = async (id) => {
  const db = await connect();
  const sales = await findByIdMongo(id);
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sales;
};
module.exports = {
  create,
  findAll,
  findByIdMongo,
  update,
  exclude,
};
