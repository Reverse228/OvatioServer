const { Brand } = require("../models/models");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async getAll(req, res) {
    const allBrands = await Brand.findAll();
    return res.json(allBrands);
  }

  async getInfo(req, res) {
    const { propsGet, where } = req.body;
    const getInfo = await Product.findAll({
      where: { [propsGet]: where },
      order: [["id", "ASC"]],
    });
    return res.json(getInfo);
  }

  async update(req, res) {
    const { newName, id } = req.body;
    const changeName = Brand.update({ name: newName }, { where: { id: id } });
    res.json(changeName);
  }

  async delete(req, res) {
    const { id } = req.body;
    const deleteEl = Brand.destroy({ where: { id: id } });
    res.json(deleteEl);
  }
}

module.exports = new BrandController();
