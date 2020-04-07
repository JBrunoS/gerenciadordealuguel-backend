const connection = require('../database/connection')

module.exports = {
    async index (request, response) {
        const {id} = request.params;
        const predio_id = request.headers.authorization;

        const incidents = await connection('users')
        .join('predios', 'predios.id', '=', 'users.predio_id')
        .where({
            'users.id': id,
            'predio_id': predio_id
        })
        .select('*')
        .first();

        return response.json(incidents);
    }
}