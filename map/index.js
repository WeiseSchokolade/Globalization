window.onload = () => {

const Relation = {
    BAD: {color: "red"},
    SEMI: {color: "yellow"},
    GOOD: {color: "green"}
}    

const countryData = [
    {
        name: "usa",
        color: [false, false, true]
    },
    {
        name: "germany",
        color: [true, false, false],
    },
    {
        name: "china",
        color: [false, true, false]
    },
    {
        name: "japan",
        color: [true, true, false],
    }
]
const countryNames = ["usa", "germany", "china", "japan"];
const countryColors = [[false, false, true], [true, false, false], [false, true, false], [true, true, false]];
const worldmap = document.getElementById("worldmap");
let selectedCountry;

const interactionMap = document.getElementById("interactionmap");
const interactionCanvas = document.createElement("canvas");
let interactionContext;
function drawInteractionMap() {
    console.log("L");
    interactionCanvas.width = interactionMap.width;
    interactionCanvas.height = interactionMap.height;
    interactionContext = interactionCanvas.getContext("2d");
    interactionContext.drawImage(interactionMap, 0, 0, interactionMap.width, interactionMap.height);
    interactionMap.hidden = "hidden";
}
drawInteractionMap();

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
    var data = interactionContext.getImageData(x, y, 1, 1);
    data = data.data;
    if (data[3] < 127) {
        return null;
    }

    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        if (country.color[0] == (data[0] > 127) &&
            country.color[1] == (data[1] > 127) &&
            country.color[2] == (data[2] > 127)) {
            return country;
        }
    }
    return null;
}

function click(x, y) {
    let country = getCountry(x, y);
    if (country != null) {
        if (country.image.classList.contains("selected")) {
            country.image.classList.remove("selected");
        } else {
            country.image.classList.add("selected");
        }	
    }
};

document.addEventListener("mousedown", (event) => click(event.offsetX, event.offsetY));
document.children[0].appendChild(interactionCanvas);
document.addEventListener("resize", drawInteractionMap);
}