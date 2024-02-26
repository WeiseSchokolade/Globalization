window.onload = () => {
const worldmap = document.getElementById("worldmap");
const mapbackground = document.getElementById("mapbackground");
let state = null;

const states = {
    default: {
        header: "Wähle eine Ebene aus",
        legende: ["Maßstab 1:35000000"],
        zusatz: ['Basiskarte: <a href="https://commons.wikimedia.org/wiki/File:1-12_Color_Map_World.png">Colomet</a>, Public domain, via Wikimedia Commons',
                'Import/Export-Informationen: <a href="www-genesis.destatis.de">www-genesis.destatis.de</a>',
                "Alle Daten Stand 2023."
                ],
        deutung: [
                "Zu jeder Karte gibt es eine Deutung, was sich aus dieser schließen lässt. Stöber gerne durch alle Ebenen!"
                ]
    },
    export_map: {
        elements: [
            document.getElementById("exportmap"),
        ],
        button: "layerexportbutton",
        header: "Exporte aus Deutschland",
        legende: ["Je heller, desto mehr wird in dieses Land exportiert.", "Größenordnung: Weiß = USA (ca. 158 Milliarden)"],
        zusatz: ["Insgesamt exportierte Deutschland 2023 Waren im Wert von 1,6 Billionen Euro, davon Waren im Wert von",
                "- 158 Milliarden in die USA, ",
                "- 117 Milliarden nach Frankreich, ",
                "- 111 Milliarden in die Niederlande sowie ",
                "- 97 Milliarden nach China.",
				"Die Güter, welche Deutschland am meisten exportiert, sind Kraft- und Landfahrzeuge, Maschinen sowie elektrotechnische Erzeugnisse. Dabei gibt es keine Auffälligkeiten, es ist bei jedem Land ähnlich."
            ],
        deutung: ["Auf dieser Karte sind die wichtigsten Abnehmer deutscher Exportprodukte leicht erkennbar. Die USA, China und Länder der EU sind am stärksten beteiligt.",
                "Würde einer dieser Märkte wegfallen, gäbe es schwere Folgen für die deutsche Wirtschaft. Große Konzerne müssten Werke schließen, da der deutsche Markt offensichtlich zu klein für die hiesigen Produktionskapazitäten ist."]
    },
    import_map: {
        elements: [
            document.getElementById("importmap"),
        ],
        button: "layerimportbutton",
        header: "Importe nach Deutschland",
        legende: ["Je heller, desto mehr wird aus diesem Land importiert.", "Größenordnung: Weiß = China (ca. 156 Milliarden)"],
        zusatz: ["Insgesamt importierte Deutschland 2023 Waren im Wert von 1,4 Billionen Euro, davon Waren im Wert von",
                "- 156 Milliarden aus China, ",
                "- 103 Milliarden aus den Niederlande, ",
                "- 94 Milliarden aus den USA sowie ",
                "- 80 Milliarden aus Polen.",
				"Aus China und Polen machte Elektrotechnik den am meisten importierten Anteil aus, während aus den USA hauptsächlich Maschinen und aus der Niederlande hauptsächlich Pharmazieprodukte importiert wurden."
            ],
        deutung: [
                "Auf dieser Karte sind die wichtigsten Quellen von Waren in Deutschland sichtbar. China, die USA, und die EU-Länder spielen auch hier wieder eine große Rolle.",
                "Da systemkritische Produkte wie Antibiotika und Elektrotechnik importiert werden, würde ein Wegfall dieser Import-Länder einen Zusammenbruch der hiesigen Gesellschaft bedeuten."
            ]
    },
	jeans_map: {
		elements: [
			document.getElementById("jeansmap")
		],
		button: "layerjeansbutton",
		header: "(Bsp) Warenkette einer Jeans",
		legende: ['<div style="display: flex; flex-direction: row"><div style="color: blue; margin-right: 5px;">→</div> Weg</div>'],
		zusatz: ["Gesamte Wegstrecke: über 50.000 km",
			"Kasachstan → Türkei → China → Polen → Bangladesch → China → Belgien → Deutschland → Ostafrika"
		],
		deutung: ["Auf dieser Karte ist ersichtlich, wie vernetzt unsere Welt eigentlich ist. Eine einzige Jeans reist durch (mindestens) 8 verschiedene Länder, weil in jedem eine bestimmte Voraussetzung/Gegenheit geben ist, sodass die Lieferkette über genau dieses Land am gewinnbringensten ist."]
	},
	eu_map: {
		elements: [
			document.getElementById("eumap")
		],
		button: "layereubutton",
		header: "EU",
		legende: ["Länder der EU sind weiß hervorgehoben"],
		zusatz: [],
		deutung: [],
		darken: true
	},
	nato_map: {
		elements: [
			document.getElementById("natomap")
		],
		button: "layernatobutton",
		header: "NATO",
		legende: ["Länder der NATO sind weiß hervorgehoben"],
		zusatz: [],
		deutung: [],
		darken: true
	}
}

let collapsedInfobox = false;
function collapse(collapsed) {
    const buttonContent = document.getElementById("collapseinfobuttoncontent");
    const infobox = document.getElementById("infobox");
    collapsedInfobox = collapsed;
    if (collapsed) {
        buttonContent.classList.remove("triangleup");
        buttonContent.classList.add("triangledown");
        infobox.style.maxHeight = null;
    } else {
        buttonContent.classList.add("triangleup");
        buttonContent.classList.remove("triangledown");
        infobox.style.maxHeight = infobox.scrollHeight + "px";
    }
};
document.getElementById("collapseinfobutton").addEventListener("click", () => collapse(!collapsedInfobox));

function applyData(state) {
    document.getElementById("infoheader").innerHTML = state.header;
    let legende = document.getElementById("infolegende");
    legende.innerHTML = "";
    for (value of state.legende) {
        let element = document.createElement("div");
        element.innerHTML = value;
        legende.appendChild(element);
    }
    let zusatz = document.getElementById("infozusatz");
    zusatz.innerHTML = "";
    for (value of state.zusatz) {
        let element = document.createElement("div");
        element.innerHTML = value;
        zusatz.appendChild(element);
    }
    let deutung = document.getElementById("infodeutung");
    deutung.innerHTML = "";
    for (value of state.deutung) {
        let element = document.createElement("div");
        element.innerHTML = value;
        deutung.appendChild(element);
    }
    if (!collapsedInfobox) {
        collapse(false);
    }
	if (state.darken) {
		worldmap.classList.add("darken");
		mapbackground.classList.add("darken");
	} else {
		worldmap.classList.remove("darken");
		mapbackground.classList.remove("darken");
	}
}

function selectLayer(newState) {
    if (state != null || state == newState) {
        document.getElementById(state.button).classList.remove("buttonselect");
        for (element of state.elements) {
            element.hidden="hidden";
        }
        applyData(states.default);
        if (state == newState) {
            state = null;
            return;
        }
    }
    state = newState;
    document.getElementById(state.button).classList.add("buttonselect");
    for (element of state.elements) {
        element.hidden="";
    }
    applyData(state);
}

document.getElementById("layernonebutton").onclick = () => selectLayer(state);
document.getElementById("layerexportbutton").onclick = () => selectLayer(states.export_map);
document.getElementById("layerimportbutton").onclick = () => selectLayer(states.import_map);
document.getElementById("layerjeansbutton").onclick = () => selectLayer(states.jeans_map);
document.getElementById("layereubutton").onclick = () => selectLayer(states.eu_map);
document.getElementById("layernatobutton").onclick = () => selectLayer(states.nato_map);

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
let selectedCountry;

const interactionMap = document.getElementById("interactionmap");
const interactionCanvas = document.createElement("canvas");
let interactionContext;
function drawInteractionMap() {
    interactionMap.hidden = "";
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
    if (state != null && state.countrySelect) {
        let country = getCountry(x, y);
        if (country != null) {
            if (country.image.classList.contains("selected")) {
                country.image.classList.remove("selected");
            } else {
                country.image.classList.add("selected");
            }
        }	
    }
};

document.addEventListener("mousedown", (event) => click(event.offsetX, event.offsetY));
document.addEventListener("resize", drawInteractionMap);

for (element of document.getElementsByClassName("defaulthidden")) {
    element.hidden = "hidden";
}
document.getElementById("loadingoverlay").style.display = "none";

applyData(states.default);
}