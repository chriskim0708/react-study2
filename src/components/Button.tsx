import { FC, useEffect, memo } from 'react';
import { textAtom } from '../store/text';
import { useAtomValue } from 'jotai';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ onClick }) => {
  console.log('Button created');
  const text = useAtomValue(textAtom);
  useEffect(() => {
    console.log('Button mounted');
  }, []);
  return <button onClick={onClick}>{text}</button>;
};

export default memo(Button);
