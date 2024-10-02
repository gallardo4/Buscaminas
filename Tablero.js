class Tablero {
    constructor(filas, columnas, numMinas) {
        this.filas = filas;
        this.columnas = columnas;
        this.numMinas = numMinas;
        this.tablero = [];
        this.primerClick = true;
        this.generarTablero();
        this.colocarMinas();
    }

    generarTablero() {
        for (let i = 0; i < this.filas; i++) {
            this.tablero[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                this.tablero[i][j] = new Casilla();
            }
        }
    }

    colocarMinas() {
        for (let i = 0; i < this.numMinas; i++) {
            let fila = Math.floor(Math.random() * this.filas);
            let columna = Math.floor(Math.random() * this.columnas);
            if (!this.tablero[fila][columna].isMina()) {
                this.tablero[fila][columna].colocarMina();
            } else {
                i--;
            }
        }
    }

    mostrarTablero() {
        tableroHTML.call(this);
    }

    revelarCasilla(fila, columna) {
        casillaHTML.call(this, fila, columna);
    }

    revelarAdyacentes(fila, columna) {
        for (let i = fila - 1; i <= fila + 1; i++) {
            for (let j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < this.filas && j >= 0 && j < this.columnas && !(i === fila && j === columna)) {
                    let casilla = this.tablero[i][j];
                    if (!casilla.isRevelada()) {
                        this.revelarCasilla(i, j);
                    }
                }
            }
        }
    }

    contarMinasAlrededor(fila, columna) {
        let count = 0;
        for (let i = fila - 1; i <= fila + 1; i++) {
            for (let j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < this.filas && j >= 0 && j < this.columnas && !(i === fila && j === columna) && this.tablero[i][j].isMina()) {
                    count++;
                }
            }
        }
        return count;
    }

    verificarVictoria() {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                if (!this.tablero[i][j].isMina() && !this.tablero[i][j].isRevelada()) {
                    return false;
                }
            }
        }
        return true;
    }

    mostrarMensaje(mensaje) {
        alert(mensaje);
    }
    
}