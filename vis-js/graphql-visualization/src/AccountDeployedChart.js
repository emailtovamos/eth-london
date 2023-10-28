// AccountDeployedChart.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const GET_ACCOUNT_DEPLOYED = gql`
{
  AccountDeployed {
    sender
    factory
  }
}`;

const AccountDeployedChart = ({ chartType }) => {
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
    chartType === 'Bar' ? (
      <BarChart width={1600} height={800} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Sender" fill="#8884d8" />
        <Bar dataKey="Factory" fill="#82ca9d" />
      </BarChart>
    ) : (
      <PieChart width={1600} height={800}>
        <Pie dataKey="Sender" data={chartData} cx={800} cy={400} outerRadius={300} fill="#8884d8" label />
        <Pie dataKey="Factory" data={chartData} cx={800} cy={400} outerRadius={200} fill="#82ca9d" label />
        <Tooltip />
        <Legend />
      </PieChart>
    )
  );
};

export default AccountDeployedChart;
