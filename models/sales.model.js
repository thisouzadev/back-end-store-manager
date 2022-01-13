const connect = require('./connection');

const create = async (array) => {
  const db = await connect();
  const query = await db.collection('sales').insertOne({ itensSold: array });
  const { insertedId } = query;
  return insertedId;
};

const findByProductId = async (productId) => {
  const db = await connect();
  const insertedId = await db.collection('sales').findOne({ productId });

  return insertedId;
};

module.exports = {
  create,
  findByProductId,
};
