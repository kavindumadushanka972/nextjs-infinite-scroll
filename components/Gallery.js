'use client';

import { getAllPhotos } from '@/actions/photoActions';
import useInView from '@/hooks/useInView';
import { dynamicBlurDataUrl } from '@/utils/dynamicBlurDataUrl';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Gallery = ({ data, next_cursor }) => {
  const [imagesSet, setImagesSet] = useState([]); // this is the state to keep data to show
  const [next, setNext] = useState(next_cursor); // next cursor id
  const [loading, setLoading] = useState(false); // loading state

  const { ref, inView } = useInView();

  async function handleLoadMore() {
    if (!next || loading) return;

    setLoading(true);

    // get new photos set
    const { photos, next_cursor } = await getAllPhotos({ next });
    const data = photos ? JSON.parse(photos) : [];

    // modify the json object with including blurDataURL
    const _data = await getResources(data);
    setImagesSet((prev) => [...prev, ..._data]);
    setNext(next_cursor);
    setLoading(false);
  }

  useEffect(() => {
    if(inView) {
      handleLoadMore()
    }
  }, [inView])

  // initially load first set of images
  useEffect(() => {
    const fetchData = async () => {
      const _data = await getResources(data);
      setImagesSet(_data);
    };

    fetchData();
  }, [data]);

  /**
   * modifiyng the image urls object with including blurHash
   * @param {*} data
   * @returns json object including imgUrl and blurDataUrl
   */
  const getResources = async (data) => {
    const resources = await Promise.all(
      data.map(async (photo) => ({
        _id: photo._id,
        imgUrl: photo.imgUrl,
        blurHash: await dynamicBlurDataUrl(photo.imgUrl),
      }))
    );

    return resources;
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

      <button
        className="btn_loadmore"
        disabled={loading}
        onClick={handleLoadMore}
        style={{ display: next ? 'block' : 'none' }}
        ref={ref}
      >
        {loading ? 'Loading...' : 'Load More'}
      </button>

      <div className='stop_load' style={{display: next ? 'none' : 'block'}}>
        <hr />
        <p>No more photos</p>
      </div>
    </>
  );
};

export default Gallery;
