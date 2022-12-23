import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../components/Layout';
import { CounterProivder } from '../contexts/CounterContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Layout>
        <CounterProivder>
          <Outlet />
        </CounterProivder>
      </Layout>
    </QueryClientProvider>
  );
};

export default Root;
