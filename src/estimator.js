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
  /* first challenge */

  const {

    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds

  } = data;


  const periodInDays = periodUtility(periodType, timeToElapse);

  const periodFactor = periodInDays / 3;

  const periodFactorTrunc = Math.trunc(periodFactor);

  const x = 2 ** periodFactorTrunc;

  const dataToBeReturned = {
    data: {},
    impact: {},
    severeImpact: {}
  };

  // data
  dataToBeReturned.data = data;

  // impact(first challenge)
  const currentlyInfectedImpact = reportedCases * 10;
  const infectionsByRequestedTimeImpact = currentlyInfectedImpact * x;

  dataToBeReturned.impact.currentlyInfected = currentlyInfectedImpact;
  dataToBeReturned.impact.infectionsByRequestedTime = infectionsByRequestedTimeImpact;


  // severe impact (first challenge)
  const currentlyInfectedSevere = reportedCases * 50;
  const infectionsByRequestedTimeSevere = currentlyInfectedSevere * x;

  dataToBeReturned.severeImpact.currentlyInfected = currentlyInfectedSevere;
  dataToBeReturned.severeImpact.infectionsByRequestedTime = infectionsByRequestedTimeSevere;

  /* end of first challenge */

  /* Second challenge */

  const { impact, severeImpact } = dataToBeReturned;

  const averageBedsOccupied = (totalHospitalBeds / 100) * 65;
  const averageAvialableBeds = totalHospitalBeds - averageBedsOccupied;


  // impact (second challenge)
  const severeCasesByRequestedTimeImpact = (impact.infectionsByRequestedTime / 100) * 15;
  const hospitalBedsByRequestedTimeImpact = averageAvialableBeds - severeCasesByRequestedTimeImpact;

  dataToBeReturned.impact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTimeImpact;


  // severe impact(second challenge)
  const severeCasesByRequestedTimeSevere = (severeImpact.infectionsByRequestedTime / 100) * 15;
  const hospitalBedsByRequestedTimeSevere = averageAvialableBeds - severeCasesByRequestedTimeSevere;

  dataToBeReturned.severeImpact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTimeSevere;


  return dataToBeReturned;
};

export default covid19ImpactEstimator;
