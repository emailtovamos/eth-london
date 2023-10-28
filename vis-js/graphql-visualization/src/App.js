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
      <div className="App flex-container">
        <div className="button-container">
          <button className="button" onClick={() => setShowEventSummary(!showEventSummary)}>
            Event Summary
          </button>
        </div>
        <div>
          {showEventSummary && <EventSummaryChart />}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
