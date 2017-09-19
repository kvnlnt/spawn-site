const chalk = require("chalk");
const csv = require("csvtojson");
const fs = require('fs-extra');

function ConvertSpreadsheet(source) {
  this.source = source;
  this.articles = 'EvidenceFinder.ARTICLES = [];\n';
  this.convert().reply();
}

ConvertSpreadsheet.prototype = {
  convert: function() {
    var that = this;
    csv({
      escape: true
    })
      .fromFile(this.source)
      .on("json", jsonObj => {

        let treatments = [];
        if(jsonObj.treatmentArm1.length > 0) treatments.push(jsonObj.treatmentArm1);
        if(jsonObj.treatmentArm2.length > 0) treatments.push(jsonObj.treatmentArm2);
        if(jsonObj.treatmentArm3.length > 0) treatments.push(jsonObj.treatmentArm3);
        if(jsonObj.treatmentArm4.length > 0) treatments.push(jsonObj.treatmentArm4);
        if(jsonObj.treatmentArm5.length > 0) treatments.push(jsonObj.treatmentArm5);

        // serialize csv
        let articleJson = {
          abstract: jsonObj.abstract,
          affiliations: jsonObj.affiliations,
          articleTitle: jsonObj.articleTitle,
          authors: jsonObj.authors,
          authorsConclusion: jsonObj.authorsConclusion,
          backgroundMedications: jsonObj.backgroundMedications,
          clinicalTrialsIdentifier: jsonObj.clinicalTrialsIdentifier,
          fullCitationAndDOI: jsonObj.fullCitationAndDOI,
          isA1C: jsonObj.isA1C === "x" ? true : false,
          isAdherencePersistance: jsonObj.isAdherencePersistance === "x" ? true : false,
          isBurdenOfDisease: jsonObj.isBurdenOfDisease === "x" ? true : false,
          isCardioVascular: jsonObj.isCardioVascular === "x" ? true : false,
          isComparativeEffectiveness: jsonObj.isComparativeEffectiveness === "x" ? true : false,
          isCost: jsonObj.isCost === "x" ? true : false,
          isEpidemiology: jsonObj.isEpidemiology === "x" ? true : false,
          isHealthEconomicEvaluation: jsonObj.isHealthEconomicEvaluation === "x" ? true : false,
          isHypoglycemia: jsonObj.isHypoglycemia === "x" ? true : false,
          isLongTermStudies: jsonObj.isLongTermStudies === "x" ? true : false,
          isMetaAnalysis: jsonObj.isMetaAnalysis === "x" ? true : false,
          isNNSponsored: jsonObj.isNNSponsored === "Y" ? true : false,
          isPhase3Trial: jsonObj.isPhase3Trial === "Y" ? true : false,
          isRWE: jsonObj.isRWE === "Y" ? true : false,
          isShortTermStudies: jsonObj.isShortTermStudies === "x" ? true : false,
          issue: jsonObj.issue,
          isUSbasedStudy: jsonObj.isUSbasedStudy,
          isWeightChange: jsonObj.isWeightChange,
          journal: jsonObj.journal,
          language: jsonObj.language,
          objective: jsonObj.objective,
          pages: jsonObj.pages,
          patientsOnComparitorProduct: jsonObj.patientsOnComparitorProduct,
          patientsOnNovoProduct: jsonObj.patientsOnNovoProduct,
          product: jsonObj.product,
          publicationType: jsonObj.publicationType,
          publicationYear: jsonObj.publicationYear,
          pubmedLink: jsonObj.pubmedLink,
          pubmedMESHkeywords: jsonObj.pubmedMESHkeywords,
          studyDesign: jsonObj.studyDesign,
          studyTitle: jsonObj.studyTitle,
          subPopulation: jsonObj.subPopulation,
          treatments: treatments,
          volume: jsonObj.volume
        };
        // console.log(articleJson);
        
        that.articles += 'EvidenceFinder.ARTICLES.push(new EvidenceFinder.Article('+JSON.stringify(articleJson)+'));\n';
      })
      .on("done", error => {
        if (error) console.log(chalk.red(error));
        // console.log(that.articles);
        fs.writeFileSync('./src/js/common/articles.js', that.articles);
      });
    return this;
  },

  reply: function() {
    console.log(chalk.cyan("\u2713"), chalk.white("Converting CSV to JSON..."));
  }
};

module.exports = ConvertSpreadsheet;
