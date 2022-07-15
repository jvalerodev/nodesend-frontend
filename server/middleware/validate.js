const validate = (schema, handler) => {
  return async (req, res) => {
    try {
      await schema.validate(req.body);
    } catch (error) {
      console.log(error.message);
      return res.status(403).json({ error: error.message });
    }

    return handler(req, res);
  };
};

export default validate;