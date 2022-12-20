import React, { FC, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';

interface DashboardChildProps {
  value: string;
}

const DashboardContext = createContext('');

const FirstChildComponent = () => {
  const text = useContext(DashboardContext);
  return <div>first child component:{text}</div>;
};

const FirstComponent: FC<DashboardChildProps> = ({ value }) => {
  return (
    <div>
      <FirstChildComponent />
    </div>
  );
};

const SecondComponent: FC<DashboardChildProps> = ({ value }) => {
  const text = useContext(DashboardContext);
  return <div>second component: {text}</div>;
};

const ThirdComponent: FC<DashboardChildProps> = ({ value }) => {
  const text = useContext(DashboardContext);
  return <div>third component: {text}</div>;
};

const Dashboard = () => {
  const value = 'test';
  return (
    <div>
      Dashboard
      <br />
      <br />
      <DashboardContext.Provider value="hello, world!">
        <FirstComponent value={value} />
        <SecondComponent value={value} />
        <ThirdComponent value={value} />
      </DashboardContext.Provider>
      <Outlet />
    </div>
  );
};

export default Dashboard;
