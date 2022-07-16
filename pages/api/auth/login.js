import cookie from 'cookie';
import connectDB from '@/server/config/db';
import User from '@/server/models/User';
import validate from '@/server/middleware/validate';
import loginSchema from '@/server/validators/loginSchema';
import generateJWT from '@/server/helpers/generateJWT';

connectDB();

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ msg: 'User does not exist.' });
      }

      // Verificar el password
      if (!await user.validatePassword(password)) {
        return res.status(401).json({ msg: 'Incorrect password.' });
      }

      // Autenticar al usuario
      res.setHeader('Set-Cookie', cookie.serialize('token', generateJWT(user._id), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 8,
        sameSite: 'strict',
        path: '/'
      }));

      res.statusCode = 200;

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email
      });

    default:
      res.status(500).json({ msg: 'Invalid request type' });
  }
};

export default validate(loginSchema, handler);