
exports.up = function(knex) {
    return knex.schema.createTable('payment', function(table){
        table.increments().primary();
        table.integer('dia').notNullable();
        table.integer('mes').notNullable();
        table.integer('ano').notNullable();
        table.integer('user_id').notNullable();
        table.integer('predio_id').notNullable();
        table.string('valor').notNullable();
        
    
        table.foreign('predio_id').references('predios.id') 
        table.foreign('user_id').references('users.id')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('payment');
};

  