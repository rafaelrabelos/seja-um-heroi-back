const mongoose = require("../database/connection");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, default: "" },
  data_nascimento: { type: Date, default: new Date("1900-01-01") },
  email: { type: String, unique: true, lowercase: true, required: true },
  senha: { type: String, select: false, required: true },
  root: { type: Boolean, select: false, default: false },
  administrador: { type: Boolean, select: false, default: false },
  system_user: { type: Boolean, select: false, default: false },
  criadoEm: { type: Date, default: Date.now },
  criadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
