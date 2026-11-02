/* Bismillah */

/*

Mobile App Template: Shop - Store - v26.11

THE DATA OF THE SHOP: the products, the cart, the favorites, the addresses and the orders.
Everything is saved on the device (App.save). A real shop gets its products from its server here and sends the order
in Store.placeOrder(); the pages do not need to change.

Every change calls Store.notify(): a page that shows this data listens with box.listenTo(window, Store.EVENT, ...).

*/

"use strict";

const Store = {};

Store.EVENT = "shop-data-changed";
Store.LOW_STOCK = 5;
Store.MINUTES_PER_ORDER_STEP = 2; // The demo: an order moves one step of Store.ORDER_STEPS in this time
Store.ORDER_STEPS = ["Placed", "Packed", "On the way", "Delivered"];
Store.CATEGORIES = ["Bags", "Shoes", "Living", "Tech"];

const SHOP_COLORS = {
    black: { name: "Black", hex: "#2C2E33" },
    sand: { name: "Sand", hex: "#C9AE87" },
    olive: { name: "Olive", hex: "#6B7349" },
    navy: { name: "Navy", hex: "#2F4468" },
    clay: { name: "Clay", hex: "#B5775A" },
    white: { name: "White", hex: "#E9E6DF" },
    sage: { name: "Sage", hex: "#8FA88F" },
    terracotta: { name: "Terracotta", hex: "#C2654A" },
    silver: { name: "Silver", hex: "#A9AEB5" },
};

Store.products = [
    { id: "tote", shape: "tote", name: "Everyday Tote", category: "Bags", price: 32, oldPrice: 45, rating: 4.7, reviewCount: 214, stock: 18, tint: "#F1EADF",
        colors: ["sand", "black", "olive"], sizes: [], description: "Roomy canvas tote with long handles and an inner pocket. Made for the market, the office and everything in between." },
    { id: "backpack", shape: "backpack", name: "City Backpack", category: "Bags", price: 79, rating: 4.8, reviewCount: 326, stock: 12, tint: "#E7ECF3",
        colors: ["navy", "black", "olive"], sizes: [], description: "A light backpack with a padded laptop sleeve and a front pocket for the small things." },
    { id: "crossbody", shape: "crossbody", name: "Mini Crossbody", category: "Bags", price: 54, rating: 4.5, reviewCount: 98, stock: 4, tint: "#F4E7E0",
        colors: ["clay", "black", "sand"], sizes: [], description: "Small on the outside, surprisingly roomy on the inside. The strap adjusts to any height." },
    { id: "sneaker", shape: "sneaker", name: "Cloud Sneaker", category: "Shoes", price: 89, oldPrice: 119, rating: 4.9, reviewCount: 512, stock: 22, tint: "#E9F0EA",
        colors: ["sage", "navy", "white"], sizes: ["40", "41", "42", "43", "44"], description: "Soft foam soles and a breathable upper. The pair you reach for every morning." },
    { id: "boot", shape: "boot", name: "Trail Boot", category: "Shoes", price: 129, rating: 4.6, reviewCount: 143, stock: 9, tint: "#F0EAE2",
        colors: ["clay", "black"], sizes: ["40", "41", "42", "43", "44"], description: "A warm boot with a strong grip, ready for rain, mud and long walks." },
    { id: "sandal", shape: "sandal", name: "Summer Sandal", category: "Shoes", price: 42, oldPrice: 58, rating: 4.4, reviewCount: 76, stock: 3, tint: "#F6EEDD",
        colors: ["terracotta", "olive", "black"], sizes: ["37", "38", "39", "40", "41"], description: "Two soft straps and a shaped sole. Light enough to forget you have them on." },
    { id: "mug", shape: "mug", name: "Stoneware Mug", category: "Living", price: 18, rating: 4.8, reviewCount: 389, stock: 40, tint: "#EDEDE8",
        colors: ["terracotta", "sage", "navy"], sizes: [], description: "A heavy, hand-glazed mug that keeps your coffee warm a little longer." },
    { id: "lamp", shape: "lamp", name: "Soft Desk Lamp", category: "Living", price: 64, rating: 4.7, reviewCount: 121, stock: 14, tint: "#F5EFDF",
        colors: ["sage", "clay", "white"], sizes: [], description: "Warm, even light for late work. The shade tilts and the light dims in three steps." },
    { id: "planter", shape: "planter", name: "Ceramic Planter", category: "Living", price: 28, oldPrice: 36, rating: 4.6, reviewCount: 87, stock: 16, tint: "#E8F0E4",
        colors: ["white", "terracotta", "black"], sizes: [], description: "A round planter with a drainage hole and a matching saucer. The plant is included." },
    { id: "headphones", shape: "headphones", name: "Quiet Headphones", category: "Tech", price: 149, oldPrice: 199, rating: 4.8, reviewCount: 642, stock: 11, tint: "#E9EAF0",
        colors: ["black", "silver", "navy"], sizes: [], description: "Noise-cancelling headphones with 40 hours of battery and soft ear cushions." },
    { id: "watch", shape: "watch", name: "Daily Watch", category: "Tech", price: 119, rating: 4.5, reviewCount: 208, stock: 7, tint: "#EDEAE6",
        colors: ["clay", "black", "sage"], sizes: [], description: "A clean face, a soft strap and a week of battery. It tracks your steps and your sleep." },
    { id: "speaker", shape: "speaker", name: "Pocket Speaker", category: "Tech", price: 59, rating: 4.6, reviewCount: 175, stock: 20, tint: "#EAF0EE",
        colors: ["navy", "sage", "terracotta"], sizes: [], description: "A small speaker with a big sound. Waterproof, with 12 hours of music." },
];

Store.FIRST_ADDRESS = { id: "first", name: "Alex Morgan", phone: "+1 555 0100", street: "12 Garden Street", city: "Springfield" };

Store.cart = App.load("cart", []);
Store.favorites = App.load("favorites", ["sneaker", "headphones"]);
Store.orders = App.load("orders", []);
Store.addresses = App.load("addresses", [Store.FIRST_ADDRESS]);
Store.selectedAddressId = App.load("selected-address", Store.FIRST_ADDRESS.id);
Store.discountCode = App.load("discount-code", "");

Store.notify = function () {
    window.dispatchEvent(new Event(Store.EVENT));
};

Store.money = function (amount) {
    const hasCents = (amount % 1 !== 0);
    return new Intl.NumberFormat(Texts.current, {
        style: "currency",
        currency: AppSettings.currency,
        maximumFractionDigits: hasCents ? 2 : 0,
    }).format(amount);
};

// *** PRODUCTS:

Store.findProduct = (id) => Store.products.find((product) => product.id === id);

Store.getColor = (colorId) => SHOP_COLORS[colorId];

Store.getImage = function (product, colorId = product.colors[0]) {
    return Art.image(product.shape, Store.getColor(colorId).hex);
};

Store.getSaleProducts = () => Store.products.filter((product) => product.oldPrice);

Store.getNewProducts = () => Store.products.filter((product) => !product.oldPrice).slice(0, 4);

Store.getRelatedProducts = function (product) {
    const sameCategory = Store.products.filter((other) => other.category === product.category && other.id !== product.id);
    return sameCategory.slice(0, 2);
};

// *** FAVORITES:

Store.isFavorite = (id) => Store.favorites.includes(id);

Store.toggleFavorite = function (id) {
    if (Store.isFavorite(id)) {
        Store.favorites = Store.favorites.filter((favoriteId) => favoriteId !== id);
    } else {
        Store.favorites.push(id);
    }
    App.save("favorites", Store.favorites);
    Store.notify();
};

// *** CART:

Store.getCartCount = () => Store.cart.reduce((sum, line) => sum + line.count, 0);

Store.saveCart = function () {
    App.save("cart", Store.cart);
    App.setTabBadge("cart", Store.getCartCount() || "");
    Store.notify();
};

Store.addToCart = function (product, colorId, size, count) {
    const key = [product.id, colorId, size].join(":");
    const line = Store.cart.find((each) => each.key === key);
    if (line) {
        line.count = Math.min(product.stock, line.count + count);
    } else {
        Store.cart.push({ key: key, id: product.id, colorId: colorId, size: size, count: count, price: product.price });
    }
    Store.saveCart();
};

Store.changeCount = function (line, delta) {
    const stock = Store.findProduct(line.id).stock;
    line.count = Math.min(stock, line.count + delta);
    Store.cart = Store.cart.filter((each) => each.count > 0);
    Store.saveCart();
};

Store.getSubtotal = () => Store.cart.reduce((sum, line) => sum + (line.price * line.count), 0);

Store.getDiscount = function () {
    const percent = AppSettings.discountCodes[Store.discountCode] || 0;
    return Math.round(Store.getSubtotal() * percent) / 100;
};

Store.setDiscountCode = function (code) {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode && !AppSettings.discountCodes[cleanCode]) return false;
    Store.discountCode = cleanCode;
    App.save("discount-code", cleanCode);
    Store.notify();
    return true;
};

Store.getShippingLeft = () => Math.max(0, AppSettings.freeShippingFrom - Store.getSubtotal());

Store.getShipping = function (method = "standard") {
    if (method === "standard" && Store.getShippingLeft() === 0) return 0;
    return AppSettings.shippingPrices[method];
};

Store.getTotal = (method) => Store.getSubtotal() - Store.getDiscount() + Store.getShipping(method);

// *** ADDRESSES:

Store.getSelectedAddress = function () {
    return Store.addresses.find((address) => address.id === Store.selectedAddressId) || Store.addresses[0] || null;
};

Store.selectAddress = function (id) {
    Store.selectedAddressId = id;
    App.save("selected-address", id);
    Store.notify();
};

Store.addAddress = function (address) {
    address.id = String(Date.now());
    Store.addresses.push(address);
    App.save("addresses", Store.addresses);
    Store.selectAddress(address.id);
};

Store.removeAddress = function (id) {
    Store.addresses = Store.addresses.filter((address) => address.id !== id);
    App.save("addresses", Store.addresses);
    Store.notify();
};

// *** ORDERS:

Store.findOrder = (id) => Store.orders.find((order) => order.id === id);

Store.getOrderStep = function (order) {
    const minutes = (Date.now() - new Date(order.date).getTime()) / 60000;
    const lastStep = Store.ORDER_STEPS.length - 1;
    return Math.min(lastStep, Math.floor(minutes / Store.MINUTES_PER_ORDER_STEP));
};

Store.placeOrder = function (method, payment) {
    if (!Store.cart.length) return null;
    const order = {
        id: Date.now().toString().slice(-6),
        date: new Date().toISOString(),
        lines: Store.cart,
        subtotal: Store.getSubtotal(),
        discount: Store.getDiscount(),
        shipping: Store.getShipping(method),
        total: Store.getTotal(method),
        count: Store.getCartCount(),
        address: Store.getSelectedAddress(),
        method: method,
        payment: payment,
    };
    Store.orders.unshift(order);
    App.save("orders", Store.orders);
    Store.cart = [];
    Store.setDiscountCode("");
    Store.saveCart();
    return order;
};

// *** THE DEMO:

Store.resetDemoData = function () {
    ["cart", "favorites", "orders", "addresses", "selected-address", "discount-code"].forEach(function (name) {
        basic.storage.remove(AppSettings.storageKey + "-" + name);
    });
    location.reload();
};

App.whenStarted(() => App.setTabBadge("cart", Store.getCartCount() || ""));
