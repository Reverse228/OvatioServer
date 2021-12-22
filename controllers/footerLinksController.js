const { FooterLinks } = require("../models/models");

class FooterLinkController {
  async create(req, res) {
    return await newFunction();

    async function newFunction() {
      const { name_ru, name_ro, link, footerNameId } = req.body;
      const footerLink = await FooterLinks.create({
        name_ru,
        name_ro,
        link,
        footerNameId,
      });
      return res.json(footerLink);
    }
  }

  async getAll(req, res) {
    const allFooterLink = await FooterLinks.findAll();
    return res.json(allFooterLink);
  }

  async getAllWithFooterNameId(req, res) {
    const { nameId } = req.body;
    const allFooterLink = await FooterLinks.findAll({
      where: { footerNameId: nameId },
    });
    return res.json(allFooterLink);
  }

  async changeLink(req, res) {
    const { id, newName, lang } = req.body;
    let newFooterLink;
    if (lang === "RU") {
      newFooterLink = await FooterLinks.update(
        { name_ru: newName },
        { where: { id: id } }
      );
    } else if (lang === "RO") {
      newFooterLink = await FooterLinks.update(
        { name_ro: newName },
        { where: { id: id } }
      );
    }

    return res.json(newFooterLink);
  }

  async deleteLink(req, res) {
    const { id } = req.body;
    const deleteFooterLink = await FooterLinks.destroy({ where: { id: id } });
    return res.json(deleteFooterLink);
  }
}

module.exports = new FooterLinkController();
