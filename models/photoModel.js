import { Schema, model, models } from 'mongoose';

const photoSchema = new Schema(
  {
    imgUrl: String,
  },
  {
    timestamps: true,
  }
);

const PhotoModel = models.photo || model('photo', photoSchema);

export default PhotoModel;