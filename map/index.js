window.onload = () => {
const countryNames = ["usa", "germany"]
const countryColors = [[26, 0, 253, 255], [245, 0, 0, 255]]
const worldmap = document.getElementById("worldmap");

const interactionMap = document.getElementById("interactionmap");
const interactionCanvas = document.createElement("canvas");
interactionCanvas.width = interactionMap.width;
interactionCanvas.height = interactionMap.height;
const interactionContext = interactionCanvas.getContext("2d");
interactionContext.imageSmoothingEnabled = false;
interactionContext.drawImage(interactionMap, 0, 0, interactionMap.width, interactionMap.height);
interactionMap.hidden = "hidden";

let countries = [];
for (let i = 0; i < countryNames.length; i++) {
    let country = {
        name: countryNames[i],
        color: countryColors[i],
        image: document.getElementById("map" + countryNames[i])
    };
    countries[i] = country;
}

function getCountry(x, y) {
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        var data = interactionContext.getImageData(x, y, 1, 1).data;
        if (data[3] < 127) {
            continue;
        }
        if (data[0] == country.color[0] &&
            data[1] == country.color[1] &&
            data[2] == country.color[2]) {
            return country;
        }
    }
    return null;
}

document.addEventListener("mousedown", (event) => {
    let country = getCountry(event.offsetX, event.offsetY);
    if (country != null) {
        if (country.image.classList.contains("selected")) {
            country.image.classList.remove("selected");
        } else {
            country.image.classList.add("selected");
        }
    }
});

document.children[0].appendChild(interactionCanvas);
}