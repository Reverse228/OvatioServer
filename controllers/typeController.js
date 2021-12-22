const ApiError = require("../error/ApiError");
const { Type, Product } = require("../models/models");

class TypeController {
  async create(req, res, next) {
    try {
      const { name_ru, name_ro, mainTypeId } = req.body;
      const type = await Type.create({ name_ru, name_ro, mainTypeId });
      return res.json(type);
    } catch (error) {
      next(ApiError.badRequest(error));
    }
  }

  async getAll(req, res) {
    const allTypes = await Type.findAll({ order: [["id", "ASC"]] });
    return res.json(allTypes);
  }

  async updadeInfo(req, res) {
    const { newName, id, lang } = req.body;
    let updateName;
    if (lang === "RU") {
      updateName = await Type.update(
        { name_ru: newName },
        { where: { id: id } }
      );
    } else if (lang === "RO") {
      updateName = await Type.update(
        { name_ro: newName },
        { where: { id: id } }
      );
    }

    return res.json(updateName);
  }

  async deleteType(req, res) {
    const { id } = req.body;
    await Product.destroy({
      where: { typeId: id },
    });
    const deleteType = await Type.destroy({ where: { id: id } });
    return res.json(deleteType);
  }
}

module.exports = new TypeController();
