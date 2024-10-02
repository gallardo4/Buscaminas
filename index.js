function getCookie(name) {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

var username = getCookie("username");
var age = getCookie("age");

if (username === "" || age === "") {
    window.location.href = "formulario.html";
}

function tableroHTML() {
    let tablero = document.getElementById("tablero");
    tablero.innerHTML = "";

    for (let i = 0; i < this.filas; i++) {
        let filaDiv = document.createElement("div");
        filaDiv.classList.add("fila");

        for (let j = 0; j < this.columnas; j++) {
            let casillaDiv = document.createElement("div");
            casillaDiv.classList.add("casilla");
            if (this.tablero[i][j].isMina()) {
                casillaDiv.classList.add("mina");
            }
            filaDiv.appendChild(casillaDiv);
        }

        tablero.appendChild(filaDiv);
    }

    tablero.addEventListener("click", e => {
        let casilla = e.target;
        let fila = Array.from(casilla.parentNode.parentNode.children).indexOf(casilla.parentNode);
        let columna = Array.from(casilla.parentNode.children).indexOf(casilla);

        this.revelarCasilla(fila, columna);
    });
}

function casillaHTML(fila, columna) {
    let casilla = this.tablero[fila][columna];
    if (!casilla.isRevelada()) {
        if (this.primerClick) {
            while (casilla.isMina() || this.contarMinasAlrededor(fila, columna) > 0) {
                this.tablero = [];
                this.generarTablero();
                this.colocarMinas();
                casilla = this.tablero[fila][columna];
            }
            this.primerClick = false;
        }

        casilla.revelar();
        let casillaDiv = document.querySelector(`#tablero > div:nth-child(${fila + 1}) > div:nth-child(${columna + 1})`);
        casillaDiv.classList.add("revelada");

        if (casilla.isMina()) {
            casillaDiv.innerText = "💣";
            this.mostrarMensaje("💥 Has perdido. Intenta de nuevo.");
        } else {
            let minasAlrededor = this.contarMinasAlrededor(fila, columna);
            if (minasAlrededor === 0) {
                casillaDiv.style.backgroundColor = "gray";
                this.revelarAdyacentes(fila, columna);
            } else {
                switch (minasAlrededor) {
                    case 1:
                        casillaDiv.classList.add("numero1");
                        break;
                    case 2:
                        casillaDiv.classList.add("numero2");
                        break;
                    case 3:
                        casillaDiv.classList.add("numero3");
                        break;
                    case 4:
                        casillaDiv.classList.add("numero4");
                        break;
                    case 5:
                        casillaDiv.classList.add("numero5");
                        break;
                    case 6:
                        casillaDiv.classList.add("numero6");
                        break;
                    default:
                        break;
                }

                casillaDiv.innerText = minasAlrededor;

                if (this.verificarVictoria()) {
                    this.mostrarMensaje("🎉 ¡Felicidades! Has ganado.");
                }
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn4").addEventListener("click", function () {
        const tablero = new Tablero(4, 4, 4);
        tablero.mostrarTablero();
    });

    document.getElementById("btn6").addEventListener("click", function () {
        const tablero = new Tablero(6, 6, 6);
        tablero.mostrarTablero();
    });

    document.getElementById("btn8").addEventListener("click", function () {
        const tablero = new Tablero(8, 8, 12);
        tablero.mostrarTablero();
    });

    document.getElementById("btn16").addEventListener("click", function () {
        const tablero = new Tablero(16, 16, 50);
        tablero.mostrarTablero();
    });

    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        let casilla = e.target;
        casilla.classList.toggle("bandera");
    });
});