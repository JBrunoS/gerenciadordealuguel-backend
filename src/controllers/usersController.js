const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const predio_id = request.headers.authorization;

        const users = await connection('users')
        .where('predio_id', predio_id)
        .select('*')
        .orderBy('numero_quarto');

        return response.json(users);
    },

    async create (request, response) {
        const {
            nome, 
            telefone, 
            whatsapp, 
            RG, 
            CPF, 
            telefone_emprego, 
            vencimento_aluguel,
            numero_quarto,
            tipo } = request.body;

        const predio_id = request.headers.authorization;
        
        const quarto = await connection('users')
        .where({
            'numero_quarto': numero_quarto,
            'predio_id': predio_id
        })
        .select('*')
        .first();
        

        if (!quarto) {
            await connection('users').insert({
                nome, 
                telefone, 
                whatsapp, 
                RG, 
                CPF, 
                telefone_emprego, 
                vencimento_aluguel, 
                numero_quarto,
                tipo,
                predio_id
            });
            
            return response.json({nome});
        }

        return response.status(400).json({ error : 'Já existe alguém nesse quarto'});
            

            
    },

    async delete(request, response) {
        const { id } = request.params;
        const predio_id = request.headers.authorization;

        const users = await connection('users')
        .where('id', id)
        .select('predio_id')
        .first();

        if (users.predio_id != predio_id) {
            return response.status(401).json({ error: 'Deu merda, hein!' })
        }

        await connection('users').where('id', id).delete();

        return response.status(204).send();
    },

    async put(request, response){
        const {id} = request.params;
        const predio_id = request.headers.authorization;

        const {
            nome, 
            telefone, 
            whatsapp, 
            RG, 
            CPF, 
            telefone_emprego, 
            vencimento_aluguel, 
            numero_quarto,
            tipo } = request.body;

        const user = await connection('users')
        .where({
            'id': id,
            'predio_id': predio_id
        })
        .update({
            'nome': nome,
            'telefone' : telefone,
            'whatsapp' : whatsapp,
            'RG' : RG,
            'CPF' : CPF, 
            'telefone_emprego' : telefone_emprego,
            'vencimento_aluguel' : vencimento_aluguel,
            'numero_quarto' : numero_quarto,
            'tipo' : tipo
        })
        if (!user) {
            return response.status(401).json({ error: 'Usuário não encontrado, hein!' })
        }
        return response.status(204).send();

    }
}