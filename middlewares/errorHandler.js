module.exports = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ err: { code: err.description, message: err.message } });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
};
