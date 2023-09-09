'use client'

import { insertManyPhotos } from '@/actions/photoActions';

const InitData = () => {
  return <button onClick={() => insertManyPhotos()}>Init Data</button>;
};

export default InitData;
