const Model = require("../models/usuario");
const ModelPet = require("../models/pet/pet");
const password_check = require("password-validator");
const secure = require("../libs/secure");

async function createUser(req, res) {
  const { nome, email, senha } = req.body;

  try {
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .send({
          status: false,
          erros: [`Atributos obrigatorios: nome, email, senha.`],
        });
    }

    if (await Model.User.findOne({ email })) {
      return res
        .status(400)
        .send({ status: false, erros: ["Dados já existem no sistema"] });
    }

    const user = await Model.User.create({
      ...req.body,
      criadoPor: req.decodedJWT.id || undefined,
    });

    return res.status(200).send({ status: true, data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function getUsers(req, res) {
  try {
    const users = await Model.User.find()
      .select(`${await selectPermissions(req)}`)
      .populate("criadoPor");

    return res.status(200).send({ status: true, data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function getSelfUser(req, res) {
  try {
    const users = await Model.User.findById(req.decodedJWT.id)
      .select(`${await selectPermissions(req)}`)
      .populate("criadoPor");

    return res.status(200).send({ status: true, data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function getUser(req, res) {
  try {
    const users = await Model.User.findById(
      req.params.usuarioId || req.decodedJWT.id
    )
      .select(`${await selectPermissions(req)}`)
      .populate("criadoPor");

    return res.status(200).send({ status: true, data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function getUserPets(req, res) {
  try {
    const users = await ModelPet.Pet.find({
      heroiDono: req.params.usuarioId,
    }).populate("heroiDono");

    return res.status(200).send({ status: true, data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function updateUser(req, res) {
  const { nome, sobrenome, email } = req.body;

  try {
    if (!nome || !sobrenome || !email) {
      return res
        .status(400)
        .send({
          status: false,
          erros: ["Ha campo(s) que devem ser informados!"],
        });
    }

    const usuarioId = req.params.usuarioId || req.decodedJWT.id;

    const user = await Model.User.findById(usuarioId);

    if (!user) {
      return res
        .status(400)
        .send({ status: false, erros: ["Usuario nao localizado."] });
    }

    const userUpdated = await Model.User.findByIdAndUpdate(
      usuarioId,
      { nome, sobrenome, email },
      { new: true }
    )
      .select(`${await selectPermissions(req)}`)
      .populate("criadoPor");

    return res.status(200).send({ status: true, data: userUpdated });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function deleteUser(req, res) {
  try {
    if (req.params.usuarioId.toString() === req.decodedJWT.id.toString()) {
      return res
        .status(400)
        .send({ status: false, erros: ["Usuario náo pode se auto deletar."] });
    }

    const usuarioId = req.params.usuarioId;

    const canDeleteResult = await userCanDelete(req.decodedJWT.id, usuarioId);

    if (canDeleteResult !== true) {
      return res.status(400).send({ status: false, erros: [canDeleteResult] });
    }

    const userDeleted = await Model.User.findByIdAndDelete(usuarioId);

    return res.status(200).send({ status: true, data: userDeleted });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function userCanDelete(userToActId, userToDeleteId) {
  const userToAct = await Model.User.findById(userToActId).select(
    "+administrador +system_user +root"
  );

  const userToDelete = await Model.User.findById(userToDeleteId).select(
    "+administrador +system_user +root"
  );

  if (!userToAct || !userToDelete) {
    return "Usuario(s) nao localizado.";
  }
  if (userToAct.administrador) {
    const res = !(
      userToDelete.administrador ||
      userToDelete.root ||
      userToDelete.system_user
    );
    return res || "Administrador náo pode deletar o usuario.";
  } else if (userToAct.root) {
    const res = !userToDelete.root;
    return res || "root náo pode deletar o usuario root.";
  } else if (userToAct.system_user) {
    const res = !(
      userToDelete.system_user ||
      userToDelete.root ||
      userToDelete.administrador
    );
    return res || "Sistema sem privilegios para remover.";
  } else {
    return true;
  }
}

async function selectPermissions(req) {
  const permissions = {
    root:
      (await secure.checkUserRights(req, { root: true })) === true
        ? "+administrador +system_user +root"
        : false,
    admin:
      (await secure.checkUserRights(req, { admin: true })) === true
        ? "+administrador +system_user"
        : false,
    sys:
      (await secure.checkUserRights(req, { system: true })) === true
        ? "+system_user"
        : false,
  };

  if (permissions.root !== false) return permissions.root;
  else if (permissions.admin !== false) return permissions.admin;
  else if (permissions.sys !== false) return permissions.sys;
  else return "";
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  getSelfUser,
  updateUser,
  deleteUser,
  getUserPets,
};
