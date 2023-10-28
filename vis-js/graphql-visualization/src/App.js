import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import EventSummaryChart from './EventSummaryChart';
import './App.css';

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [showEventSummary, setShowEventSummary] = useState(false);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="sidebar">
          <button className="summaryButton" onClick={() => setShowEventSummary(!showEventSummary)}>
            Event Summary
          </button>
        </div>
        <div className="chartArea">
          {showEventSummary && <EventSummaryChart />}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
