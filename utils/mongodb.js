import mongoose from 'mongoose';

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB is already connected!');
    return;
  }

  mongoose
    .connect(process.env.NEXT_PUBLIC_MONGODB_URL)
    .then(() => console.log('MongoDB connected!'))
    .catch((error) => console.log(error));
};

export default connectDB;
