'use client';

import { dynamicBlurDataUrl } from '@/utils/dynamicBlurDataUrl';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Gallery = ({ data }) => {
  const [imagesSet, setImagesSet] = useState([]);

  useEffect(() => {
    getResources();
  }, [data]);

  /**
   * modifiyng the image urls object with including blurHash
   */
  const getResources = async () => {
    const resources = await Promise.all(
      data.map(async (photo) => ({
        _id: photo._id,
        imgUrl: photo.imgUrl,
        blurHash: await dynamicBlurDataUrl(photo.imgUrl),
      }))
    );

    setImagesSet(resources);
  };

  return (
    <>
      <div className="gallery">
        {imagesSet.map((item) => (
          <div key={item._id}>
            <Image
              src={item.imgUrl}
              alt={item.imgUrl}
              width={50}
              height={50}
              style={{ width: '100%', height: '100%' }}
              sizes="(max-width: 50px) 2vw, 60vw"
              priority
              placeholder="blur"
              blurDataURL={item.blurHash}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
