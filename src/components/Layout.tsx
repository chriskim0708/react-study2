import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header>
        <StyledLink to="dashboard">dashboard</StyledLink>
        <StyledLink to="about">about</StyledLink>
        <StyledLink to="post">post</StyledLink>
        <StyledLink to="account">account</StyledLink>
      </Header>
      <Content>{children}</Content>
      <Footer>footer</Footer>
    </>
  );
};

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 5px 15px;
`;

const Header = styled.div`
  height: 40px;
  background-color: #00ff00;
`;

const Content = styled.div`
  padding: 30px;
`;

const Footer = styled.div`
  height: 40px;
  background-color: #0000ff;
`;

export default Layout;
