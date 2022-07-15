import Link from '../models/Link';

const validatePassword = handler => {
  return async (req, res) => {
    const { url } = req.query;
    const { password } = req.body;

    if (password) {
      const link = await Link.findOne({ url });

      if (!await link.validatePassword(password)) {
        return res.status(401).json({ msg: 'Invalid password.' });
      }
    }
    
    return handler(req, res);
  };
};

export default validatePassword;