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
export async function getAllPhotos(searchParams) {
  try {
    const sort = '-_id';
    const limit = 10;
    const next = searchParams?.next || null;

    /**
     * if there is next variable defined and sort === 'id' (ascending order of id),
     * get photos with ids greater than next variable
     * 
     * if there is next variable defined and sort !== 'id (-id -> descending order of id),
     * get photos with ids less than next variable
     * 
     * otherwise just get any photo with an id
     */
    const photos = await PhotoModel.find({
      _id: next
        ? sort === '_id'
          ? { $gt: next }
          : { $lt: next }
        : { $exists: true },
    })
      .limit(limit)
      .sort(sort);

    // set next cursor as id of the last image of the fetched photos array
    const next_cursor = photos[limit - 1]?._id.toString() || undefined;

    return { photos: JSON.stringify(photos), next_cursor };
  } catch (error) {
    return { errorMsg: error.message };
  }
}
