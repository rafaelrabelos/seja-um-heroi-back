const mongoose = require('../../database/connection');

const ClassePetSchema = new mongoose.Schema({
    nome: { type: String, unique: true, required: true },
    descricao: { type: String },
    wiki_link: { type: String },
    criadoEm: { type: Date, default: Date.now },
    criadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const ClassePet = mongoose.model('ClassePet', ClassePetSchema);

module.exports = { ClassePet };