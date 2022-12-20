import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

const DashboardSegment = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  console.log('params', id);
  console.log('searchParams', [...searchParams.entries()]);
  console.log('searchParams test', searchParams.get('test'));
  return (
    <div>
      DashboardSegment: {id}
      <button onClick={() => setSearchParams((params) => [...params, ['ddd', '111']])}>click</button>
      <button onClick={() => navigate('/about')}>go to about</button>
    </div>
  );
};

export default DashboardSegment;
