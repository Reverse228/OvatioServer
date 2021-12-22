const { FooterName, FooterLinks } = require("../models/models");

class FooterNameController {
  async create(req, res) {
    const { name_ru, name_ro } = req.body;
    const footerName = await FooterName.create({ name_ru, name_ro });
    return res.json(footerName);
  }

  async getAll(req, res) {
    const allFooterName = await FooterName.findAll();
    return res.json(allFooterName);
  }

  async changeName(req, res) {
    const { id, newName, lang } = req.body;
    let newFooterName;
    if (lang === "RU") {
      newFooterName = await FooterName.update(
        { name_ru: newName },
        { where: { id: id } }
      );
    } else if (lang === "RO") {
      newFooterName = await FooterName.update(
        { name_ro: newName },
        { where: { id: id } }
      );
    }

    return res.json(newFooterName);
  }

  async deleteName(req, res) {
    const { id } = req.body;
    await FooterLinks.destroy({ where: { footerNameId: id } });
    const deleteFooterName = await FooterName.destroy({ where: { id: id } });
    return res.json(deleteFooterName);
  }
}

module.exports = new FooterNameController();
