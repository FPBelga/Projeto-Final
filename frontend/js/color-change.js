var colorWell;
var defaultColor = "#ffffff";

window.addEventListener("load", startup, false);

function startup() {
    colorWell = document.querySelector("#colorWell");
    colorWell.value = defaultColor;
    colorWell.addEventListener("input", update, false);
    colorWell.select();
}

function update(event) {

    document.body.style.backgroundColor = event.target.value;

}

