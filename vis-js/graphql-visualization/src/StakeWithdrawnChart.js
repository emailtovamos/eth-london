// src/StakeWithdrawnChart.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const GET_STAKE_WITHDRAWN = gql`
{
  StakeWithdrawn {
    account
    amount
  }
}`;

const COLORS = ['#0088FE', '#00C49F'];  // Define colors for Pie chart slices

const StakeWithdrawnChart = ({ chartType }) => {
  const { loading, error, data } = useQuery(GET_STAKE_WITHDRAWN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : </p>;

  const chartData = data.StakeWithdrawn.map((item, index) => ({
    name: item.account,
    Amount: item.amount,
  }));

  return (
    chartType === 'Bar' ? (
      <BarChart width={1600} height={800} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Amount" fill="#8884d8" />
      </BarChart>
    ) : (
      <PieChart width={1600} height={800}>
        <Pie dataKey="Amount" data={chartData} cx={800} cy={400} outerRadius={300} fill="#8884d8" label />
        <Tooltip />
        <Legend />
      </PieChart>
    )
  );
};

export default StakeWithdrawnChart;
