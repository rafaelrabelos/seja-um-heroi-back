const mongoose = require('../../database/connection');

const RacaPetSchema = new mongoose.Schema({
    nome : { type : String, required : true },
    descricao : { type : String},
    classe : { type : mongoose.Schema.Types.ObjectId, ref : 'ClassePet' },
    wiki_link : { type : String},
    criadoEm : { type : Date, default : Date.now },
    criadoPor : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
});

const RacaPet = mongoose.model('RacaPet', RacaPetSchema);

module.exports = { RacaPet };