// 10-error-handling — Ejercicio 2
// Crear clase ErrorAPI(message, status); en catch comprobar instanceof

class ErrorAPI extends Error {
    constructor(message, status) {
        super(message)
        this.name= "ErrorAPI";
        this.status = status
    }
}

try {
    // ...
} catch (e) {
    if( e instanceof ErrorAPI) {
        console.error("Status:", e.status)
    } else {
        throw e;
    }
}