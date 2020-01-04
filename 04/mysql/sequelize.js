(async () => {
  const Sequelize = require("sequelize");
  // 建立连接-- pool 是连接池
  const sequelize = new Sequelize("mysql2", "root", "12345678", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
      max: 10,
      min: 0,
      idle: 30000
    }
  });

  // 定义模型
  // 模型名, attributes,  options
  const Fruit = sequelize.define("Fruit", {
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
  });

  let ret = await Fruit.sync();
  //   console.log("ret", ret);

  ret = await Fruit.create({
    name: "香蕉",
    price: 3.5
  });

  //   console.log("create", ret);

  ret = await Fruit.findAll();

  //   console.log("find:", JSON.stringify(ret));
  await Fruit.update(
    {
      price: 4
    },
    { where: { name: "香蕉" } }
  );

  // 操作符复杂的方法
  const Op = Sequelize.Op;
  ret = await Fruit.findAll({
    where: {
      price: {
        [Op.lt]: 5,
        [Op.gt]: 2
      }
    }
  }).then(fruits => {
    console.log("fruits[0].get()", fruits[0].get());
  });

  // 分页
  ret = Fruit.findAll({
    offset: 0,
    limit: 2
  });

  // 排序
  Fruit.findAll({
    order: [["price", "DESC"]]
  });

  // 聚合
  Fruit.max("price").then(max => {
    console.log("max", max);
  });
  Fruit.sum("price").then(sum => {
    console.log("sum", sum);
  });
  console.log("find:", JSON.stringify(ret));

  // 更新
  Fruit.findById(1).then(fruit => {
    // 方式1
    fruit.price = 4;
    fruit.save().then(() => console.log("update!!!!"));
  });
  // 方式2
  Fruit.update({ price: 4 }, { where: { id: 1 } }).then(r => {
    console.log(r);
    console.log("update!!!!");
  });

  // 删除
  // 方式1
  Fruit.findOne({ where: { id: 1 } }).then(r => r.destroy());
  // 方式2
  Fruit.destroy({ where: { id: 1 } }).then(r => console.log(r));

  // 强制同步:创建表之前先删除已存在的表
  Fruit.sync({ force: true });

  // 避免自动生成时间戳字段
  const Fruit = sequelize.define(
    "Fruit",
    {},
    {
      timestamps: false
    }
  );

  // 指定表名: freezeTableName: true 或 tableName:'xxx'
  // 设置前者则以modelName作为表名;设置后者则按其值作为表名。 蛇形命名 underscored: true,
  // 默认驼峰命名

  //Getters & Setters:可用于定义伪属性或映射到数据库字段的保护属性
  const Fruit = sequelize.define(
    "Fruit",
    {
      // 定义为属性一部分
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          const fname = this.getDataValue("name");
          const price = this.getDataValue("price");
          const stock = this.getDataValue("stock");
          return `${fname}(价格:¥${price} 库存:${stock}kg)`;
        }
      }
    },
    {
      timestamps: false,
      // 定义为 模型选项
      getterMethods: {
        amount() {
          return this.getDataValue("stock") + "kg";
        }
      },
      setterMethods: {
        amount(val) {
          const idx = val.indexOf("kg");
          const v = val.slice(0, idx);
          this.setDataValue("stock", v);
        }
      }
    }
  );

  // 通过模型实例触发setterMethods
  Fruit.findAll().then(fruits => {
    console.log(JSON.stringify(fruits)); // 修改amount，触发setterMethods
    fruits[0].amount = "150kg";
    fruits[0].save();
  });

  //   验证
  // 模型验证允许你为每个模型属性指定format/content/inheritance验证。
  // 验证会在create、update、save时自动调用。可以手工调用validate()对实例进行验证

  const Fruit = sequelize.define(
    "Fruit",
    {
      // 定义为属性一部分
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          const fname = this.getDataValue("name");
          const price = this.getDataValue("price");
          const stock = this.getDataValue("stock");
          return `${fname}(价格:¥${price} 库存:${stock}kg)`;
        }
      },
      price: {
        validate: {
          isFloat: { msg: "价格字段请输入数字" },
          min: { args: [0], msg: "价格字段必须大于0" }
        }
      },
      stock: {
        validate: {
          isNumeric: { msg: "库存字段请输入数字" }
        }
      }
    },
    {
      timestamps: false
    }
  );

  //模型扩展:可添加模型实例方法或类方法扩展模型
  // 添加类级别方法
  Fruit.classify = function(name) {
    const tropicFruits = ["香蕉", "芒果", "椰子"]; // 热带水果
    return tropicFruits.includes(name) ? "热带水果" : "其他水果";
  };
  // 添加实例级别方法
  Fruit.prototype.totalPrice = function(count) {
    return (this.price * count).toFixed(2);
  };
  // 使用类方法
  ["香蕉", "草莓"].forEach(f => console.log(f + "是" + Fruit.classify(f)));
  // 使用实例方法
  Fruit.findAll().then(fruits => {
    const [f1] = fruits;
    console.log(`买5kg${f1.name}需要¥${f1.totalPrice(5)}`);
  });
})();
