EvidenceFinder.Article = (function(MODEL){

    var Article = function(settings) {
        var settings = settings || {};
        this.abstract = settings.abstract;
        this.affiliations = settings.affiliations;
        this.articleTitle = settings.articleTitle;
        this.authors = settings.authors;
        this.authorsConclusion = settings.authorsConclusion;
        this.backgroundMedications = settings.backgroundMedications;
        this.clinicalTrialsIdentifier = settings.clinicalTrialsIdentifier;
        this.fullCitationAndDOI = settings.fullCitationAndDOI;
        this.isA1C = settings.isA1C;
        this.isAdherencePersistance = settings.isAdherencePersistance;
        this.isBurdenOfDisease = settings.isBurdenOfDisease;
        this.isCardioVascular = settings.isCardioVascular;
        this.isComparativeEffectiveness = settings.isComparativeEffectiveness;
        this.isCost = settings.isCost;
        this.isEpidemiology = settings.isEpidemiology;
        this.isHealthEconomicEvaluation = settings.isHealthEconomicEvaluation;
        this.isHypoglycemia = settings.isHypoglycemia;
        this.isLongTermStudies = settings.isLongTermStudies;
        this.isMetaAnalysis = settings.isMetaAnalysis;
        this.isNNSponsored = settings.isNNSponsored;
        this.isPhase3Trial = settings.isPhase3Trial;
        this.isRWE = settings.isRWE;
        this.isShortTermStudies = settings.isShortTermStudies;
        this.issue = settings.issue;
        this.isUSbasedStudy = settings.isUSbasedStudy;
        this.isWeightChange = settings.isWeightChange;
        this.journal = settings.journal;
        this.language = settings.language;
        this.objective = settings.objective;
        this.pages = settings.pages;
        this.patientsOnComparitorProduct = settings.patientsOnComparitorProduct;
        this.patientsOnNovoProduct = settings.patientsOnNovoProduct;
        this.product = settings.product;
        this.publicationType = settings.publicationType;
        this.publicationYear = settings.publicationYear;
        this.pubmedLink = settings.pubmedLink;
        this.ubmedMESHkeywords = settings.pubmedMESHkeywords;
        this.studyDesign = settings.studyDesign;
        this.studyTitle = settings.studyTitle;
        this.subPopulation = settings.subPopulation;
        this.treatments = settings.treatments;
        this.volume = settings.volume;
    };

    Article.prototype = {
    };

    // Exports
    MODEL = Article;
    return MODEL;

}(EvidenceFinder.Article || {}));