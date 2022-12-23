import React, { useContext, useMemo } from 'react';
import { CounterProivder, CounterContext, CounterActionContext } from '../contexts/CounterContext';
import { Outlet, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useQuery, useMutation, useQueryClient, useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { usersAtom } from '../store/users';
import { useAtomValue, useSetAtom } from 'jotai';

const FirstChildComponent = () => {
  const { count } = useContext(CounterContext);
  return <div>first child component: {count}</div>;
};

const FirstComponent = () => {
  return (
    <div>
      <FirstChildComponent />
    </div>
  );
};

const SecondComponent = () => {
  const { count } = useContext(CounterContext);
  return <div>second component: {count}</div>;
};

const ThirdComponent = () => {
  const users = useAtomValue(usersAtom);
  console.log('third component users', users);
  return (
    <div>
      third components
      <ul>
        {users.map((user: any) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

const Button = () => {
  const actions = useContext(CounterActionContext);
  return (
    <>
      <button onClick={actions?.increase}>increase click</button>
      <button onClick={actions?.decrease}>decrease click</button>
    </>
  );
};

const PostItem = ({ title, body }: any) => {
  return (
    <li>
      title: {title}, body: {body}
    </li>
  );
};

const generator = (data: any) => {
  return data.map(({ title, body }: any) => {
    return <PostItem key={title} title={title} body={body} />;
  });
};
const PostList = ({ isLoading, posts }: any) => {
  return (
    <>
      {isLoading && <div>...loading</div>}
      {!isLoading && <ul>{generator(posts)}</ul>}
    </>
  );
};

const Post = () => {
  const setUsers = useSetAtom(usersAtom);
  const queryClient = useQueryClient();
  // const { data: users, isLoading } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: async () => {
  //     return axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => res.data);
  //   },
  // });

  // const { data: postsData } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: () => {
  //     return axios.get(`https://jsonplaceholder.typicode.com/posts`);
  //   },
  // });
  const wait = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
  const [users, posts] = useQueries({
    queries: [
      {
        queryKey: ['users'],
        queryFn: async () => {
          return axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => res.data);
        },
        onSuccess: (data: any) => {
          console.log('user success data', data);
          setUsers((users) => users.concat(data));
        },
      },
      {
        queryKey: ['posts'],
        queryFn: async () => {
          await wait(10000);
          return axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => res.data);
        },
      },
    ],
  });

  const addUserMutation = useMutation({
    mutationFn: ({ id = 0 }: any) => {
      console.log('add user id', id);
      return axios.post(`https://jsonplaceholder.typicode.com/users`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return (
    <div>
      Users
      {!users.isLoading && (
        <ul>
          {users.data.map((user: any) => {
            return (
              <li key={user.id}>
                id: {user.id}, name: {user.name}, phone: {user.phone}
              </li>
            );
          })}
        </ul>
      )}
      Posts
      <PostList isLoading={posts.isLoading} posts={posts.data} />
      <button onClick={() => addUserMutation.mutate({ id: 11 })}>add</button>
      <br />
      <br />
      <FirstComponent />
      <SecondComponent />
      <ThirdComponent />
      <Button />
      <br />
      <br />
      <StyledLink to="1">1 page</StyledLink>
      <StyledLink to="2">2 page</StyledLink>
      <Outlet />
    </div>
  );
};

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 5px 10px;
  margin-right: 10px;
  background-color: #ddd;
`;

export default Post;
