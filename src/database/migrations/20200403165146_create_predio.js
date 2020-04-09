
exports.up = function(knex) {
    return knex.schema.createTable('predios', function (table) {
        table.increments();
        table.string('endereco');
        table.string('qtd_quartos');
      })
};

exports.down = function(knex) {
   return knex.schema.dropTable('predio');
};
