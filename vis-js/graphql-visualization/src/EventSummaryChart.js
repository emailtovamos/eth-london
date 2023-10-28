import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
});

// Define your GraphQL query
const GET_EVENT_SUMMARY = gql`
  {
    EventsSummary {
      accountDeployedsCount
      depositedsCount
      stakeLockedsCount
      stakeUnlockedsCount
      stakeWithdrawnsCount
      userOperationEventsCount
      userOperationRevertReasonsCount
      withdrawnsCount
    }
  }
`;

const EventSummaryChart = () => {
  const { loading, error, data } = useQuery(GET_EVENT_SUMMARY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Convert string values to integers and restructure data for the chart
  const summaryData = Object.entries(data.EventsSummary[0]).map(([key, value]) => ({
    name: key,
    Count: parseInt(value, 10),
  }));

  return (
    <BarChart width={800} height={400} data={summaryData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Count" fill="#82ca9d" />
    </BarChart>
  );
};

export default EventSummaryChart;
