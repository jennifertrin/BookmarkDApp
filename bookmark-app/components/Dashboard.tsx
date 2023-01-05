import React from 'react';

type DashboardProps = {
    name: string | null;
}

const Dashboard = ({name} : DashboardProps) => {

  return (
    <div className="flex flex-col w-1/2 font-body align-middle p-10">
      <div className="text-xl">{`Welcome to the Dashboard, ${name ? name : 'Community Member'}!`}</div>
    </div>
  );
};

export default Dashboard;
