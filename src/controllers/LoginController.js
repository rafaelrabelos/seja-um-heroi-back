const jwt = require('../midleware/jwt');
const bcrypt = require('bcrypt');
const Model = require('../models/usuario');
const email_check = require("email-validator");


async function autentica(req, res) {

    const { email, senha } = req.body;

    if (!email || !senha) {

        return res
            .status(400)
            .send({ status: false, erros: ["Usuário e Senha devem ser informado."] });
    } else {
        let valideRes = [email_check.validate(email) || `Email [${email}] invalido.`]
            .filter((e) => e !== true);

        if (valideRes.length > 0) {
            return res.status(400).send({ status: false, erros: valideRes });
        }
    }

    const user = await Model.User.findOne({ email }).select('+senha +administrador +system_user +root');

    if (!user) {
        return res.status(400).send({ status: false, erros: [`(${email})Usuário não encontrado.`] });
    } else if (!user.senha) {
        return res.status(400).send({ status: false, erros: ["Senha não retornada pela base."] });
    } else if (!await bcrypt.compare(senha, user.senha)) {
        return res.status(400).send({ status: false, erros: ["Senha informada é inválida."] });
    } else {
        user.senha = undefined;
        res.status(200).send({
            status: true,
            data: {
                user: { nome: user.nome, email: user.email },
                privileges: { root: user.root, admin: user.administrador, sys: user.system_user },
                token: jwt.generateToken({ id: user.id, user: user })
            }
        });
    }
}

module.exports = { autentica }