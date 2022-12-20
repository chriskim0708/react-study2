import { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import { postsAtom } from '../store/posts';
import { useAtomValue, useAtom } from 'jotai';

interface CircleProps {
  color: string;
  style: any;
}

const Circle: FC<CircleProps> = ({ color, style }) => {
  const data = useAtomValue(postsAtom);
  console.log('circle', data);
  useEffect(() => {
    // console.log('Circle mounted');
    return () => {
      // console.log('Circle destory');
    };
  });
  return <StyledCircle color={color} style={style} />;
};

const StyledCircle = styled.div`
  background-color: ${(props) => props.color};
  width: 100px;
  height: 100px;
  margin: 20px;
  padding: 20px;
  border-radius: 50%;
`;

export default Circle;
