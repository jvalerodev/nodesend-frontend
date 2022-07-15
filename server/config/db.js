import mongoose from 'mongoose';

const connectDB = async () => {
  const connected = mongoose.connection?.readyState;
  if (connected) return;

  try {
    const db = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`MongoDB connected in: ${url}`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;