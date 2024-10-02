class Casilla {
    constructor() {
        this.mina = false;
        this.marcada = false;
        this.revelada = false;
        this.minasAlrededor = 0;
    }

    isMina() {
        return this.mina;
    }

    isMarcada() {
        return this.marcada;
    }

    isRevelada() {
        return this.revelada;
    }

    getMinasAlrededor() {
        return this.minasAlrededor;
    }

    colocarMina() {
        this.mina = true;
    }

    marcar() {
        this.marcada = !this.marcada;
    }

    revelar() {
        this.revelada = true;
    }
}