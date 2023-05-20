export const handleResult = (res, result, message) => {
  res.status(200).send({ result });
};

export const handleClientError = (res, message, statusCode) => {
  res.status(statusCode || 400).send({ message: message });
};

export const handleError = (res, err) => {
  res.status(500).send({ message: err.message });
};
