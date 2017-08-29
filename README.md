
## Fake Data
http://beta.json-generator.com/EJzLusAdQ

[
  {
    'repeat(1, 100)': {
      _id: '{{objectId()}}',
      title: '{{lorem(5, "words")}}',
      authors: [
        {
          'repeat(3)': {
            name: '{{firstName()}} {{surname()}}'
          }
        }
      ],
      evidence: '{{random("clinical-trials", "rwe")}}',
      product: '{{random("liraglutide", "semaglutide")}}',
      categories: 
      [
        {
          'repeat(3)':  '{{random("weight-change", "burden-of-disease", "hypoglycemia", "sub-population", "health-economic-evaluation", "meta-analysis", "cost", "cardio-vascular", "adherence-persistence", "short-term-studies", "comparitive-effectiveness", "long-term-studies", "AIC", "epidemiology")}}'
        }
      ]
    }
  }
]

* Note * Alternatively purposely omit categories to trigger filtering
categories: 
[
  {
    'repeat(3)':  '{{random("weight-change", "burden-of-disease", "hypoglycemia", "sub-population", "health-economic-evaluation", "meta-analysis", "cost")}}'
  }
]