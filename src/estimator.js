const periodUtility = (periodType, periodCount) => {
  if (periodType === 'days') {
    return periodCount;
  }
  if (periodType === 'weeks') {
    return periodCount * 7;
  }
  if (periodType === 'months') {
    return periodCount * 30;
  }
  return periodCount;
};

const covid19ImpactEstimator = (data) => {
// task 1
  const { periodType, timeToElapse, reportedCases } = data;


  const periodInDays = periodUtility(periodType, timeToElapse);

  const periodFactor = periodInDays / 3;

  const periodFactorTrunc = Math.trunc(periodFactor);

  const x = 2 ** periodFactorTrunc;

  const currentlyInfectedImpact = reportedCases * 10;
  const infectionsByRequestedTimeImpact = currentlyInfectedImpact * x;

  const dataToBeReturned = {
    data: {},
    impact: {},
    severeImpact: {}
  };

  dataToBeReturned.data = data;

  dataToBeReturned.impact.currentlyInfected = currentlyInfectedImpact;
  dataToBeReturned.impact.infectionsByRequestedTime = infectionsByRequestedTimeImpact;

  const currentlyInfectedSevere = reportedCases * 50;
  const infectionsByRequestedTimeSevere = currentlyInfectedSevere * x;

  dataToBeReturned.severeImpact.currentlyInfected = currentlyInfectedSevere;
  dataToBeReturned.severeImpact.infectionsByRequestedTime = infectionsByRequestedTimeSevere;


  return dataToBeReturned;
};

export default covid19ImpactEstimator;
