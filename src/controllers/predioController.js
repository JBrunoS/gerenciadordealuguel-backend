const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const predios = await connection('predios').select('*');

        return response.json(predios);
    },

    async create(request, response){
        const {endereco, qtd_quartos} = request.body;

        console.log({endereco});

        await connection('predios').insert({
            endereco,
            qtd_quartos,
        });

        return response.status(204).send();

    }
}