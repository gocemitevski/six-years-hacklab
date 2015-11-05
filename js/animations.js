// Wait for the SVG to be loaded
document.querySelector("#syhl").addEventListener("load", function () {
    svgDoc = this.getSVGDocument();
    svgElements = Array.from(svgDoc.querySelector("#animated_elements").children);

    // Create new GreenSock timeline with a few parameters
    sYHLTimeline = new TimelineMax({paused: true, repeat: -1, yoyo: true, repeatDelay: 1});

    // Add tweens to GreenSock sequence
    sYHLTimeline.add(TweenMax.staggerFrom(svgElements, 1, {alpha: 0, ease: Power0.easeOut}, 0.2));

    // Set transform-origin to element's center
    // sYHLTimeline.set(animatedElements, {transformOrigin: "50% 50%"});

    // Define timescale
    // sYHLTimeline.timeScale(2);

    // Seek to a certain time the animation
    // sYHLTimeline.seek(2);

});

var playPresentation = document.getElementById("playPresentation");
var pausePresentation = document.getElementById("pausePresentation");
var reloadPresentation = document.getElementById("reloadPresentation");

// Play presentation on click
playPresentation.addEventListener("click", function () {
    sYHLTimeline.play();
});

// Pause presentation on click
pausePresentation.addEventListener("click", function () {
    sYHLTimeline.pause();
});

// Reload presentation on click
reloadPresentation.addEventListener("click", function () {
    sYHLTimeline.kill();
    sYHLTimeline.restart();
});