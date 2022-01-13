const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (name, quantity) => {
  const db = await connect();
  const insertedId = await db.collection('products').insertOne({
    name, quantity,
  });

  return insertedId.ops[0];
};

const findByName = async (name) => {
  const db = await connect();
  const insertedId = await db.collection('products').findOne({ name });

  return insertedId;
};

const findAll = async () => {
  const db = await connect();
  const products = await db.collection('products').find().toArray();

  return products;
};

const findById = async (id) => {
  const db = await connect();
  const product = await db.collection('products').findOne(new ObjectId(id));

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  );
  if (!product) return create(name, quantity);
  return { _id: id, name, quantity };
};

module.exports = {
  create,
  findByName,
  findAll,
  findById,
  updateProduct,
};
