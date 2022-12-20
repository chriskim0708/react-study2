import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../components/Layout';
import { CounterProivder } from '../contexts/CounterContext';

const Root = () => {
  return (
    <Layout>
      <CounterProivder>
        <Outlet />
      </CounterProivder>
    </Layout>
  );
};

export default Root;
