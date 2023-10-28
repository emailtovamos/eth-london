import requests
import pandas as pd
import matplotlib.pyplot as plt

# Define the GraphQL query and endpoint
query = """
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
"""
url = "http://localhost:8080/v1/graphql"

# Make the GraphQL request
response = requests.post(url, json={'query': query})
data = response.json()

# Extract data for visualization
summary_data = data['data']['EventsSummary'][0]

# Convert string values to integers
for key, value in summary_data.items():
    summary_data[key] = int(value)

# Create DataFrame
df_summary = pd.DataFrame([summary_data])

# Plotting
df_summary.plot(kind='bar', figsize=(10, 5))
plt.title('Event Counts Summary')
plt.ylabel('Count')
plt.xticks([])
plt.show()
