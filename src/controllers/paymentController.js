const connection = require('../database/connection')

module.exports = {
    async index (request, response) {
        const {id, year} = request.params;
        const predio_id = request.headers.authorization;

        const incidents = await connection('payment')
        .join('predios', 'predios.id', '=', 'payment.predio_id')
        .join('users', 'users.id', '=', 'payment.user_id')
        .where({
            'payment.user_id': id,
            'payment.predio_id': predio_id,
            'payment.ano': year
        })
        .select('payment.*')
        

        return response.json(incidents);
    },

    async create(request, response) {
        const {id} = request.params;
        const predio_id = request.headers.authorization;
        const { dia, mes, ano, valor} = request.body;

        const payment = await connection('payment')
        .where({
            'user_id': id,
            'predio_id': predio_id,
            'mes': mes,
            'ano': ano,
        })
        .select('*')
        .first();

        if (!payment) {
            await connection('payment')
            .insert({
                dia, 
                mes,
                ano, 
                user_id: id,
                predio_id,
                valor, 
            })

            return response.status(204).send();

        } else {
            return response.status(401).send();
        }
    }


}