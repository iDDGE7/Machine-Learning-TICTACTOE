var matrixGame = [0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0]
// var matrixGame = [1.0, 1.0, 1.0,
//     1.0, 1.0, 1.0,
//     1.0, 1.0, 0.0]

var statusGame = false;

var circle = '<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M55.959 14.9361C53.2771 10.3416 49.6393 6.70384 45.0446 4.02211C40.4491 1.34052 35.4325 0 29.991 0C24.5499 0 19.5318 1.34052 14.9371 4.02211C10.3422 6.70342 6.70441 10.3412 4.02254 14.9361C1.34053 19.5313 0 24.5494 0 29.99C0 35.4309 1.34094 40.4481 4.02213 45.0436C6.70387 49.6381 10.3417 53.2759 14.9366 55.9579C19.5318 58.6393 24.5495 59.98 29.9904 59.98C35.4313 59.98 40.4496 58.6393 45.0445 55.9579C49.6392 53.2768 53.2768 49.6381 55.9584 45.0436C58.6396 40.4486 59.98 35.4306 59.98 29.99C59.9801 24.5489 58.6396 19.5306 55.959 14.9361ZM48.3829 40.6503C46.4825 43.9043 43.9054 46.4814 40.6514 48.3827C37.3974 50.283 33.844 51.2322 29.9905 51.2322C26.138 51.2322 22.5843 50.283 19.3299 48.3827C16.0759 46.4814 13.4988 43.9043 11.5985 40.6503C9.69772 37.3963 8.74769 33.8428 8.74769 29.99C8.74769 26.1369 9.69813 22.5834 11.5985 19.3294C13.4984 16.0754 16.0762 13.4978 19.3299 11.5976C22.5839 9.69713 26.1375 8.74724 29.9905 8.74724C33.8439 8.74724 37.3974 9.69713 40.6514 11.5976C43.9054 13.4979 46.4827 16.0754 48.3829 19.3294C50.2834 22.5834 51.233 26.1369 51.233 29.99C51.233 33.8428 50.2834 37.3963 48.3829 40.6503Z" fill="white" />' +
    '</svg>';
var cross = '<svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="17.9176" y="25.5597" width="9.85903" height="59.9758" rx="4.92952" transform="rotate(-45 17.9176 25.5597)" fill="#C4C4C4" />' +
    '<rect x="24.889" y="67.969" width="9.85903" height="59.9758" rx="4.92952" transform="rotate(-135 24.889 67.969)" fill="#C4C4C4" />' +
    '</svg>';

$('.cell-game')[0].innerHTML = circle;
$('.cell-game')[4].innerHTML = circle;
$('.cell-game')[8].innerHTML = circle;
$('.cell-game')[2].innerHTML = cross;
$('.cell-game')[6].innerHTML = cross;
$('.cell-game')[0].style.background = "#EDAD4E";
$('.cell-game')[4].style.background = "#EDAD4E";
$('.cell-game')[8].style.background = "#EDAD4E";
$('.cell-game')[2].style.background = "#493DD0";
$('.cell-game')[6].style.background = "#493DD0";

$('.cell-game').click(function (e) {
    if (statusGame == true) {
        var indexUser = $('.cell-game').index(this);
        if (matrixGame[indexUser] == 0) {
            $('.cell-game')[indexUser].innerHTML = cross;
            $('.cell-game')[indexUser].style.background = "#493DD0";
            matrixGame[indexUser] = 2;
        }

        var userW = userWin(matrixGame, indexUser, 2, "ou win");
        if (userW == true) {
            $("#screenWin").css({
                "transform": "translateY(0)"
            })
        }
        if (isFull(matrixGame) == false) {
            machinePosition(indexUser);
        }
    }
})

$(".button-start").click(function () {
    statusGame = true
    resetGame();
})


$(".button-continue").click(function () {
    resetGame();
});

function resetGame() {
    matrixGame = [0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0]

    $('.cell-game').html("");
    $('.cell-game').css({
        "background-color": "#3c3c3c"
    });

    $("#screenLose").css({
        "transform": "translateY(-100%)"
    })
    $("#screenWin").css({
        "transform": "translateY(-100%)"
    })
}

function machinePosition(indexUser) {
    var indexMachine;
    var predictUser = PredictWinUser(indexUser)

    if (predictUser != 9) {
        matrixGame[predictUser] = 1;
        $('.cell-game')[predictUser].innerHTML = circle;
        $('.cell-game')[predictUser].style.background = "#EDAD4E";
        var userW = userWin(matrixGame, predictUser, 1, "Pc win");
        if (userW == true) {
            $("#screenLose").css({
                "transform": "translateY(0)"
            })
        }
    } else {
        $.getJSON({
            url: "/machinePredict",
            data: {
                p0: matrixGame[0],
                p1: matrixGame[1],
                p2: matrixGame[2],
                p3: matrixGame[3],
                p4: matrixGame[4],
                p5: matrixGame[5],
                p6: matrixGame[6],
                p7: matrixGame[7],
                p8: matrixGame[8]
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                indexMachine = data.machinePosition;
                if (matrixGame[indexMachine] == 0) {
                    $('.cell-game')[indexMachine].innerHTML = circle;
                    $('.cell-game')[indexMachine].style.background = "#EDAD4E";
                    matrixGame[indexMachine] = 1;
                    userWin(matrixGame, indexMachine, 1, "Pc win");
                }
            }
        });
    }



}


function userWin(matrixGame, indexUser, value, text) {
    if (indexUser == 0) {
        if (matrixGame[indexUser + 3] == value && matrixGame[indexUser + 6] == value ||
            matrixGame[indexUser + 4] == value && matrixGame[indexUser + 8] == value ||
            matrixGame[indexUser + 1] == value && matrixGame[indexUser + 2] == value) {
            console.log(text);
            return true;
        }
    } else if (indexUser == 1) {
        if (matrixGame[indexUser + 3] == value && matrixGame[indexUser + 6] == value ||
            matrixGame[indexUser - 1] == value && matrixGame[indexUser + 1] == value) {
            console.log(text);
            return true;
        }

    } else if (indexUser == 2) {
        if (matrixGame[indexUser + 3] == value && matrixGame[indexUser + 6] == value ||
            matrixGame[indexUser + 2] == value && matrixGame[indexUser + 4] == value ||
            matrixGame[indexUser - 1] == value && matrixGame[indexUser - 2] == value) {
            console.log(text);
            return true;
        }

    } else if (indexUser == 3) {
        if (matrixGame[indexUser + 3] == value && matrixGame[indexUser - 3] == value ||
            matrixGame[indexUser + 1] == value && matrixGame[indexUser + 2] == value) {
            console.log(text);
            return true;
        }
    } else if (indexUser == 4) {
        if (matrixGame[indexUser - 3] == value && matrixGame[indexUser + 3] == value ||
            matrixGame[indexUser - 1] == value && matrixGame[indexUser + 1] == value ||
            matrixGame[indexUser - 4] == value && matrixGame[indexUser + 4] == value ||
            matrixGame[indexUser - 2] == value && matrixGame[indexUser + 2] == value) {
            console.log(text);
            return true;
        }
    } else if (indexUser == 5) {
        if (matrixGame[indexUser + 3] == value && matrixGame[indexUser - 3] == value ||
            matrixGame[indexUser - 1] == value && matrixGame[indexUser - 2] == value) {
            console.log(text);
            return true;
        }

    } else if (indexUser == 6) {
        if (matrixGame[indexUser - 3] == value && matrixGame[indexUser - 6] == value ||
            matrixGame[indexUser - 2] == value && matrixGame[indexUser - 4] == value ||
            matrixGame[indexUser + 1] == value && matrixGame[indexUser + 2] == value) {
            console.log(text);
            return true;
        }

    } else if (indexUser == 7) {
        if (matrixGame[indexUser - 3] == value && matrixGame[indexUser - 6] == value ||
            matrixGame[indexUser - 1] == value && matrixGame[indexUser + 1] == value) {
            console.log(text);
            return true;
        }

    } else if (indexUser == 8) {
        if (matrixGame[indexUser - 1] == value && matrixGame[indexUser - 2] == value ||
            matrixGame[indexUser - 4] == value && matrixGame[indexUser - 8] == value ||
            matrixGame[indexUser - 3] == value && matrixGame[indexUser - 6] == value) {
            console.log(text);
            return true;
        }
    }
}

function isFull(matrixGame) {
    var full = true;
    for (var i = 0; i < matrixGame.length; i++) {
        if (matrixGame[i] == 0.0) {
            full = false;
            break;
        }
    }
    return full
}


function PredictWinUser(indexUser) {
    valueIndex = 9
    if (indexUser == 0) {
        if (matrixGame[indexUser + 1] == 2.0 && matrixGame[indexUser + 2] == 0.0) { valueIndex = indexUser + 2 }
        else if (matrixGame[indexUser + 1] == 0.0 && matrixGame[indexUser + 2] == 2.0) { valueIndex = indexUser + 1 }
        else if (matrixGame[indexUser + 3] == 2.0 && matrixGame[indexUser + 6] == 0.0) { valueIndex = indexUser + 6 }
        else if (matrixGame[indexUser + 3] == 0.0 && matrixGame[indexUser + 6] == 2.0) { valueIndex = indexUser + 3 }
        else if (matrixGame[indexUser + 4] == 2.0 && matrixGame[indexUser + 8] == 0.0) { valueIndex = indexUser + 8 }
        else if (matrixGame[indexUser + 4] == 0.0 && matrixGame[indexUser + 8] == 2.0) { valueIndex = indexUser + 4 }
    } else if (indexUser == 1) {
        if (matrixGame[indexUser + 1] == 2.0 && matrixGame[indexUser - 1] == 0.0) { valueIndex = indexUser - 1 }
        else if (matrixGame[indexUser + 1] == 0.0 && matrixGame[indexUser - 1] == 2.0) { valueIndex = indexUser + 1 }
        else if (matrixGame[indexUser + 3] == 2.0 && matrixGame[indexUser + 6] == 0.0) { valueIndex = indexUser + 6 }
        else if (matrixGame[indexUser + 3] == 0.0 && matrixGame[indexUser + 6] == 2.0) { valueIndex = indexUser + 3 }
    } else if (indexUser == 2) {
        if (matrixGame[indexUser - 1] == 2.0 && matrixGame[indexUser - 2] == 0.0) { valueIndex = indexUser - 2 }
        else if (matrixGame[indexUser - 1] == 0.0 && matrixGame[indexUser - 2] == 2.0) { valueIndex = indexUser - 1 }
        else if (matrixGame[indexUser + 3] == 2.0 && matrixGame[indexUser + 6] == 0.0) { valueIndex = indexUser + 6 }
        else if (matrixGame[indexUser + 3] == 0.0 && matrixGame[indexUser + 6] == 2.0) { valueIndex = indexUser + 3 }
        else if (matrixGame[indexUser + 2] == 2.0 && matrixGame[indexUser + 4] == 0.0) { valueIndex = indexUser + 4 }
        else if (matrixGame[indexUser + 2] == 0.0 && matrixGame[indexUser + 4] == 2.0) { valueIndex = indexUser + 2 }
    } else if (indexUser == 3) {
        if (matrixGame[indexUser + 3] == 2.0 && matrixGame[indexUser - 3] == 0.0) { valueIndex = indexUser - 3 }
        else if (matrixGame[indexUser + 3] == 0.0 && matrixGame[indexUser - 3] == 2.0) { valueIndex = indexUser + 3 }
        else if (matrixGame[indexUser + 1] == 2.0 && matrixGame[indexUser + 2] == 0.0) { valueIndex = indexUser + 2 }
        else if (matrixGame[indexUser + 1] == 0.0 && matrixGame[indexUser + 2] == 2.0) { valueIndex = indexUser + 1 }
    } else if (indexUser == 4) {
        if (matrixGame[indexUser + 3] == 2.0 && matrixGame[indexUser - 3] == 0.0) { valueIndex = indexUser - 3 }
        else if (matrixGame[indexUser + 3] == 0.0 && matrixGame[indexUser - 3] == 2.0) { valueIndex = indexUser + 3 }
        else if (matrixGame[indexUser + 1] == 2.0 && matrixGame[indexUser - 1] == 0.0) { valueIndex = indexUser - 1 }
        else if (matrixGame[indexUser + 1] == 0.0 && matrixGame[indexUser - 1] == 2.0) { valueIndex = indexUser + 1 }
        else if (matrixGame[indexUser + 2] == 2.0 && matrixGame[indexUser - 2] == 0.0) { valueIndex = indexUser - 2 }
        else if (matrixGame[indexUser + 2] == 0.0 && matrixGame[indexUser - 2] == 2.0) { valueIndex = indexUser + 2 }
        else if (matrixGame[indexUser + 4] == 2.0 && matrixGame[indexUser - 4] == 0.0) { valueIndex = indexUser - 4 }
        else if (matrixGame[indexUser + 4] == 0.0 && matrixGame[indexUser - 4] == 2.0) { valueIndex = indexUser + 4 }
    } else if (indexUser == 5) {
        if (matrixGame[indexUser + 3] == 2.0 && matrixGame[indexUser - 3] == 0.0) { valueIndex = indexUser - 3 }
        else if (matrixGame[indexUser + 3] == 0.0 && matrixGame[indexUser - 3] == 2.0) { valueIndex = indexUser + 3 }
        else if (matrixGame[indexUser - 1] == 2.0 && matrixGame[indexUser - 2] == 0.0) { valueIndex = indexUser - 2 }
        else if (matrixGame[indexUser - 1] == 0.0 && matrixGame[indexUser - 2] == 2.0) { valueIndex = indexUser - 1 }
    } else if (indexUser == 6) {
        if (matrixGame[indexUser + 1] == 2.0 && matrixGame[indexUser + 2] == 0.0) { valueIndex = indexUser + 2 }
        else if (matrixGame[indexUser + 1] == 0.0 && matrixGame[indexUser + 2] == 2.0) { valueIndex = indexUser + 1 }
        else if (matrixGame[indexUser - 3] == 2.0 && matrixGame[indexUser - 6] == 0.0) { valueIndex = indexUser - 6 }
        else if (matrixGame[indexUser - 3] == 0.0 && matrixGame[indexUser - 6] == 2.0) { valueIndex = indexUser - 3 }
        else if (matrixGame[indexUser + 4] == 2.0 && matrixGame[indexUser + 8] == 0.0) { valueIndex = indexUser + 8 }
        else if (matrixGame[indexUser + 4] == 0.0 && matrixGame[indexUser + 8] == 2.0) { valueIndex = indexUser + 4 }
    } else if (indexUser == 7) {
        if (matrixGame[indexUser + 1] == 2.0 && matrixGame[indexUser - 1] == 0.0) { valueIndex = indexUser - 1 }
        else if (matrixGame[indexUser + 1] == 0.0 && matrixGame[indexUser - 1] == 2.0) { valueIndex = indexUser + 1 }
        else if (matrixGame[indexUser - 3] == 2.0 && matrixGame[indexUser - 6] == 0.0) { valueIndex = indexUser - 6 }
        else if (matrixGame[indexUser - 3] == 0.0 && matrixGame[indexUser - 6] == 2.0) { valueIndex = indexUser - 3 }
    } else if (indexUser == 8) {
        if (matrixGame[indexUser - 1] == 2.0 && matrixGame[indexUser - 2] == 0.0) { valueIndex = indexUser - 2 }
        else if (matrixGame[indexUser - 1] == 0.0 && matrixGame[indexUser - 2] == 2.0) { valueIndex = indexUser - 1 }
        else if (matrixGame[indexUser - 3] == 2.0 && matrixGame[indexUser - 6] == 0.0) { valueIndex = indexUser - 6 }
        else if (matrixGame[indexUser - 3] == 0.0 && matrixGame[indexUser - 6] == 2.0) { valueIndex = indexUser - 3 }
        else if (matrixGame[indexUser - 4] == 2.0 && matrixGame[indexUser - 8] == 0.0) { valueIndex = indexUser - 8 }
        else if (matrixGame[indexUser - 4] == 0.0 && matrixGame[indexUser - 8] == 2.0) { valueIndex = indexUser - 4 }
    }
    return valueIndex
}
