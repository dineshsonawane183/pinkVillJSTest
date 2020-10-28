(function () {
    'use strict';
    var scrolled = false;
    var steps = 0;
    function init() {
        var cdnFeedUrl = "http://www.pinkvilla.com/photo-gallery-feed-page";
        window.addEventListener('scroll', event => onScroll(event));
        generateHtml(cdnFeedUrl);

    }
    function generateHtml(cdnFeedUrl) {
        var dataFeed = [];
        let dataFeedPromsise = fetchDataFeed(cdnFeedUrl);
        dataFeedPromsise.then((data) => {
            dataFeed = data;
            generateLayout(dataFeed);
        });
        dataFeedPromsise.catch(function (error) {
            console.log('Looks like there was a problem: \n', error);
        });
    }

    function onScroll(event) {
        const current = document.documentElement.scrollTop;
        const maxHeight = document.body.scrollHeight;

        // if current position is more than 80% of document height
        if (current + 100 > maxHeight * 0.8) {
            if (!scrolled) {
                steps = steps+1; 
                var cdnFeedUrl = "http://www.pinkvilla.com/photo-gallery-feed-page/page/";
                generateHtml(cdnFeedUrl + steps);
            }
            scrolled = true;
            setTimeout(function () {
                scrolled = false;
            }, 3000)
        } 
    }

    function generateLayout(dataFeed) {
        var latestIndex = 0;
        let nodes = dataFeed["nodes"];
        for (var i = 0; i < nodes.length; i++) {
            let imgPath = "http://www.pinkvilla.com/" + nodes[i].node.field_photo_image_section;
            let path = nodes[i].node.path;
            let innerHtml = ` <div onclick="window.open('//pinkvilla.com${path}')" class="row news-card p-3 bg-white">
                <div class="col-6 col-md-4">
                    <div class="feed-image">
                        <img id="imgFeed" class="news-feed-image rounded img-fluid img-responsive img-small" src="${imgPath}"></div>
                </div>
                <div class="col-6 col-md-8 nopadding">
                    <div class="news-feed-text">
                        <p><b id="textFeed">${nodes[i].node.title}</b></p>
                    </div>
                </div>
            </div>`;
            var div = document.createElement("div");
            div.innerHTML = innerHtml;
            var listElm = document.getElementById("feedContainer");
            listElm.appendChild(div);
        }


    }
    function fetchDataFeed(cdnFeedUrl) {
        return fetch(cdnFeedUrl)
            .then(response => response.json())
    }
    init();
})();