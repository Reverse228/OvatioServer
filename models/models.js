const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  telephone: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  articul: { type: DataTypes.STRING },
  name_ru: { type: DataTypes.STRING, allowNull: false },
  name_ro: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
  count: { type: DataTypes.INTEGER, defaultValue: 0 },
  min_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  availability: { type: DataTypes.BOOLEAN, defaultValue: false },
  country_ru: { type: DataTypes.STRING },
  country_ro: { type: DataTypes.STRING },
  material_ru: { type: DataTypes.STRING },
  material_ro: { type: DataTypes.STRING },
  size: { type: DataTypes.STRING },
  gabarit: { type: DataTypes.STRING },
  desctription_ru: { type: DataTypes.TEXT },
  desctription_ro: { type: DataTypes.TEXT },
  unit_of_measurement_ru: { type: DataTypes.STRING },
  unit_of_measurement_ro: { type: DataTypes.STRING },
});

const MainType = sequelize.define("main_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_ru: { type: DataTypes.STRING, unique: true, allowNull: false },
  name_ro: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_ru: { type: DataTypes.STRING, allowNull: false },
  name_ro: { type: DataTypes.STRING, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
});

const UserBuyProduct = sequelize.define("user_by_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  count: { type: DataTypes.INTEGER, allowNull: false },
  all_price: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.BOOLEAN },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const FooterName = sequelize.define("footer_name", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_ru: { type: DataTypes.STRING, allowNull: false },
  name_ro: { type: DataTypes.STRING, allowNull: false },
});

const FooterLinks = sequelize.define("footer_links", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_ru: { type: DataTypes.STRING, allowNull: false },
  name_ro: { type: DataTypes.STRING, allowNull: false },
  link: { type: DataTypes.STRING },
});

MainType.hasMany(Type);
Type.belongsTo(MainType);

User.hasOne(Basket);
Basket.belongsTo(User);

Type.hasMany(Product);
Product.belongsTo(Type);

Brand.hasMany(Product);
Product.belongsTo(Brand);

User.hasMany(UserBuyProduct);
UserBuyProduct.belongsTo(User);

Product.hasMany(UserBuyProduct);
UserBuyProduct.belongsTo(Product);

FooterName.hasMany(FooterLinks);
FooterLinks.belongsTo(FooterName);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
  User,
  Basket,
  Product,
  MainType,
  Type,
  Brand,
  TypeBrand,
  UserBuyProduct,
  FooterName,
  FooterLinks,
};
