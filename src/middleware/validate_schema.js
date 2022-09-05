const validateSchema = (schema) =>
  async (req, res, next) => {
    const body = req.body;
    await schema.validate({
     body
    });

    next();
  };


module.exports = validateSchema;
