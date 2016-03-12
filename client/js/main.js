/**
 * Created by Wim on 11-3-2016.
 */
var grid = {}, shipTitles = [], shipSize = 2, previews = [];

var Title = function (posX, posY, height, width, id) {
    this.clicked = false;

    this.elem = document.createElement("div");
    this.elem.className = "title";
    this.elem.id = id;
    this.elem.style.width = (width - 4) + "px";
    this.elem.style.height = (height - 4) + "px";

    this.elem.addEventListener("click", function () {
        placeShip(this);
    });

    this.elem.addEventListener("mouseover", function () {
        previewShip(this);
    });

    this.elem.addEventListener("mouseout", resetPreviews);

    this.draw = function (parent) {
        parent.appendChild(this.elem);
    };
};

var Grid = function (height, width, titleX, titleY) {
    this.titleWidth = width / titleX;
    this.titleHeight = height / titleY;

    this.container = document.createElement("div");
    this.container.id = "grid";
    this.container.style.width = width + "px";
    this.container.style.height = height + "px";

    this.draw = function () {
        document.body.appendChild(this.container);

        var id = 0;
        for (var y = 0; y < titleY; y++) {
            for (var x = 0; x < titleX; x++) {
                var title = new Title(x, y, this.titleHeight, this.titleWidth, id);
                title.draw(this.container);
                id++;
            }
        }
    };
};

var placeShip = function (title) {
    previews = [];
    var titles = [];

    for (var i = 0; i < shipSize; i++) {
        titles.push(Number(title.id) + i * 15);
    }

    var taken = titleTaken(titles);

    if(!taken) {
        for (i = 0; i < shipSize; i++) {
            titleElem = document.getElementById(titles[i]);
            titleElem.style.backgroundColor = "blue";

            shipTitles.push(titles[i]);
        }
    }
};

var previewShip = function (title) {
    var previewTitles = [];

    for (var i = 0; i < shipSize; i++) {
        previewTitles.push(Number(title.id) + i * 15);
    }

    var taken = titleTaken(previewTitles);

    if (!taken) {
        for (i = 0; i < shipSize; i++) {
            var id = Number(title.id) + i * 15;

            titleElem = document.getElementById(id);
            titleElem.style.backgroundColor = "lightblue";

            previews.push(id);
        }
    }
};

var titleTaken = function(titles){
    var taken = false;
    for (i = 0; i < shipSize; i++) {
        if (shipTitles.indexOf(titles[i]) != -1) {
            taken = true;
        }
    }
    return taken;
};

var resetPreviews = function () {
    for (var i = 0; i < previews.length; i++) {
        var elem = document.getElementById(previews[i]);
        elem.style.backgroundColor = "red";
    }
    previews = [];
};

var setShipSize = function (size) {
    shipSize = size;
};

grid = new Grid(960, 960, 15, 15);
grid.draw();

