const formResponse = (status, message, result, res) => {
  res.status(status).send({
      status: status,
      message: message,
      result: result,
  });
};

module.exports = formResponse;
