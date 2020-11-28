const mongoose = require('../../database/connection');

const ClassePetSchema = new mongoose.Schema({
    nome : { type : String, required : true },
    descricao : { type : String},
    wiki_link : { type : String},
    criadoEm : { type : Date, default : Date.now },
    criadoPor : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
});

const ClassePet = mongoose.model('ClassePet', ClassePetSchema);

module.exports = { ClassePet };