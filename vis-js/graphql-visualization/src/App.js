import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import EventSummaryChart from './EventSummaryChart';
import AccountDeployedChart from './AccountDeployedChart';
import DepositedChart from './DepositedChart';
import StakeLockedChart from './StakeLockedChart';
import StakeWithdrawnChart from './StakeWithdrawnChart';
import UserOperationEventChart from './UserOperationEventChart';

import './App.css';

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [showChart, setShowChart] = useState(false);
  const [chartType, setChartType] = useState('Bar');  // New state variable for chart type


  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="header">
          Account Abstraction Data Visualization Dashboard (0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789)
        </div>
        <div className="content">
          <div className="sidebar">
            <button className="summaryButton" onClick={() => setShowChart('EventSummary')}>
              Event Summary
            </button>
            <button className="summaryButton" onClick={() => setShowChart('AccountDeployed')}>
              Account Deployed
            </button>
            <button className="summaryButton" onClick={() => setShowChart('Deposited')}>
              Deposited
            </button>
            <button className="summaryButton" onClick={() => setShowChart('StakeLocked')}>
              Stake Locked
            </button>
            <button className="summaryButton" onClick={() => setShowChart('StakeWithdrawn')}>
              Stake Withdrawn
            </button>
            <button className="summaryButton" onClick={() => setShowChart('UserOperationEvent')}>
              UserOperationEvent
            </button>
          </div>
          <div className="chartArea">
            {/* {showEventSummary && <EventSummaryChart />} */}
            {showChart === 'EventSummary' && <EventSummaryChart chartType={chartType}/>}
            {showChart === 'AccountDeployed' && <AccountDeployedChart chartType={chartType}/>}
            {showChart === 'Deposited' && <DepositedChart chartType={chartType}/>}
            {showChart === 'StakeLocked' && <StakeLockedChart chartType={chartType}/>}
            {showChart === 'StakeWithdrawn' && <StakeWithdrawnChart chartType={chartType}/>}
            {showChart === 'UserOperationEvent' && <UserOperationEventChart chartType={chartType}/>}
          </div>
          <div className="chartTypeButtons">
            <button onClick={() => setChartType('Bar')}>Bar Chart</button>
            <button onClick={() => setChartType('Pie')}>Pie Chart</button>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
