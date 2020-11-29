const mongoose = require('../../database/connection');

const RacaPetSchema = new mongoose.Schema({
    nome : { type : String, unique : true, required : true },
    descricao : { type : String},
    classe : { type : mongoose.Schema.Types.ObjectId, ref : 'ClassePet', required : true },
    wiki_link : { type : String},
    criadoEm : { type : Date, default : Date.now },
    criadoPor : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
});

const RacaPet = mongoose.model('RacaPet', RacaPetSchema);

module.exports = { RacaPet };