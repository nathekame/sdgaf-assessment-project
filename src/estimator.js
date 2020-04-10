const covid19ImpactEstimator = (data) => {
// task 1
  const { reportedCases } = data;

  const currentlyInfectedImpact = reportedCases * 10;
  const infectionsByRequestedTimeImpact = currentlyInfectedImpact * 512;

  const dataToBeReturned = {};

  dataToBeReturned.data = data;

  dataToBeReturned.impact.currentlyInfected = currentlyInfectedImpact;
  dataToBeReturned.impact.infectionsByRequestedTime = infectionsByRequestedTimeImpact;

  const currentlyInfectedSevere = reportedCases * 50;
  const infectionsByRequestedTimeSevere = currentlyInfectedSevere * 512;

  dataToBeReturned.severeImpact.currentlyInfected = currentlyInfectedSevere;
  dataToBeReturned.severeImpact.infectionsByRequestedTime = infectionsByRequestedTimeSevere;


  return dataToBeReturned;
};

export default covid19ImpactEstimator;
