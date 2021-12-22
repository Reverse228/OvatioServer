const { MainType, Product, Type } = require("../models/models");

class MainTypeController {
  async create(req, res) {
    const { nameRu, nameRo } = req.body;
    const type = await MainType.create({ name_ru: nameRu, name_ro: nameRo });
    return res.json(type);
  }

  async getAll(req, res) {
    const allMainType = await MainType.findAll();
    return res.json(allMainType);
  }

  async changeName(req, res) {
    const { newName, id, lang } = req.body;
    let changeName;
    if (lang === "RU") {
      changeName = await MainType.update(
        { name_ru: newName },
        { where: { id: id } }
      );
    } else if (lang === "RO") {
      changeName = await MainType.update(
        { name_ro: newName },
        { where: { id: id } }
      );
    }
    return res.json(changeName);
  }

  async deleteMainType(req, res) {
    const { id } = req.body;
    const simpleTypes = await Type.findAll({
      where: { mainTypeId: id },
      attributes: ["id"],
    });
    await simpleTypes.map((type) => {
      Product.destroy({
        where: { typeId: type.id },
      });
    });
    await Type.destroy({
      where: { mainTypeId: id },
    });
    const deleteMainType = await MainType.destroy({
      where: { id: id },
    });
    return res.json(deleteMainType);
  }
}

module.exports = new MainTypeController();
