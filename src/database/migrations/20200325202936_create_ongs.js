
exports.up = function(knex) { //criação da tabela (O que quero que seja feito?)
  return knex.schema.createTable('ongs', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf',2).notNullable();
  });
};

exports.down = function(knex) { //voltar atrás
  return knex.schema.dropTable('ongs');
};
