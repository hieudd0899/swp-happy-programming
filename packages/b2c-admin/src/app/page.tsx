import React from 'react';
import { db } from 'common/libs/db';

const HomePage = async () => {
  const data = await db.user.findMany();

  return <div>{data?.map((user) => <p key={user.id}>{user.name}</p>)}</div>;
};

export default HomePage;
