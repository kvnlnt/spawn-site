EvidenceFinder.FILTERS = (function(FILTER, FILTER_TYPES) {
  FILTERS = [];
  FILTERS.push(
    new FILTER({
      id: "rwe",
      label: "Real World Evidence",
      filterType: FILTER_TYPES.EVIDENCE
    })
  );
  FILTERS.push(
    new FILTER({
      id: "clinical-trials",
      label: "Clinical Trials",
      filterType: FILTER_TYPES.EVIDENCE
    })
  );
  FILTERS.push(
    new FILTER({
      id: "liraglutide",
      label: "Liraglutide",
      filterType: FILTER_TYPES.PRODUCT
    })
  );
  FILTERS.push(
    new FILTER({
      id: "semaglutide",
      label: "Semaglutide",
      filterType: FILTER_TYPES.PRODUCT
    })
  );
  FILTERS.push(
    new FILTER({
      id: "weight-change",
      label: "Weight Change",
      filterType: FILTER_TYPES.CATEGORY
    })
  );
  FILTERS.push(
    new FILTER({
      id: "burden-of-disease",
      label: "Burden of Disease",
      filterType: FILTER_TYPES.CATEGORY
    })
  );
  FILTERS.push(
    new FILTER({
      id: "hypoglycemia",
      label: "Hypoglycemia",
      filterType: FILTER_TYPES.CATEGORY
    })
  );
  FILTERS.push(
    new FILTER({
      id: "epidemiology",
      label: "Epidemiology",
      filterType: FILTER_TYPES.CATEGORY
    })
  );
  FILTERS.push(
    new FILTER({
      id: "sub-population",
      label: "Sub-population",
      filterType: FILTER_TYPES.CATEGORY
    })
  );
  FILTERS.push(
    new FILTER({
      id: "health-economic-evaluation",
      label: "Health Economic Evaluation",
      filterType: FILTER_TYPES.CATEGORY
    })
  );
  FILTERS.push(
    new FILTER({
      id: "meta-analysis",
      label: "Meta Analysis",
      filterType: FILTER_TYPES.CATEGORY
    })
  );
  FILTERS.push(
    new FILTER({
      id: "cost",
      label: "Cost",
      filterType: FILTER_TYPES.CATEGORY
    })
  );
  FILTERS.push(
    new FILTER({
      id: "cardio-vascular",
      label: "Cardio Vascular",
      filterType: FILTER_TYPES.CATEGORY
    })
  );
  FILTERS.push(
    new FILTER({
      id: "adherence-persistence",
      label: "Adherence/ Persistence",
      filterType: FILTER_TYPES.CATEGORY
    })
  );
  FILTERS.push(
    new FILTER({
      id: "short-term-studies",
      label: "Short-term Studies",
      filterType: FILTER_TYPES.CATEGORY
    })
  );
  FILTERS.push(
    new FILTER({
      id: "comparitive-effectiveness",
      label: "Comparitive Effectiveness",
      filterType: FILTER_TYPES.CATEGORY
    })
  );
  FILTERS.push(
    new FILTER({
      id: "long-term-studies",
      label: "Long-term Studies",
      filterType: FILTER_TYPES.CATEGORY
    })
  );
  FILTERS.push(
    new FILTER({
      id: "AIC",
      label: "A1C",
      filterType: FILTER_TYPES.CATEGORY
    })
  );

  return FILTERS;

})(EvidenceFinder.Filter, EvidenceFinder.FILTER_TYPES);
