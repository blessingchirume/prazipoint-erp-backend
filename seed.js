require("dotenv").config();
const models = require("./models");

async function seed() {
  try {
    console.log("🌱 Seeding database...");
    // Reset database
    await models.sequelize.sync({ force: true });

    // Create Referral Agents
    const agent1 = await models.ReferralAgent.create({ name: "John Agent", phone: "0700111222" });
    const agent2 = await models.ReferralAgent.create({ name: "Mary Agent", phone: "0700333444" });

    // Create Customers
    const cust1 = await models.Customer.create({ nickname: "Alex", phone: "0711111111", primary_suburb: "Nairobi", referral_agent_id: agent1.agent_id });
    const cust2 = await models.Customer.create({ nickname: "Brian", phone: "0722222222", primary_suburb: "Mombasa", referral_agent_id: agent2.agent_id });

    // Create Account Managers
    const manager1 = await models.AccountManager.create({ name: "Grace Manager", phone: "0755555555" });

    // Create Darkstores
    const store1 = await models.Darkstore.create({ name: "Nairobi Central", owner: "David Store", phone: "0766666666", account_manager_id: manager1.account_manager_id });
    const store2 = await models.Darkstore.create({ name: "Mombasa South", owner: "Emma Store", phone: "0777777777", account_manager_id: manager1.account_manager_id });

    // Create Riders
    const rider1 = await models.Rider.create({ name: "Sam Rider", phone: "0733333333" });
    const rider2 = await models.Rider.create({ name: "Lucy Rider", phone: "0744444444" });

    // Create Products
    const prod1 = await models.Product.create({ name: "Sugar 1kg", price: 120 });
    const prod2 = await models.Product.create({ name: "Rice 2kg", price: 300 });

    // Create Suppliers
    const supplier1 = await models.Supplier.create({ name: "Best Foods Ltd" });
    await models.SupplierProduct.create({ supplier_id: supplier1.supplier_id, product_id: prod1.product_id });
    await models.SupplierProduct.create({ supplier_id: supplier1.supplier_id, product_id: prod2.product_id });

    // Create Darkstore Stock
    await models.DarkstoreStock.create({ darkstore_id: store1.darkstore_id, product_id: prod1.product_id, quantity: 50 });
    await models.DarkstoreStock.create({ darkstore_id: store1.darkstore_id, product_id: prod2.product_id, quantity: 80 });

    // Create an Order
    const order1 = await models.Order.create({ customer_id: cust1.customer_id, darkstore_id: store1.darkstore_id, rider_id: rider1.rider_id, total: 420 });

    // Order Items
    await models.OrderItem.create({ order_id: order1.order_id, product_id: prod1.product_id, quantity: 1, price: 120 });
    await models.OrderItem.create({ order_id: order1.order_id, product_id: prod2.product_id, quantity: 1, price: 300 });

    // OTP Confirmation
    await models.OtpConfirmation.create({ order_id: order1.order_id, otp_code: "123456", is_verified: true, stage: "delivery" });

    // Commission
    await models.Commission.create({ order_id: order1.order_id, amount: 42 });

    console.log("✅ Database seeded successfully!");
    await models.sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();