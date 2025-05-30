module.exports = (error, res) => {
  const formattedError = {};

  for (const field in error.errors) {
    const fieldError = error.errors[field];
    formattedError[field] = [fieldError.message];
  }
  return res.send(400, {
    message: 'Validation failed',
    errors: formattedError,
  });
}