var fadeSpeed = 200

var systems;

var units;
var unitTotals;

var unitTypes = [
    [
        [
            {
                name: "TIE Fighter",
                image: "tie-fighter.png"
            },
            {
                name: "TIE Striker",
                image: "tie-striker.png"
            }
        ],
        [
            {
                name: "Assault Carrier",
                image: "assault-carrier.png"
            }
        ],
        [
            {
                name: "Star Destroyer",
                image: "star-destroyer.png"
            }
        ],
        [
            {
                name: "Stormtrooper",
                image: "stormtrooper.png"
            },
            {
                name: "Assault Tank",
                image: "assault-tank.png"
            }
        ],
        [
            {
                name: "AT-ST",
                image: "at-st.png"
            },
            {
                name: "Shield Bunker",
                image: "shield-bunker.png"
            }
        ],
        [
            {
                name: "AT-AT",
                image: "at-at.png"
            }
        ]
    ],
    [
        [
            {
                name: "X-Wing",
                image: "x-wing.png"
            },
            {
                name: "Y-Wing",
                image: "y-wing.png"
            },
            {
                name: "U-Wing",
                image: "u-wing.png"
            },
            {
                name: "Rebel Transport",
                image: "rebel-transport.png"
            }
        ],
        [
            {
                name: "Corellian Corvette",
                image: "corellian-corvette.png"
            },
            {
                name: "Nebulon-B Frigate",
                image: "nebulon-b-frigate.png"
            }
        ],
        [
            {
                name: "Mon Calamari Cruiser",
                image: "mon-calamari-cruiser.png"
            }
        ],
        [
            {
                name: "Rebel Trooper",
                image: "rebel-trooper.png"
            },
            {
                name: "Rebel Vanguard",
                image: "rebel-vanguard.png"
            }
        ],
        [
            {
                name: "Airspeeder",
                image: "airspeeder.png"
            },
            {
                name: "Golan Arms Turret",
                image: "golan-arms-turret.png"
            }
        ],
        [
            {
                name: "Shield Generator",
                image: "shield-generator.png"
            },
            {
                name: "Ion Cannon",
                image: "ion-cannon.png"
            }
        ]
    ]
]

var dialogVisible = false;
var recalculateBuild = false;
var scrollPosition = 0;

function initSystems() {
    systems = [
        {
            name: "Alderaan",
            loyalty: 0,
        },
        {
            name: "Bespin",
            loyalty: 0,
        },
        {
            name: "Bothawui",
            loyalty: 0,
        },
        {
            name: "Cato Nemoidia",
            loyalty: 0,
        },
        {
            name: "Corellia",
            loyalty: 0,
        },
        {
            name: "Coruscant",
            loyalty: 0,
        },
        {
            name: "Felucia",
            loyalty: 0,
        },
        {
            name: "Geonosis",
            loyalty: 0,
        },
        {
            name: "Kashyyyk",
            loyalty: 0,
        },
        {
            name: "Kessel",
            loyalty: 0,
        },
        {
            name: "Malastare",
            loyalty: 0,
        },
        {
            name: "Mandalore",
            loyalty: 0,
        },
        {
            name: "Mon Calamari",
            loyalty: 0,
        },
        {
            name: "Mustafar",
            loyalty: 0,
        },
        {
            name: "Mygeeto",
            loyalty: 0,
        },
        {
            name: "Naboo",
            loyalty: 0,
        },
        {
            name: "Nal Hutta",
            loyalty: 0,
        },
        {
            name: "Ord Mantell",
            loyalty: 0,
        },
        {
            name: "Rebel Base",
            loyalty: 0,
        },
        {
            name: "Rodia",
            loyalty: 0,
        },
        {
            name: "Ryloth",
            loyalty: 0,
        },
        {
            name: "Saleucami",
            loyalty: 0,
        },
        {
            name: "Sullust",
            loyalty: 0,
        },
        {
            name: "Toydaria",
            loyalty: 0,
        },
        {
            name: "Utapau",
            loyalty: 0,
        }
    ];
}

function initUnits() {
    units = [
        [
            {
                blueTriangle: 0,
                blueCircle: 0,
                blueSquare: 0,
                orangeTriangle: 0,
                orangeCircle: 0,
                orangeSquare: 0
            },
            {
                blueTriangle: 0,
                blueCircle: 0,
                blueSquare: 0,
                orangeTriangle: 0,
                orangeCircle: 0,
                orangeSquare: 0
            },
            {
                blueTriangle: 0,
                blueCircle: 0,
                blueSquare: 0,
                orangeTriangle: 0,
                orangeCircle: 0,
                orangeSquare: 0
            }
        ],
        [
            {
                blueTriangle: 0,
                blueCircle: 0,
                blueSquare: 0,
                orangeTriangle: 0,
                orangeCircle: 0,
                orangeSquare: 0
            },
            {
                blueTriangle: 0,
                blueCircle: 0,
                blueSquare: 0,
                orangeTriangle: 0,
                orangeCircle: 0,
                orangeSquare: 0
            },
            {
                blueTriangle: 0,
                blueCircle: 0,
                blueSquare: 0,
                orangeTriangle: 0,
                orangeCircle: 0,
                orangeSquare: 0
            }
        ]
    ];

    unitTotals = [0, 0];
}

function getUnitTotal(build) {
    return build.blueTriangle + build.blueCircle + build.blueSquare + build.orangeTriangle + build.orangeCircle + build.orangeSquare;
}

function newGame() {
    $('div.system').removeClass('loyal-empire')
        .removeClass('loyal-subj')
        .removeClass('loyal-rebel')
        .data('loyalty', 0);

    $('button.loyal').removeClass('active');

    initSystems();

    getSystemByName('Coruscant').loyalty = 1;
    toggleLoyalty($('div.system[data-name="Coruscant"] > div.loyalty > button.loyal-empire'));

    getSystemByName('Rebel Base').loyalty = 3;
    toggleLoyalty($('div.system[data-name="Rebel Base"] > div.loyalty > button.loyal-rebel'));

    updateLoyaltyCount();

    recalculateBuild = true;
}

function loadGame() {
    var gameData = localStorage.getItem('gameData');

    if (gameData) {
        systems = JSON.parse(atob(gameData));

        var i;
        for(i = 0; i < systems.length; i++) {
            if (systems[i].loyalty > 0) {
                var selector = 'div.system[data-name="' + systems[i].name + '"] > div.loyalty > button.';

                switch(systems[i].loyalty) {
                    case 1:
                        selector += 'loyal-empire';
                        break;
                    case 2:
                        selector += 'loyal-subj';
                        break;
                    case 3:
                        selector += 'loyal-rebel';
                        break;
                }
                
                toggleLoyalty($(selector));
            }
        }
    }
    else {
        newGame();
    }

    updateLoyaltyCount();

    recalculateBuild = true;
}

function saveGame() {
    localStorage.setItem('gameData', btoa(JSON.stringify(systems)));

    recalculateBuild = true;
}

function showDialog() {
    dialogVisible = true;
    $('div.dialog').fadeIn(fadeSpeed);
    $('body').addClass('modal-open');
}

function hideDialog() {
    dialogVisible = false;

    $('div.dialog').fadeOut(fadeSpeed);
    
    $('body').removeClass('modal-open');
}

function showSystems() {
    $('#build').fadeOut(fadeSpeed / 2, function () {
        $('#systems').fadeIn(fadeSpeed / 2);

        document.documentElement.scrollTop = document.body.scrollTop = scrollPosition;
    });
}

function showBuild() {
    if (recalculateBuild) {
        calculateBuild();
    }

    scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    $('#systems').fadeOut(fadeSpeed / 2, function() {
        $('#build').fadeIn(fadeSpeed / 2);

        document.documentElement.scrollTop = document.body.scrollTop = 0;
    });
}

function toggleLoyalty(button) {
    $(button).toggleClass('active');
    $(button).siblings('.loyal').removeClass('active');

    var system = $(button).closest('div.system');

    $(system).removeClass('loyal-empire')
        .removeClass('loyal-subj')
        .removeClass('loyal-rebel')
        .data('loyalty', 0);

    if ($(button).hasClass('active')) {
        if ($(button).hasClass('loyal-empire')) {
            $(system).addClass('loyal-empire')
                .data('loyalty', 1);
        }
        else if ($(button).hasClass('loyal-subj')) {
            $(system).addClass('loyal-subj')
                .data('loyalty', 2);
        }
        else if ($(button).hasClass('loyal-rebel')) {
            $(system).addClass('loyal-rebel')
                .data('loyalty', 3);
        }
    }
}

function updateLoyaltyCount() {
    $('#system-list-count-empire').html(systems.reduce(countLoyaltyEmpire, 0));
    $('#system-list-count-rebel').html(systems.reduce(countLoyaltyRebel, 0));
}

function countLoyaltyEmpire(a, b) {
    if (b.loyalty == 1 || b.loyalty == 2)
    {
        return a + 1;
    }
    return a;
}

function countLoyaltyRebel(a, b) {
    if (b.loyalty == 3)
    {
        return a + 1;
    }
    return a;
}

function updateSystem(button) {
    var system = $(button).closest('div.system');
    systems[$(system).data('index')].loyalty = $(system).data('loyalty');
}

function getSystemByName(name) {
    var i;
    for (i = 0; i < systems.length; i++) {
        if (systems[i].name === name) {
            return systems[i];
        }
    }

    return null;
}

function calculateBuild() {
    initUnits();

    var i;
    for (i = 0; i < systems.length; i++) {
        if (systems[i].loyalty > 0) {
            var faction = (systems[i].loyalty <= 2) ? 0 : 1;
            switch(systems[i].name) {
                case 'Alderaan':
                case 'Coruscant':
                case 'Felucia':
                case 'Kessel':
                case 'Malastare':
                case 'Rodia':
                case 'Ryloth':
                    units[faction][0].orangeTriangle++;
                    break;
                case 'Bespin':
                case 'Bothawui':
                case 'Saleucami':
                    units[faction][0].orangeCircle++;
                    break;
                case 'Cato Nemoidia':
                    units[faction][1].blueTriangle++;
                    if (systems[i].loyalty != 2) {
                        units[faction][1].orangeCircle++;
                    }
                    break;
                case 'Corellia':
                case 'Mon Calamari':
                    units[faction][2].blueTriangle++;
                    if (systems[i].loyalty != 2) {
                        units[faction][2].blueSquare++;
                    }
                    break;
                case 'Geonosis':
                case 'Mygeeto':
                    units[faction][1].blueTriangle++;
                    if (systems[i].loyalty != 2) {
                        units[faction][1].orangeSquare++;
                    }
                    break;
                case 'Kashyyyk':
                    units[faction][0].orangeTriangle++;
                    if (systems[i].loyalty != 2) {
                        units[faction][0].orangeTriangle++;
                    }
                    break;
                case 'Mandalore':
                case 'Naboo':
                case 'Nal Hutta':
                case 'Rebel Base':
                    units[faction][0].orangeTriangle++;
                    if (systems[i].loyalty != 2) {
                        units[faction][0].blueTriangle++;
                    }
                    break;
                case 'Mustafar':
                    units[faction][1].blueTriangle++;
                    if (systems[i].loyalty != 2) {
                        units[faction][1].blueCircle++;
                    }
                    break;
                case 'Ord Mantell':
                    units[faction][1].blueCircle++;
                    if (systems[i].loyalty != 2) {
                        units[faction][1].orangeCircle++;
                    }
                    break;
                case 'Sullust':
                    units[faction][1].orangeTriangle++;
                    if (systems[i].loyalty != 2) {
                        units[faction][1].orangeSquare++;
                    }
                    break;
                case 'Toydaria':
                    units[faction][1].blueCircle++;
                    break;
                case 'Utapau':
                    units[faction][2].blueCircle++;
                    if (systems[i].loyalty != 2) {
                        units[faction][2].blueSquare++;
                    }
                    break;
            }
        }
    }

    printUnits(units[0][0], $('#empire-build-1-units-content'), 0);
    printUnits(units[0][1], $('#empire-build-2-units-content'), 0);
    printUnits(units[0][2], $('#empire-build-3-units-content'), 0);
    printUnits(units[1][0], $('#rebel-build-1-units-content'), 1);
    printUnits(units[1][1], $('#rebel-build-2-units-content'), 1);
    printUnits(units[1][2], $('#rebel-build-3-units-content'), 1);

    $('#build-list-count-empire').html(unitTotals[0]);
    $('#build-list-count-rebel').html(unitTotals[1]);

    recalculateBuild = false;
}

function printUnits(build, element, faction) {

    var unitTotal = getUnitTotal(build);
    unitTotals[faction] += unitTotal;

    if (unitTotal > 0) {
        var output = '';

        var countStr = '{count}';
        var contentStr = '{content}';

        var row = '<tr class="build-list-units-row" onclick="toggleUnitRow(this);"><td class="build-list-units-count">' + countStr + '</td><td class="build-list-units-content">' + contentStr + '</td></tr>';

        if (build.blueTriangle > 0) {
            output += row.replace(countStr, build.blueTriangle + 'x').replace(contentStr, printUnit(faction, 0));
        }
        if (build.blueCircle > 0) {
            output += row.replace(countStr, build.blueCircle + 'x').replace(contentStr, printUnit(faction, 1));
        }
        if (build.blueSquare > 0) {
            output += row.replace(countStr, build.blueSquare + 'x').replace(contentStr, printUnit(faction, 2));
        }
        if (build.orangeTriangle > 0) {
            output += row.replace(countStr, build.orangeTriangle + 'x').replace(contentStr, printUnit(faction, 3));
        }
        if (build.orangeCircle > 0) {
            output += row.replace(countStr, build.orangeCircle + 'x').replace(contentStr, printUnit(faction, 4));
        }
        if (build.orangeSquare > 0) {
            output += row.replace(countStr, build.orangeSquare + 'x').replace(contentStr, printUnit(faction, 5));
        }

        $(element).html(output);
    }
    else {
        $(element).html('<tr><td><i>No units</i></td></tr>');
    }
}

function printUnit(faction, tier)
{
    var names = '';

    var i;
    for (i = 0; i < unitTypes[faction][tier].length; i++) {
        names += '<img class="unit' + ((faction == 1 && tier == 0) ? ' unit-small' : '') + '" src="img/unit/' + unitTypes[faction][tier][i].image + '" alt="' + unitTypes[faction][tier][i].name + '"/>';
    }

    return names;
}

function toggleUnitRow(rowElement)
{
    if ($(rowElement).hasClass('faded'))
    {
        $(rowElement).removeClass('faded');
        $(rowElement).addClass('unfaded');
    }
    else
    {
        $(rowElement).addClass('faded');
        $(rowElement).removeClass('unfaded');
    }
}

function setKeyPressEvents() {
    $(document).keyup(function(e) {
        var key = e.which || e.keyCode || 0;

        // escape or n
        if (key == 27 || (key == 78 && dialogVisible)) {
            hideDialog();
        }
        // y
        else if (key == 89 && dialogVisible) {
            newGame();
            hideDialog();
        }
    });
}

function preloadImages() {
    var images = new Array()

    var c = 0;
    var i;
    var j;
    var k;

    for (i = 0; i < unitTypes.length; i++) {
        for (j = 0; j < unitTypes[i].length; j++) {
            for (k = 0; k < unitTypes[i][j].length; k++) {
                images[c] = new Image(50,50);
                images[c].src = 'img/unit/' + unitTypes[i][j][k].image;
                c++;
            }
        }
    }
}

$(function() {
    loadGame();

    $('#btnShowBuild').click(showBuild);
    $('#btnShowSystems').click(showSystems);

    $('#btnNewGame').click(showDialog);
    $('div.dialog').click(hideDialog);
    $('div.dialog-content').click(function (e) {
        e.stopPropagation();
    })
    $('#btnDialogYes').click(newGame);
    $('div.dialog-buttons button').click(hideDialog);

    setKeyPressEvents();
    
    $('button.loyal').click(function () {
        toggleLoyalty(this);
        updateSystem(this);
        updateLoyaltyCount();
        saveGame();
    });

    preloadImages();
});