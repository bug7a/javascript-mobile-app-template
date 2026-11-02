/* Bismillah */

/*

Mobile App Template: Shop - Product art - v26.11

THE PICTURES OF THE PRODUCTS: small drawings with the color of the product as a parameter, so a chosen color shows
on the picture. In a real shop, put photo files in Store.products and use them instead of Art.image().

*/

"use strict";

const Art = {};

Art.SHADOW = '<ellipse cx="120" cy="214" rx="82" ry="9" fill="#000" opacity=".08"/>';

Art.shapes = {

    tote: (color) => '<path d="M86 96V68a34 34 0 0 1 68 0v28" fill="none" stroke="' + color + '" stroke-width="9" stroke-linecap="round"/>' +
        '<path d="M56 92h128l11 106a11 11 0 0 1-11 12H56a11 11 0 0 1-11-12z" fill="' + color + '"/>' +
        '<path d="M49 166h142l4 32a11 11 0 0 1-11 12H56a11 11 0 0 1-11-12z" fill="#000" opacity=".1"/>' +
        '<circle cx="86" cy="110" r="5" fill="#fff" opacity=".65"/><circle cx="154" cy="110" r="5" fill="#fff" opacity=".65"/>',

    backpack: (color) => '<path d="M96 56V44a24 24 0 0 1 48 0v12" fill="none" stroke="' + color + '" stroke-width="9"/>' +
        '<rect x="58" y="54" width="124" height="156" rx="42" fill="' + color + '"/>' +
        '<rect x="78" y="134" width="84" height="60" rx="14" fill="#000" opacity=".12"/>' +
        '<path d="M78 104h84" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".55"/>' +
        '<rect x="111" y="112" width="18" height="10" rx="4" fill="#fff" opacity=".75"/>',

    crossbody: (color) => '<path d="M62 118C62 28 178 28 178 118" fill="none" stroke="' + color + '" stroke-width="6"/>' +
        '<rect x="50" y="106" width="140" height="102" rx="28" fill="' + color + '"/>' +
        '<path d="M50 134a28 28 0 0 1 28-28h84a28 28 0 0 1 28 28c0 10-30 26-70 26s-70-16-70-26z" fill="#000" opacity=".12"/>' +
        '<circle cx="120" cy="158" r="8" fill="#E2B659"/>',

    sneaker: (color) => '<path d="M34 148c0-20 4-48 18-54 10-5 22 6 30 14 14 14 36 26 64 32 26 5 62 12 62 38v8H34z" fill="' + color + '"/>' +
        '<path d="M34 170h174v16H34z" fill="#000" opacity=".1"/>' +
        '<rect x="26" y="182" width="190" height="24" rx="12" fill="#FFFFFF" stroke="#000" stroke-opacity=".1" stroke-width="2"/>' +
        '<path d="M92 118l-12 14M108 130l-12 14M124 139l-12 14" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".85"/>',

    boot: (color) => '<path d="M72 46h76v90c20 12 62 16 62 50v10H72z" fill="' + color + '"/>' +
        '<path d="M72 46h76v22H72z" fill="#000" opacity=".14"/>' +
        '<path d="M148 100l-16 10M148 118l-16 10" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>' +
        '<rect x="62" y="192" width="156" height="18" rx="7" fill="#3A332D"/>',

    sandal: (color) => '<path d="M42 176c0-20 28-30 84-30 44 0 76 8 76 28 0 22-32 32-80 32-52 0-80-10-80-30z" fill="#D9C3A0"/>' +
        '<path d="M76 150c4-44 92-46 96 2" fill="none" stroke="' + color + '" stroke-width="20"/>' +
        '<path d="M58 160c6-30 40-36 52-6" fill="none" stroke="' + color + '" stroke-width="11"/>',

    mug: (color) => '<path d="M160 112h14a26 26 0 0 1 0 52h-14" fill="none" stroke="' + color + '" stroke-width="13"/>' +
        '<rect x="54" y="82" width="112" height="126" rx="20" fill="' + color + '"/>' +
        '<rect x="54" y="82" width="112" height="26" rx="13" fill="#fff" opacity=".22"/>' +
        '<path d="M92 66c-8-10 8-16 0-28M126 66c-8-10 8-16 0-28" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="6" stroke-linecap="round"/>',

    lamp: (color) => '<path d="M84 44h72l26 72H58z" fill="' + color + '"/>' +
        '<path d="M58 116h124l-10 10H68z" fill="#000" opacity=".12"/>' +
        '<path d="M120 124v72" stroke="#6B625A" stroke-width="8"/>' +
        '<rect x="78" y="194" width="84" height="16" rx="8" fill="#6B625A"/>' +
        '<path d="M92 128h56l14 40H78z" fill="#F6D98A" opacity=".35"/>',

    planter: (color) => '<path d="M120 124C92 112 76 84 84 50c32 8 44 36 36 74zM122 124c6-30 28-48 62-44-2 30-28 50-62 44z" fill="#5E8C61"/>' +
        '<path d="M120 124C110 96 118 64 138 40c16 28 8 60-18 84z" fill="#7BA87A"/>' +
        '<path d="M66 122h108l-12 80a10 10 0 0 1-10 8H88a10 10 0 0 1-10-8z" fill="' + color + '"/>' +
        '<rect x="58" y="114" width="124" height="18" rx="7" fill="' + color + '"/>' +
        '<rect x="58" y="114" width="124" height="18" rx="7" fill="#fff" opacity=".18"/>',

    headphones: (color) => '<path d="M50 136V118a70 70 0 0 1 140 0v18" fill="none" stroke="' + color + '" stroke-width="14" stroke-linecap="round"/>' +
        '<rect x="34" y="122" width="44" height="82" rx="20" fill="' + color + '"/>' +
        '<rect x="162" y="122" width="44" height="82" rx="20" fill="' + color + '"/>' +
        '<rect x="66" y="134" width="12" height="58" rx="6" fill="#000" opacity=".22"/>' +
        '<rect x="162" y="134" width="12" height="58" rx="6" fill="#000" opacity=".22"/>',

    watch: (color) => '<rect x="88" y="26" width="64" height="188" rx="16" fill="' + color + '"/>' +
        '<rect x="66" y="66" width="108" height="108" rx="30" fill="#2B2F36"/>' +
        '<rect x="76" y="76" width="88" height="88" rx="22" fill="#F6F5F0"/>' +
        '<path d="M120 94v28l18 12" fill="none" stroke="#2B2F36" stroke-width="6" stroke-linecap="round"/>',

    speaker: (color) => '<rect x="56" y="46" width="128" height="164" rx="34" fill="' + color + '"/>' +
        '<circle cx="120" cy="146" r="42" fill="#000" opacity=".2"/><circle cx="120" cy="146" r="20" fill="#000" opacity=".3"/>' +
        '<circle cx="120" cy="78" r="12" fill="#fff" opacity=".3"/>',

};

// A picture for Icon.load(): Art.image("tote", "#222222")
Art.image = function (shapeName, color) {
    const drawing = Art.SHADOW + Art.shapes[shapeName](color);
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">' + drawing + "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};
