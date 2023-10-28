// AccountDeployedChart.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const GET_ACCOUNT_DEPLOYED = gql`
{
  AccountDeployed {
    sender
    factory
  }
}`;

const AccountDeployedChart = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNT_DEPLOYED);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ... </p>;

  // Process data for visualization
  const chartData = data.AccountDeployed.map((item, index) => ({
    name: index + 1,
    Sender: item.sender,
    Factory: item.factory,
  }));

  return (
    <BarChart width={800} height={400} data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Sender" fill="#8884d8" />
      <Bar dataKey="Factory" fill="#82ca9d" />
    </BarChart>
  );
};

export default AccountDeployedChart;
