const { UserBuyProduct } = require("../models/models");
const ApiError = require("../error/ApiError");

class UserProductController {
  async create(req, res) {
    try {
      const { count, all_price, userId, productId } = req.body;
      const userProduct = await UserBuyProduct.create({
        count,
        all_price,
        status: null,
        userId,
        productId,
      });

      return res.json(userProduct);
    } catch (error) {
      ApiError.badRequest(error.message);
    }
  }

  async getAll(req, res) {
    const getAllUserProduct = await UserBuyProduct.findAll();
    return res.json(getAllUserProduct);
  }

  async getStatus(req, res) {
    const { status } = req.body;
    const changeParam = await UserBuyProduct.findAll({
      where: { status },
    });

    return res.json(changeParam);
  }

  async updateStatus(req, res) {
    const { id, status } = req.body;
    await UserBuyProduct.update({ status: status }, { where: { id: id } });

    const getInfo = await UserBuyProduct.findOne({ where: { id: id } });
    return res.json(getInfo);
  }

  async deleteOne(req, res) {
    const { id } = req.body;
    const deleteOneUserProduct = await UserBuyProduct.destroy({
      where: { id: id },
    });
    return res.json(deleteOneUserProduct);
  }
}

module.exports = new UserProductController();
