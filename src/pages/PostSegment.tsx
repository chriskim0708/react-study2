import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const call = (count: number) => {};

const PostSegment = () => {
  const [num, setNum] = useState(0);
  const [count, setCount] = useState(0);
  const previousCount = useRef<number | null>(null);

  const increse = () => {
    setNum((n) => n + 1);
    if (num > 5) {
      setCount((c) => c + 1);
    }
  };

  useEffect(() => {
    const prev = previousCount.current; // null
    call(count);
    previousCount.current = count;
    setCount((c) => c + 1);
  }, [count]);

  useEffect(() => {
    call(count);
    setCount((c) => c + 1);
  }, [num, count]);

  const move1 = useCallback(() => {
    call(count);
  }, [count]);

  const move2 = useCallback(() => {
    move1();
  }, [move1]);

  const move3 = useMemo(() => {
    return count;
  }, [count]);

  const move4 = useMemo(() => {
    return move3;
  }, [move3]);

  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => {
      return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      // error
    },
    // enabled: id === '2',
  });

  const postsMutation = useMutation({
    mutationFn: () => {
      return axios.post(`https://jsonplaceholder.typicode.com/posts`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => {
      // error
    },
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const posts = useMemo(() => {
    return data?.data;
  }, [data]);
  console.log('posts', posts);
  console.log('params', id);
  console.log('searchParams', [...searchParams.entries()]);
  console.log('searchParams test', searchParams.get('test'));

  if (isLoading) {
    return <>...loading</>;
  }

  if (isError) {
    return <>error</>;
  }

  // isSuccess
  return (
    <div>
      <h1>PostSegment: {id}</h1>
      <h2>{posts.title}</h2>
      <p>{posts.body}</p>
      <button onClick={() => setSearchParams((params) => [...params, ['ddd', '111']])}>click</button>
      <button onClick={() => navigate('/about')}>go to about</button>
      <button onClick={() => refetch()}>refetch</button>
      <button onClick={() => postsMutation.mutate()}>post</button>
    </div>
  );
};

export default PostSegment;
