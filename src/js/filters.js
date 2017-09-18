/**
 * Filters
 */


EvidenceFinder.FILTER_TYPES = {
  CATEGORY:'filter-category',
  EVIDENCE: 'filter-evidence',
  PRODUCT: 'filter-product'
};

EvidenceFinder.FILTERS = [
  {
    id: "rwe",
    label: "Real World Evidence",
    filterType: EvidenceFinder.FILTER_TYPES.EVIDENCE
  },
  {
    id: "clinical-trials",
    label: "Clinical Trials",
    filterType: EvidenceFinder.FILTER_TYPES.EVIDENCE
  },
  {
    id: "liraglutide",
    label: "Liraglutide",
    filterType: EvidenceFinder.FILTER_TYPES.PRODUCT
  },
  {
    id: "semaglutide",
    label: "Semaglutide",
    filterType: EvidenceFinder.FILTER_TYPES.PRODUCT
  },
  {
    id: "weight-change",
    label: "Weight Change",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  },
  {
    id: "burden-of-disease",
    label: "Burden of Disease",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  },
  {
    id: "hypoglycemia",
    label: "Hypoglycemia",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  },
  {
    id: "epidemiology",
    label: "Epidemiology",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  },
  {
    id: "sub-population",
    label: "Sub-population",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  },
  {
    id: "health-economic-evaluation",
    label: "Health Economic Evaluation",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  },
  {
    id: "meta-analysis",
    label: "Meta Analysis",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  },
  {
    id: "cost",
    label: "Cost",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  },
  {
    id: "cardio-vascular",
    label: "Cardio Vascular",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  },
  {
    id: "adherence-persistence",
    label: "Adherence/ Persistence",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  },
  {
    id: "short-term-studies",
    label: "Short-term Studies",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  },
  {
    id: "comparitive-effectiveness",
    label: "Comparitive Effectiveness",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  },
  {
    id: "long-term-studies",
    label: "Long-term Studies",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  },
  {
    id: "AIC",
    label: "A1C",
    filterType: EvidenceFinder.FILTER_TYPES.CATEGORY
  }
];