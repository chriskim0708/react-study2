import React from 'react';
import styled from '@emotion/styled';
import { motion, useScroll } from 'framer-motion';

const InView = () => {
  const { scrollY } = useScroll();
  return (
    <>
      <Box>
        <h2>{`Header inside viewport.`}</h2>
        <Circle
          style={{ translateX: scrollY }}
          transition={{ duration: 2 }}
          initial={{ backgroundColor: '#ff0000' }}
          whileInView={{ backgroundColor: '#0000ff' }}
        />
      </Box>
    </>
  );
};

const Circle = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #0000ff;
`;

const Box = styled.div`
  padding-top: 500px;
  height: 2000px;
`;

export default InView;
