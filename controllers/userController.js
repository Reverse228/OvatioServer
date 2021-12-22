const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, name, surname, email, telephone, role) => {
  return jwt.sign(
    { id, name, surname, email, telephone, role },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
};

class UserController {
  async registration(req, res, next) {
    const { name, surname, email, password, telephone, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Inccorect email or password"));
    }

    const canditate = await User.findOne({ where: { email } });
    if (canditate) {
      return next(ApiError.badRequest("This email already used"));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      name,
      surname,
      email,
      password: hashPassword,
      telephone,
      role,
    });
    await Basket.create({ userId: user.id });
    const token = generateJwt(
      user.id,
      user.name,
      user.surname,
      user.email,
      user.telephone,
      user.role
    );
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("User was not found"));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Invalid password or email"));
    }

    const token = generateJwt(
      user.id,
      user.name,
      user.surname,
      user.email,
      user.telephone,
      user.role
    );
    return res.json({ token });
  }

  async check(req, res) {
    if (!req.user) {
      return ApiError.internal("Пользователь не зарегестрирован");
    }
    const token = generateJwt(
      req.user.id,
      req.user.name,
      req.user.surname,
      req.user.email,
      req.user.telephone,
      req.user.role
    );
    return res.json({ token });
  }

  async getAll(req, res) {
    const allUser = await User.findAll({
      attributes: ["id", "name", "surname", "telephone"],
    });
    return res.json(allUser);
  }
}

module.exports = new UserController();
