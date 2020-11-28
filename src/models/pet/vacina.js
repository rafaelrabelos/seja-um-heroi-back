const mongoose = require('../../database/connection');

const VacinaPetSchema = new mongoose.Schema({
    nome : { type : String, required : true },
    descricao : { type : String },
    dose : { type : String, required : true },
    composicao : { type : String },
    classe_pets : { type : mongoose.Schema.Types.ObjectId, ref : 'ClassePet', required : true },
    criadoEm : { type : Date, default : Date.now },
    criadoPor : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
});

const VacinaPet = mongoose.model('VacinaPet', VacinaPetSchema);

module.exports = { VacinaPet };