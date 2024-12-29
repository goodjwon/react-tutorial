import React from 'react';
import Layout from '../components/Layout';

const Home = () => (
  <Layout title="오늘의 할일">
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">오늘의 할일 목록</h2>
      <ul>
        <li className="mb-2">할일 1</li>
        <li className="mb-2">할일 2</li>
      </ul>
    </div>
  </Layout>
);

export default Home;
