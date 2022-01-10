const connect = require('./connection');

const create = async (name, quantity) => {
const db = await connect();
console.log('cheguei aqui');
const { insertedId } = db.collection('products').insertOne({
  name, quantity,
});
return { id: insertedId };
};

module.exports = {
  create,
};
