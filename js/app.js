let data = { 
    params: {
        action: "query",
        format: "json",
        servedby: 1,
        list: "search",
        utf8: 1,
        srsearch: "",
        origin: "*"
    }
};
let baseUrl = "https://en.wikipedia.org/w/api.php";

$(document).ready(() => {
    $("#wiki-form").on("submit", (e) => {
        e.preventDefault();
        data.params.srsearch = $("#wiki-search").val();
        $("#wiki-content").empty();
        axios.get(baseUrl, data).then(( { data } ) => {
            let totalHits = data.query.searchinfo.totalhits;
            let results = data.query.search;
            $("#wiki-result-count").text(`Total hits: ${totalHits}`);
            for (result of results) {
                $("#wiki-content").append(`
                <div class="card mt-4">
                    <div class="card-body">
                        <h5 class="card-title text-muted">${result.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Word count: ${result.wordcount}</h6>
                        <p class="card-text">${result.snippet}</p>
                        <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank" rel="noopener" class="card-link">Read more...</a>
                    </div>
                </div>
                `);
            } 
        });
    });
});
