// src/StakeLockedChart.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const GET_STAKE_LOCKED = gql`
{
  StakeLocked {
    account
    totalStaked
  }
}`;

const COLORS = ['#0088FE', '#00C49F'];  // Define colors for Pie chart slices

const StakeLockedChart = ({ chartType }) => {
  const { loading, error, data } = useQuery(GET_STAKE_LOCKED);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : </p>;

  const chartData = data.StakeLocked.map((item, index) => ({
    name: item.account,
    TotalStaked: item.totalStaked,
  }));

  return (
    chartType === 'Bar' ? (
      <BarChart width={1600} height={800} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="TotalStaked" fill="#8884d8" />
      </BarChart>
    ) : (
      <PieChart width={1600} height={800}>
        <Pie dataKey="TotalStaked" data={chartData} cx={800} cy={400} outerRadius={300} fill="#8884d8" label />
        <Tooltip />
        <Legend />
      </PieChart>
    )
  );
};

export default StakeLockedChart;
