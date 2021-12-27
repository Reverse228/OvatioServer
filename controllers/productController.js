const uuid = require("uuid");
const sharp = require("sharp");
const { Product, UserBuyProduct } = require("../models/models");
const ApiError = require("../error/ApiError");
const { Sequelize } = require("../db");
const fs = require("fs");
const Op = Sequelize.Op;

class ProductController {
  async create(req, res, next) {
    if (!req.body) {
      return next(ApiError.badReques("Не заполнены поля"));
    } else if (!req.files) {
      return next(ApiError.badReques("Нету изображения"));
    }

    try {
      const info = req.body;
      const { img } = req.files;

      const newName = uuid.v4() + ".jpeg";
      info.img = newName;
      info.availability = info.count > 0 ? true : false;

      const product = await Product.create(info);

      await sharp(img.data)
        .resize({ width: 250 })
        .jpeg()
        .toFile(`./static/${newName}`, (err) => {
          console.log(err);
        });

      res.json(product);
    } catch (error) {
      return next(ApiError.badReques(error.message));
    }
  }

  async getAll(req, res, next) {
    let { brandId, typeId, limit, page } = req.body;
    page = page || 1;
    limit = limit || 30;
    let offset = page * limit - limit;
    let products;
    brandId = brandId == 0 ? false : brandId;
    typeId = typeId == 0 ? false : typeId;
    if (!brandId && !typeId) {
      products = await Product.findAndCountAll({
        limit,
        offset,
        order: [["id", "ASC"]],
      });
    } else if (brandId && !typeId) {
      products = await Product.findAndCountAll({
        where: { brandId: brandId },
        limit,
        offset,
        order: [["id", "ASC"]],
      });
    } else if (!brandId && typeId) {
      products = await Product.findAndCountAll({
        where: { typeId: typeId },
        limit,
        offset,
        order: [["id", "ASC"]],
      });
    } else if (brandId && typeId) {
      products = await Product.findAndCountAll({
        where: { brandId: brandId, typeId: typeId },
        limit,
        offset,
        order: [["id", "ASC"]],
      });
    }
    return res.json(products);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Product.findOne({
      where: { id },
    });
    return res.json(device);
  }

  async updateInfo(req, res) {
    const { productId, count } = req.body;
    let availabilitySet = count > 0 ? true : false;
    const productUpdate = await Product.update(
      { count: count, availability: availabilitySet },
      { where: { id: productId } }
    );

    return res.json(productUpdate);
  }

  async updateInfoAll(req, res) {
    const info = req.body;
    const imgOldName = await Product.findOne({ where: { id: info.id } });

    if (imgOldName.img) {
      const filePath = `./static/${imgOldName.img}`;

      fs.exists(filePath, (exist) => {
        if (exist) {
          fs.unlinkSync(filePath);
        }
      });
    }

    const newName = uuid.v4() + ".jpeg";
    info.img = newName;
    info.availability = info.count > 0 ? true : false;

    const device = await Product.update(info, { where: { id: info.id } });

    if (req.files) {
      const { img } = req.files;

      await sharp(img.data)
        .resize({ width: 250 })
        .jpeg()
        .toFile(`./static/${newName}`);
    }

    return res.json(device);
  }

  async deleteOneItem(req, res) {
    const { id } = req.body;
    await UserBuyProduct.destroy({
      where: { productId: id },
    });

    const deleteRow = await Product.destroy({ where: { id: id } });
    return res.json(deleteRow);
  }

  async searchProduct(req, res) {
    const { name, lang } = req.body;
    let search;
    if (lang === "RU") {
      search = await Product.findAll({
        where: { name_ru: { [Op.like]: `%${name}%` } },
      });
    } else if (lang === "RO") {
      search = await Product.findAll({
        where: { name_ro: { [Op.like]: `%${name}%` } },
      });
    }

    return res.json(search);
  }
}

module.exports = new ProductController();
