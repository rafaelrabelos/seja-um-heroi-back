const mongoose = require('../../database/connection');

const PetSchema = new mongoose.Schema({
    nome : { type : String, required : true },
    raca : { type : String, lowercase:true, required : true },
    tamanho : { type : Number, required : true },
    descricao : { type : String},
    classe : { type : mongoose.Schema.Types.ObjectId, ref : 'ClassePet' },
    vacinado_v8 : { type : Boolean, default : false},
    vacinado_v10 : { type : Boolean, default : false},
    vacinado_antirrábica: { type : Boolean, default : false},
    heroiDono : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
    criadoEm : { type : Date, default : Date.now },
    criadoPor : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = { Pet };