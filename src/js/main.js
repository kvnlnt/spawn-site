document.addEventListener("DOMContentLoaded", function(event) {
    EvidenceFinder.app = new EvidenceFinder.App({
        container: "evidence-finder",
        routes: [
          {path: "#/:id"}
        ]
    });
});