
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments().primary();
        table.string('nome').notNullable();
        table.string('telefone').notNullable();;
        table.string('whatsapp').notNullable();;
        table.string('RG').notNullable();;
        table.string('CPF').notNullable();;
        table.string('telefone_emprego').notNullable();;
        table.integer('vencimento_aluguel').notNullable();;
        table.integer('numero_quarto').notNullable();
        table.string('tipo');
        table.integer('predio_id');

        table.foreign('predio_id').references('predios.id') 
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
