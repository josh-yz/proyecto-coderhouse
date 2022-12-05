const fs = require("fs")
const { promisify } = require('util')


//Convertir callbacks a promesas con Promisify
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)



class Connection {

    constructor(fileName) {
        this.fileName = `${__dirname}/temp/${fileName}`
    }

    existsFile() { // Saber si el Archivo existe
        return fs.existsSync(this.fileName); // return boolean
    }

    async save(data) {
        try {
            if (!this.existsFile()) {
                //Si no existe el archivo crea un registro con la id 1
                await writeFileAsync(this.fileName, JSON.stringify([data]));
                return data;
            } else {
                const arr = await this.getAll();
                arr.push(data);
                await writeFileAsync(this.fileName, JSON.stringify(arr));
                return data;
            }
        } catch (error) {
            throw Error('Error al guardar 😐');
        }
    }

    async getAll() {
        try {
            let data = await readFileAsync(this.fileName);
            let arr = JSON.parse(data);
            return arr;
        } catch (error) {
            // si el archivo existe, pero esta vacio el archivo se returna un array vacio
            return [];
        }
    }
    async update(data) {
        try {
            await writeFileAsync(this.fileName, JSON.stringify(data));
            return true
        } catch (error) {
            throw Error('Error al buscar producto 😫');
        }
    }

}

module.exports = { Connection }