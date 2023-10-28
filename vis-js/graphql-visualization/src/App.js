import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import EventSummaryChart from './EventSummaryChart';
import AccountDeployedChart from './AccountDeployedChart';

import './App.css';

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [showChart, setShowChart] = useState(false);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="sidebar">
          <button className="summaryButton" onClick={() => setShowChart('EventSummary')}>
            Event Summary
          </button>
          <button className="summaryButton" onClick={() => setShowChart('AccountDeployed')}>
            Account Deployed
          </button>
        </div>
        <div className="chartArea">
          {/* {showEventSummary && <EventSummaryChart />} */}
          {showChart === 'EventSummary' && <EventSummaryChart />}
          {showChart === 'AccountDeployed' && <AccountDeployedChart />}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
