'use server';
import connectDB from '@/utils/mongodb';
import PhotoModel from '@/models/photoModel';
import { imgUrls } from '@/data';

connectDB();

/**
 * This function is for upload all the photos
 * to mongoDB
 * @returns 
 */
export async function insertManyPhotos() {
  try {
    const photos = await PhotoModel.find();

    if (!photos.length) {
      const newPhotos = imgUrls.map((imgUrl) => {
        return new PhotoModel({ imgUrl });
      });

      await PhotoModel.insertMany(newPhotos);
      console.log('Image upload success!');
      return;
    }
  } catch (error) {
    return { errorMsg: error.message };
  }
}

/**
 * to retrieve photos from MongoDB database 
 * @returns photos
 */
export async function getAllPhotos() {
  try {
    const photos = await PhotoModel.find();
    return { photos: JSON.stringify(photos) };
  } catch (error) {
    return { errorMsg: error.message };
  }
}
