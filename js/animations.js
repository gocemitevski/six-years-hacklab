// Wait for the SVG graphic to load
document.querySelector("#syhl").addEventListener("load", function () {
    var svgDoc = this.getSVGDocument();
    var svgElementsContainer = svgDoc.querySelector("#animated_elements");
    var svgElements = Array.from(svgDoc.querySelector("#animated_elements").children);

    var drawSix = new TweenMax.staggerFrom(svgElements, 1, {opacity: 0, ease: Power0.easeOut}, 0.1);
    var slideLeft = new TweenMax.staggerTo(shuffle(svgElements), 0.5, {opacity: 0, x: "-=80", rotation: "-5", ease: SlowMo.easeOut}, 0.05);
    var reappear = new TweenMax.staggerTo(shuffle(svgElements), 0.5, {opacity: 1, x: "+=80", rotation: "0", ease: SlowMo.easeOut}, 0.05);
    var slideRight = new TweenMax.staggerTo(shuffle(svgElements), 0.5, {opacity: 0, x: "+=80", rotation: "5", ease: SlowMo.easeOut}, 0.05);

    // Create new GreenSock timeline with a few parameters
    var sYHLTimeline = new TimelineMax({repeat: -1, repeatDelay: 1, yoyo: true});

    // Make animated elements container visible before tweening
    sYHLTimeline.set(svgElementsContainer, {visibility: "visible"});

    // Add tweens to the GSAP sequence
    sYHLTimeline.add(
            [
                drawSix,
                slideLeft,
                reappear,
                slideRight
            ], 0, "sequence", 1);

    // Randomize animated elements on repeat
    sYHLTimeline.eventCallback("onRepeat", randomizeElements);

    function randomizeElements() {
        // Shuffle elements in array
        svgElements = shuffle(svgElements);
        // Remove the first animation - drawSix from the timeline
        sYHLTimeline.remove(drawSix);
    }

    // Set transform-origin to element's center
    // sYHLTimeline.set(animatedElements, {transformOrigin: "50% 50%"});

    // Define timescale
    // sYHLTimeline.timeScale(2);

    // Seek to a certain time the animation
    // sYHLTimeline.seek(2);

    var playPresentation = document.querySelector("#playPresentation");
    var stopPresentation = document.querySelector("#stopPresentation");
    var reloadPresentation = document.querySelector("#reloadPresentation");

    // Pause presentation on click
    playPresentation.addEventListener("click", function () {
        sYHLTimeline.play();
    });

    // Pause presentation on click
    stopPresentation.addEventListener("click", function () {
        sYHLTimeline.pause();
    });

    // Reload presentation on click
    reloadPresentation.addEventListener("click", function () {
        sYHLTimeline.restart();
    });

});

// Fisher-Yates (aka Knuth) Shuffle
// http://stackoverflow.com/a/2450976/3190066
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}