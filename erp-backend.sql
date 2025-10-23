-- Enable PostGIS


-- =====================
-- DROP EXISTING TABLES
-- =====================
DROP TABLE IF EXISTS supplier_products;
DROP TABLE IF EXISTS suppliers;
DROP TABLE IF EXISTS commissions;
DROP TABLE IF EXISTS otp_confirmations;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS darkstore_stock;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS darkstore_staff;
DROP TABLE IF EXISTS darkstores;
DROP TABLE IF EXISTS riders;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS referral_agents;
DROP TABLE IF EXISTS account_managers;

-- =====================
-- Referral Agents
-- =====================
CREATE TABLE referral_agents (
    agent_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- Customers
-- =====================
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(100),
    phone VARCHAR(20) UNIQUE NOT NULL,
    primary_suburb VARCHAR(100),
    referral_agent_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_customers_referral
        FOREIGN KEY (referral_agent_id)
        REFERENCES referral_agents(agent_id)
        ON DELETE SET NULL
);

-- =====================
-- Account Managers
-- =====================
CREATE TABLE account_managers (
    manager_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- Darkstores
-- =====================
CREATE TABLE darkstores (
    darkstore_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    owner VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    latitude DOUBLE,
    longitude DOUBLE,
    float_balance DECIMAL(12,2) DEFAULT 0,
    account_manager_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_darkstores_account_manager
        FOREIGN KEY (account_manager_id)
        REFERENCES account_managers(manager_id)
        ON DELETE SET NULL
);

CREATE TABLE darkstore_staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    darkstore_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    FOREIGN KEY (darkstore_id) REFERENCES darkstores(darkstore_id) ON DELETE
);

-- =====================
-- Riders
-- =====================
CREATE TABLE riders (
    rider_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    address TEXT,
    next_of_kin VARCHAR(100),
    next_of_kin_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- Products & Stock
-- =====================
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    barcode VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE darkstore_stock (
    stock_id INT AUTO_INCREMENT PRIMARY KEY,
    darkstore_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (darkstore_id) REFERENCES darkstores(darkstore_id) ON DELETE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE
);

-- =====================
-- Orders
-- =====================
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    darkstore_id INT,
    rider_id INT,
    status VARCHAR(50) DEFAULT 'pending',
    total_amount DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE,
    FOREIGN KEY (darkstore_id) REFERENCES darkstores(darkstore_id) ON DELETE SET NULL,
    FOREIGN KEY (rider_id) REFERENCES riders(rider_id) ON DELETE SET NULL
);

CREATE TABLE order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE
);

-- =====================
-- OTP Confirmations
-- =====================
CREATE TABLE otp_confirmations (
    otp_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    otp_code VARCHAR(10) NOT NULL,
    stage VARCHAR(50) NOT NULL,
    verified TINYINT(1) DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE
);

-- =====================
-- Commissions
-- =====================
CREATE TABLE commissions (
    commission_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    rider_commission DECIMAL(12,2) DEFAULT 0,
    referral_commission DECIMAL(12,2) DEFAULT 0,
    account_manager_commission DECIMAL(12,2) DEFAULT 0,
    company_overhead DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE
);

-- =====================
-- Suppliers
-- =====================
CREATE TABLE suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE supplier_products (
    supplier_product_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE
);

-- =====================
-- SEED DATA
-- =====================

-- Referral Agent
INSERT INTO referral_agents (name, phone)
VALUES ('Agent One', '0771000000');

-- Customer linked to referral agent
INSERT INTO customers (nickname, phone, primary_suburb, referral_agent_id)
VALUES ('Tapiwa', '0772000000', 'Harare CBD', 1);

-- Account Manager
INSERT INTO account_managers (name, phone)
VALUES ('Manager One', '0773000000');

-- Darkstore linked to account manager
INSERT INTO darkstores (name, owner, phone, latitude, longitude, float_balance, account_manager_id)
VALUES ('CBD Darkstore', 'Mr. Dube', '0774000000', -17.8292, 31.0522, 500.00, 1);

-- Darkstore Staff
INSERT INTO darkstore_staff (darkstore_id, name, phone)
VALUES (1, 'Staff One', '0774001111');

-- Rider
INSERT INTO riders (name, phone, address, next_of_kin, next_of_kin_phone)
VALUES ('Rider One', '0775000000', 'Mbare, Harare', 'John Doe', '0776000000');

-- Products
INSERT INTO products (name, description, barcode)
VALUES 
('Bread', 'Standard loaf of bread', 'BRD123'),
('Milk', '1L fresh milk', 'MLK123');

-- Stock
INSERT INTO darkstore_stock (darkstore_id, product_id, quantity)
VALUES 
(1, 1, 50),
(1, 2, 30);

-- Order
INSERT INTO orders (customer_id, darkstore_id, rider_id, status, total_amount)
VALUES (1, 1, 1, 'processing', 5.00);

-- Order Items
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES 
(1, 1, 1, 1.00),
(1, 2, 2, 2.00);

-- OTP Confirmations
INSERT INTO otp_confirmations (order_id, otp_code, stage, verified)
VALUES 
(1, '1234', 'darkstore_accept', TRUE),
(1, '5678', 'rider_pickup', FALSE);

-- Commissions
INSERT INTO commissions (order_id, rider_commission, referral_commission, account_manager_commission, company_overhead)
VALUES (1, 0.25, 0.05, 0.05, 0.15);
-- =====================
-- TEST QUERIES
-- =====================

-- 1. List all customers and their referral agents
SELECT c.customer_id, c.nickname, c.phone, r.name AS referral_agent
FROM customers c
LEFT JOIN referral_agents r ON c.referral_agent_id = r.agent_id;

-- 2. Get all darkstores with account manager info
SELECT d.darkstore_id, d.name AS darkstore_name, d.float_balance,
       am.name AS account_manager, am.phone AS manager_phone
FROM darkstores d
LEFT JOIN account_managers am ON d.account_manager_id = am.manager_id;

-- 3. Show all riders
SELECT rider_id, name, phone, address, next_of_kin, next_of_kin_phone
FROM riders;

-- 4. List products and stock in each darkstore
SELECT ds.darkstore_id, d.name AS darkstore_name,
       p.product_id, p.name AS product_name, ds.quantity
FROM darkstore_stock ds
JOIN products p ON ds.product_id = p.product_id
JOIN darkstores d ON ds.darkstore_id = d.darkstore_id;

-- 5. Get all orders with customer, rider, and darkstore info
SELECT o.order_id, o.status, o.total_amount,
       c.nickname AS customer, c.phone AS customer_phone,
       r.name AS rider, d.name AS darkstore
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.customer_id
LEFT JOIN riders r ON o.rider_id = r.rider_id
LEFT JOIN darkstores d ON o.darkstore_id = d.darkstore_id;

-- 6. Show order items for each order
SELECT oi.order_id, p.name AS product, oi.quantity, oi.price
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
ORDER BY oi.order_id;

-- 7. OTP confirmations per order
SELECT o.order_id, oc.stage, oc.otp_code, oc.verified
FROM otp_confirmations oc
JOIN orders o ON oc.order_id = o.order_id
ORDER BY o.order_id, oc.stage;

-- 8. Commission breakdown per order
SELECT c.commission_id, o.order_id, o.total_amount,
       c.rider_commission, c.referral_commission, 
       c.account_manager_commission, c.company_overhead
FROM commissions c
JOIN orders o ON c.order_id = o.order_id;

-- 9. Supplier and their products
SELECT s.name AS supplier, p.name AS product
FROM supplier_products sp
JOIN suppliers s ON sp.supplier_id = s.supplier_id
JOIN products p ON sp.product_id = p.product_id;

-- 10. Full order flow (Customer -> Order -> Items -> Rider -> Darkstore -> Commission)
SELECT o.order_id, c.nickname AS customer, r.name AS rider, d.name AS darkstore,
       o.status, o.total_amount, com.rider_commission, com.company_overhead
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.customer_id
LEFT JOIN riders r ON o.rider_id = r.rider_id
LEFT JOIN darkstores d ON o.darkstore_id = d.darkstore_id
LEFT JOIN commissions com ON o.order_id = com.order_id;
