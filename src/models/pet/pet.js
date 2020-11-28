const mongoose = require('../../database/connection');

const PetSchema = new mongoose.Schema({
    nome : { type : String, required : true },
    raca : { type : mongoose.Schema.Types.ObjectId, ref : 'RacaPet', required : true },
    tamanho : { type : Number, required : true },
    descricao : { type : String},
    classe : { type : mongoose.Schema.Types.ObjectId, ref : 'ClassePet', required : true },
    vacinas : { type : mongoose.Schema.Types.ObjectId, ref : 'VacinaPet'},
    heroiDono : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
    criadoEm : { type : Date, default : Date.now },
    criadoPor : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = { Pet };