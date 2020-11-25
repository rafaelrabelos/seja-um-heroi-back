const mongoose = require('../database/connection');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    nome : { type : String, required : true },
    email : { type : String, unique : true, lowercase:true, required : true },
    senha : { type : String, select: false, required : true },
    administrador : { type : Boolean, default : false},
    criadoEm : { type : Date, default : Date.now },
    criadoPor : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
});

UserSchema.pre('save', async function(next){

    this.senha = await bcrypt.hash(this.senha, 10 );
    next();

 });

const User = mongoose.model('User', UserSchema);

module.exports = User;