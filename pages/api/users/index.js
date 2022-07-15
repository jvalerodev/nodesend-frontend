import connectDB from '../../../server/config/db';
import User from '../../../server/models/User';
import validate from '../../../server/middleware/validate';
import createAccountSchema from '../../../server/validators/createAccountSchema';

connectDB();

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      const { email } = req.body;
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ msg: 'Email is not available.' });
      }

      try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json({ msg: 'User successfully registered.' });
      } catch (error) {
        console.log(error.msg);
      }
      return;

    default:
      res.status(500).json({ msg: 'Invalid request type' });
  }

};

export default validate(createAccountSchema, handler);