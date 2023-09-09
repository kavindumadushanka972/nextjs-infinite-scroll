import { getAllPhotos } from '@/actions/photoActions';
import Gallery from '@/components/Gallery';
import InitData from '@/components/InitData';
import Link from 'next/link';
import React from 'react';

const HomePage = async () => {
  const { photos } = await getAllPhotos();
  const data = photos ? JSON.parse(photos) : [];

  return (
    // <InitData />
    <div>
      <nav>
        <Link href="/">Home Page</Link>
      </nav>

      <Gallery data={data} />
    </div>
  );
};

export default HomePage;
