import cookie from 'cookie';

const handler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      res.setHeader('Set-Cookie', cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/'
      }));

      return res.status(200).json({ success: true });

    default:
      res.status(500).json({ msg: 'Invalid request type' });
  }
};

export default handler;