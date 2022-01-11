const connect = require('./connection');

const create = async (name, quantity) => {
  const db = await connect();
  const { insertedId } = await db.collection('products').insertOne({
    name, quantity,
  });

  return insertedId;
};

const findByName = async (name) => {
  const db = await connect();
  const insertedId = await db.collection('products').findOne({ name });

  return insertedId;
};

module.exports = {
  create,
  findByName,
};
