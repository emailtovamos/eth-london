/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */

let { EntryPointContract } = require("../generated/src/Handlers.bs.js");

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  accountDeployedsCount: BigInt(0),
  // beforeExecutionsCount: BigInt(0),
  depositedsCount: BigInt(0),
  signatureAggregatorChangedsCount: BigInt(0),
  stakeLockedsCount: BigInt(0),
  stakeUnlockedsCount: BigInt(0),
  stakeWithdrawnsCount: BigInt(0),
  userOperationEventsCount: BigInt(0),
  userOperationRevertReasonsCount: BigInt(0),
  withdrawnsCount: BigInt(0),
};

EntryPointContract.AccountDeployed.loader((event, context) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

EntryPointContract.AccountDeployed.handler((event, context) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity = summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    accountDeployedsCount: currentSummaryEntity.accountDeployedsCount + BigInt(1),
  };

  let accountDeployedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    userOpHash: event.params.userOpHash,
    sender: event.params.sender,
    factory: event.params.factory,
    paymaster: event.params.paymaster,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.AccountDeployed.set(accountDeployedEntity);
});

// EntryPointContract.BeforeExecution.loader((event, context) => {
//   context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
// });

// EntryPointContract.BeforeExecution.handler((event, context) => {
//   let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

//   let currentSummaryEntity = summary ?? INITIAL_EVENTS_SUMMARY;

//   let nextSummaryEntity = {
//     ...currentSummaryEntity,
//     beforeExecutionsCount: currentSummaryEntity.beforeExecutionsCount + BigInt(1),
//   };

//   let beforeExecutionEntity = {
//     id: event.transactionHash + event.logIndex.toString(),
//     eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
//   };

//   context.EventsSummary.set(nextSummaryEntity);
//   context.BeforeExecution.set(beforeExecutionEntity);
// });

EntryPointContract.Deposited.loader((event, context) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

EntryPointContract.Deposited.handler((event, context) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity = summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    depositedsCount: currentSummaryEntity.depositedsCount + BigInt(1),
  };

  let depositedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    account: event.params.account,
    totalDeposit: event.params.totalDeposit,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Deposited.set(depositedEntity);
});

EntryPointContract.SignatureAggregatorChanged.loader((event, context) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

EntryPointContract.SignatureAggregatorChanged.handler((event, context) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity = summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    signatureAggregatorChangedsCount: currentSummaryEntity.signatureAggregatorChangedsCount + BigInt(1),
  };

  let signatureAggregatorChangedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    aggregator: event.params.aggregator,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.SignatureAggregatorChanged.set(signatureAggregatorChangedEntity);
});

EntryPointContract.StakeLocked.loader((event, context) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

EntryPointContract.StakeLocked.handler((event, context) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity = summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    stakeLockedsCount: currentSummaryEntity.stakeLockedsCount + BigInt(1),
  };

  let stakeLockedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    account: event.params.account,
    totalStaked: event.params.totalStaked,
    unstakeDelaySec: event.params.unstakeDelaySec,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.StakeLocked.set(stakeLockedEntity);
});

EntryPointContract.StakeUnlocked.loader((event, context) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

EntryPointContract.StakeUnlocked.handler((event, context) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity = summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    stakeUnlockedsCount: currentSummaryEntity.stakeUnlockedsCount + BigInt(1),
  };

  let stakeUnlockedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    account: event.params.account,
    withdrawTime: event.params.withdrawTime,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.StakeUnlocked.set(stakeUnlockedEntity);
});

EntryPointContract.StakeWithdrawn.loader((event, context) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

EntryPointContract.StakeWithdrawn.handler((event, context) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity = summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    stakeWithdrawnsCount: currentSummaryEntity.stakeWithdrawnsCount + BigInt(1),
  };

  let stakeWithdrawnEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    account: event.params.account,
    withdrawAddress: event.params.withdrawAddress,
    amount: event.params.amount,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.StakeWithdrawn.set(stakeWithdrawnEntity);
});

EntryPointContract.UserOperationEvent.loader((event, context) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

EntryPointContract.UserOperationEvent.handler((event, context) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity = summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    userOperationEventsCount: currentSummaryEntity.userOperationEventsCount + BigInt(1),
  };

  let userOperationEventEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    userOpHash: event.params.userOpHash,
    sender: event.params.sender,
    paymaster: event.params.paymaster,
    nonce: event.params.nonce,
    success: event.params.success,
    actualGasCost: event.params.actualGasCost,
    actualGasUsed: event.params.actualGasUsed,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.UserOperationEvent.set(userOperationEventEntity);
});

EntryPointContract.UserOperationRevertReason.loader((event, context) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

EntryPointContract.UserOperationRevertReason.handler((event, context) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity = summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    userOperationRevertReasonsCount: currentSummaryEntity.userOperationRevertReasonsCount + BigInt(1),
  };

  let userOperationRevertReasonEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    userOpHash: event.params.userOpHash,
    sender: event.params.sender,
    nonce: event.params.nonce,
    revertReason: event.params.revertReason,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.UserOperationRevertReason.set(userOperationRevertReasonEntity);
});

EntryPointContract.Withdrawn.loader((event, context) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

EntryPointContract.Withdrawn.handler((event, context) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity = summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    withdrawnsCount: currentSummaryEntity.withdrawnsCount + BigInt(1),
  };

  let withdrawnEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    account: event.params.account,
    withdrawAddress: event.params.withdrawAddress,
    amount: event.params.amount,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Withdrawn.set(withdrawnEntity);
});

