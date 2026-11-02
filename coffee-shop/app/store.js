"use strict";

const Store = {};
Store.products = [
    { id: "latte", name: "Vanilyalı Latte", note: "Yumuşak espresso · vanilya", price: 145, category: "Sıcak", image: "assets/coffee-art/latte.svg" },
    { id: "iced", name: "Iced Latte", note: "Bol buz · taze süt · espresso", price: 155, category: "Soğuk", image: "assets/coffee-art/iced.svg" },
    { id: "filter", name: "Filtre Kahve", note: "Kolombiya · çikolata notaları", price: 110, category: "Sıcak", image: "assets/coffee-art/filter.svg" },
    { id: "frappe", name: "Karamelli Frappe", note: "Karamel · serin bir mola", price: 175, category: "Soğuk", image: "assets/coffee-art/frappe.svg" },
    { id: "matcha", name: "Yeşil Çay", note: "Hafif · çiçeksi · sakin", price: 95, category: "Kahvesiz", image: "assets/coffee-art/tea.svg" },
    { id: "cocoa", name: "Soğuk Çikolata", note: "Kakao · süt · mutluluk", price: 135, category: "Kahvesiz", image: "assets/coffee-art/cocoa.svg" },
];
Store.cart = App.load("cart", []);
Store.orders = App.load("orders", []);
Store.stamps = App.load("stamps", 0);
Store.money = (amount) => amount.toLocaleString("tr-TR") + " ₺";
Store.total = () => Store.cart.reduce((sum, item) => sum + item.price * item.count, 0);
Store.count = () => Store.cart.reduce((sum, item) => sum + item.count, 0);

Store.findProduct = (id) => Store.products.find((product) => product.id === id);
Store.unitPrice = (product, size, milk) => product.price + (size === "Büyük" ? 25 : 0) + (milk === "Yulaf" ? 20 : 0);

Store.saveCart = function () {
    App.save("cart", Store.cart);
    App.setTabBadge("cart", Store.count() || "");
};

Store.add = function (product, size, milk, count) {
    const key = product.id + ":" + size + ":" + milk;
    const existing = Store.cart.find((item) => item.key === key);
    if (existing) {
        existing.count += count;
    } else {
        Store.cart.push({ key: key, id: product.id, name: product.name, size: size, milk: milk, count: count,
            price: Store.unitPrice(product, size, milk) });
    }
    Store.saveCart();
};

Store.order = function () {
    if (!Store.cart.length) return null;
    const order = { number: Date.now().toString().slice(-6), date: new Date().toISOString(), total: Store.total(), count: Store.count() };
    Store.orders.unshift(order);
    Store.orders = Store.orders.slice(0, 20);
    Store.stamps += order.count;
    Store.cart = [];
    App.save("orders", Store.orders);
    App.save("stamps", Store.stamps);
    Store.saveCart();
    return order;
};

App.whenStarted(Store.saveCart);
