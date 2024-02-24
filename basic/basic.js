
/* Bismillah */

/*

basic.js (v1.7.4) Create interactive user interfaces with basic programming skills.
- Project Site: https://bug7a.github.io/basic.js/

Copyright 2020-2024 Bugra Ozden <bugra.ozden@gmail.com>
- https://github.com/bug7a

Licensed under the Apache License, Version 2.0

*/

(function() {
"use strict";
const basic = {};
const win = window;

/*
if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = basic;
} else {
    win.basic = basic;
}
*/

win.basic = basic;
basic.startTime = Date.now();

basic.ACTION_COLOR = "#689BD2";
basic.ACTION2_COLOR = "cadetblue";
basic.WARNING_COLOR = "tomato";
basic.ALERT_COLOR = "gold";
basic.CANCEL_COLOR = "lightgray";
basic.TEXT_COLOR = "rgba(0, 0, 0, 0.8)";
basic.BACKGROUND_COLOR = "whitesmoke";
basic.DARK_BACKGROUND_COLOR = "#141414";
basic.FONT_SIZE = 20;
basic.BUTTON_WIDTH = 130;
basic.BUTTON_HEIGHT = 50;
basic.BUTTON_COLOR = basic.ACTION_COLOR;
basic.BUTTON_TEXT_COLOR = "rgba(0, 0, 0, 0.65)";
basic.TEXTBOX_WIDTH = 270;
basic.TEXTBOX_HEIGHT = 50;

basic.gunler = [
    "Pazar",
    "Pazartesi", 
    "Salı", 
    "Çarşamba", 
    "Perşembe", 
    "Cuma", 
    "Cumartesi"
];

basic.days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

basic.aylar = [
    "Ocak", 
    "Şubat", 
    "Mart", 
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık"
];

basic.months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

win.that = null;
win.previousThat = null;
win.prevThat = null;

let defaultContainerBox;
let previousDefaultContainerBox;
let loopTimer;
const resizeDetection = {};
resizeDetection.objectAndFunctionList = [];

const motionController = {};
motionController.WITH_MOTION_TIME = 50;
motionController.DONT_MOTION_TIME = 40;

basic.start = function () {

    // - windows için ayrı css dosyası olabilir.
    /*
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './basic/basic.min.css';
    document.getElementsByTagName('HEAD')[0].appendChild(link);
    */

    win.page = new MainBox();
    page.containerBox = null;
    setDefaultContainerBox(page);

    page.bodyElement.style.margin = "0px";
    page.bodyElement.style.overflow = "hidden";
    // console.log("basic.js: set body { margin: 0px, overflow: hidden }");
    page.mainBox = createBox(0, 0, page.width, page.height);
    //page.mainBox = createBox(0, 0, "100%", "100%");
    page.mainBox.containerBox = null;
    that.element.style.position = "fixed";
    that.color = "transparent";
    
    
    page.onResize(function() {
        if (typeof page.refreshSize === "function") {
            page.refreshSize();
        }
    });
    
    
    if (typeof start === "function") {
        start();
        basic.afterStart();
    }

    if (typeof loop === "function") {
        if(!loopTimer) setLoopTimer(1000);
    }

};

basic.afterStart = function () {
    // Hız testi:
    // var timeUsed = (Date.now() - basic.startTime)
    // console.log(timeUsed);
};

//window.printThePage = window.print;
win.println = function ($message, $type = "log") {
    console[$type]($message);
};
//win.println = basic.println;

win.random = function ($first, $second) {

    let result = 0;

    if ($second != undefined) {

        if ($second < $first) {
            console.error("basic.js: random(): The second parameter (number) must be greater than the first.");
        
        } else {
            result = $first + Math.round(Math.random() * ($second - $first));
        }

    } else {
        console.error("basic.js: random(): Two parameters (numbers) must be sent.");
    }

    return result;

};
//win.random = basic.random;

win.num = function ($str, $type = "float") {

    if ($type == "float") {
        var i = parseFloat($str);
        return Math.round(i * 100) / 100;
        
    } else if ($type == "integer" || $type == "int") {
        return parseInt($str);
    }

};
//win.num = basic.num;

win.str = function ($num) {
    return String($num);
};
//win.str = basic.str;

win.isMobile = function () {

    let answer = 0;

    let a = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) { 
        answer = 1;
    }

    return answer;

};
//win.isMobile = basic.isMobile;

win.go = function ($url, $windowType = "_self") {

    // window.location.href = $url;
    var openedWindow = window.open($url, $windowType);
    // openedWindow.document.write("<p>Test Message</p>");

    return openedWindow;

};
//win.go = basic.go;

// Tek haneli sayıyı, başına "0" ekleyerek iki haneli yapar. 03:10:05
win.twoDigitFormat = function($number) {

    if ($number <= 9) {
        $number = "0" + $number;
    }

    return $number;

};
//win.twoDigitFormat = basic.twoDigitFormat;

win.storage = {

    save(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    load(key) {
        return JSON.parse(window.localStorage.getItem(key));
    },
    remove(key) {
        window.localStorage.removeItem(key);
    }

};
//win.storage = basic.storage;

win.clock = {

    get hour() {
        let dt = new Date();
        return dt.getHours();
    },
    get minute() {
        let dt = new Date();
        return dt.getMinutes();
    },
    get second() {
        let dt = new Date();
        return dt.getSeconds();
    }, 
    get milisecond() {
        let dt = new Date();
        return dt.getMilliseconds();
    }

};
//win.clock = basic.clock;

win.date = {

    get year() {
        let dt = new Date();
        return dt.getFullYear();
    },
    get monthNumber() {
        let dt = new Date();
        let month = dt.getMonth();
        month++;
        return month;
    },
    get ayAdi() {
        return basic.aylar[this.monthNumber - 1];
    },
    get monthName() {
        return basic.months[this.monthNumber - 1];
    },
    get dayNumber() {
        let dt = new Date();
        return dt.getDay();
    },
    get gunAdi() {
        return basic.gunler[this.dayNumber];
    },
    get dayName() {
        return basic.days[this.dayNumber];
    },
    get today() {
        let dt = new Date();
        return dt.getDate();
    },
    get now() {
        return Date.now();
    }

};
//win.date = basic.date;

// Common methods and properties of basic objects.
class Basic_UIComponent {

    /*
    _type;
    _containerBox;

    _element;
    _visible;
    _displayType;
    _opacity;
    _rotate;

    _backgroundColor;

    _border;
    _borderColor;
    _round;
    
    _fontSize;
    _textColor;
    _textAlign;

    _motionString;
    _clickable;
    */

    constructor($type) {

        this._type = $type;

        this._visible = 1;
        this._displayType = "block";
        this._opacity = 1;
        this._rotate = 0;

        this._motionString = "none";
        this._clickable = 0;
        this._eventFuncList = [];

    }

    // alternative for containerBox
    get parentBox() {
        return this._containerBox;
    }

    // alternative for containerBox
    set parentBox($value) {
        this._containerBox = $value;
    }

    get containerBox() {
        return this._containerBox;
    }

    set containerBox($value) {
        this._containerBox = $value;
    }

    // Hizalama ve boyutlandırma.

    get left() {
        if (this.position == "absolute") {
            return parseFloat(this.contElement.style.left);
        } else {
            return this.contElement.offsetLeft;
        }
    }

    set left($value) {
        this.contElement.style.right = "";
        this.contElement.style.left = parseFloat($value) + "px";
    }

    get top() {
        if (this.position == "absolute") {
            return parseFloat(this.contElement.style.top);
        } else {
            return this.contElement.offsetTop;
        }
    }

    set top($value) {
        this.contElement.style.bottom = "";
        this.contElement.style.top = parseFloat($value) + "px";
    }

    get right() {
        return parseFloat(this.contElement.style.right);
    }

    set right($value) {
        this.contElement.style.left = "";
        this.contElement.style.right = parseFloat($value) + "px";
    }

    get bottom() {
        return parseFloat(this.contElement.style.bottom);
    }

    set bottom($value) {
        this.contElement.style.top = "";
        this.contElement.style.bottom = parseFloat($value) + "px";
    }
    
    get width() {

        if (typeof this._width != "string") {
            return this._width || 0;
        } else {
            return this.contElement.offsetWidth;
        }

    }

    set width($value) {

        // VALUES TYPE:
        // 100
        // "auto"
        // "100%"
        // "calc(100% - 10px)"
        
        this._width = $value;

        if (typeof $value != "string") {
            this.contElement.style.width = parseFloat($value) + "px";
        } else {
            this.contElement.style.width = $value;
        }
        
    }

    get height() {

        if (typeof this._height != "string") {
            return this._height || 0;
        } else {
            return this.contElement.offsetHeight;
        }
        
    }

    set height($value) {
        
        this._height = $value;

        if (typeof $value != "string") {
            this.contElement.style.height = parseFloat($value) + "px";
        } else {
            this.contElement.style.height = $value;
        }

    }

    get rotate() {
        return this._rotate;
    }

    set rotate($value) {
        this._rotate = parseInt($value);
        this.contElement.style.transform = "rotate(" + $value + "deg)";
    }

    // -- Hizalama ve boyutlandırma SONU

    // Genel özellikler

    get visible() {
        return this._visible;
    }

    set visible($value) {

        this._visible = $value;

        // display tipini daha sonra kullanmak üzere sakla.
        if (this.contElement.style.display && this.contElement.style.display != "none") {
            this._displayType = this.contElement.style.display;
        }

        this.contElement.style.display = ($value == 1) ? this._displayType : "none";

    }

    get clickable() {
        return this._clickable;
    }

    set clickable($value) {
        this._clickable = $value;
        this.contElement.style.pointerEvents = ($value == 1) ? "auto" : "none";
    }

    get opacity() {
        return this._opacity;
    }

    set opacity($value) {
        this._opacity = $value;
        this.contElement.style.opacity = $value;
    }

    get color() {
        return this._backgroundColor;
    }

    set color($value) {
        this._backgroundColor = $value;
        this.contElement.style.backgroundColor = $value;
    }

    // -- Genel özellikler SONU

    // Kenarlık

    get border() {
        return this._border;
    }

    set border($value) {
        this._border = $value;
        this.contElement.style.borderWidth = $value + "px";
    }

    get borderColor() {
        return this._borderColor;
    }

    set borderColor($value) {
        this._borderColor = $value;
        this.contElement.style.borderColor = $value;
    }

    get round() {
        return this._round;
    }

    set round($value) {
        this._round = $value;
        this.contElement.style.borderRadius = $value + "px";
    }

    // -- Kenarlık SONU
    
    // Metin özellikleri
    
    get fontSize() {
        return this._fontSize;
    }

    set fontSize($value) {
        this._fontSize = $value;
        this.element.style.fontSize = $value + "px";
    }

    // fontSize Alternatif kullanım.
    get textSize() {
        return this._fontSize;
    }

    set textSize($value) {
        this._fontSize = $value;
        this.element.style.fontSize = $value + "px";
    }
    
    get textColor() {
        return this._textColor;
    }

    set textColor($value) {
        this._textColor = $value;
        this.element.style.color = $value;
    }

    get textAlign() {
        return this._textAlign;
    }

    set textAlign($value) {
        this._textAlign = $value;
        this.element.style.textAlign = $value;
    }
    
    // Metin özellikleri SONU

    get position() {
        return (this.contElement.style.position) ? this.contElement.style.position : "absolute";
    }

    set position($value) {
        this.contElement.style.position = $value;

        if ($value == "relative") {
            this.left = 0;
            this.top = 0;
        }
    }

    // Otomatik hizalama metodları

    center($position) {
        moveToCenter(this, $position);
    }

    centerBy($obj, $position) {
        moveToCenterBy(this, $obj, $position);
    }

    aline($obj, $position, $space = 0, $secondPosition) {
        moveToAline(this, $obj, $position, $space, $secondPosition);
    }

    // -- Otomatik hizalama metodları SONU
    
    // Nesneyi sil.
    remove() {
        this.contElement.remove();
    }

    // Toplu özellik değiştirmesi.
    props($defaultParams, $params, $props) {
        setProparties(this, $defaultParams, $params, $props);
    }

    // Olay eklemek.
    _addEventListener($eventName, $func, $element) {
        let _that = this;
        var eventFunc = function ($ev) {
            $func(_that, $ev);
        }
        $element.addEventListener($eventName, eventFunc);

        var eventDateItem = {}
        eventDateItem.eventName = $eventName;
        eventDateItem.originalFunc = $func;
        eventDateItem.func = eventFunc;
        eventDateItem.element = $element;
        this._eventFuncList.push(eventDateItem);
    }

    _removeEventListener($eventName, $func, $element) {
        var func = null
        for (var i = 0; i < this._eventFuncList.length; i++) {
            if (this._eventFuncList[i].originalFunc == $func) {
                func = this._eventFuncList[i].func;
                this._eventFuncList.splice(i, 1);
                break;
            }
        }
        if (func) {
            $element.removeEventListener($eventName, func);
        }   
    }

    onResize($func) {
        resizeDetection.onResize(this, $func);
    }

    remove_onResize($func) {
        resizeDetection.remove_onResize(this.element, $func);
    }

    // Hareket
    setMotion($motionString) {

        // example motionString: "left 1s, top 1s, width 1s, height 1s, transform 1s, background-color 1s, border-radius 1s, opacity 1s"
        // example motionString: "all 0.3s"
        //this.setMotionNow($motionString);
        var _that = this;

        setTimeout(function(){
            _that.setMotionNow($motionString);
        }, motionController.DONT_MOTION_TIME);

    }

    getMotion() {
        return this._motionString;
    }

    setMotionNow($motionString) {

        this._motionString = $motionString;
        this.contElement.style.transition = $motionString;

    }

    // Özellik değişimi, hareket ile olsun.
    withMotion($func) {

        var _that = this;

        setTimeout(function() {
            _that.canMotionNow();
             $func(_that);
         }, motionController.WITH_MOTION_TIME);

    }

    // Harekete, belli bir süre ara ver.
    dontMotion() {

        this.contElement.style.transition = "none";
        var _that = this;

        setTimeout(function(){
            _that.contElement.style.transition = _that._motionString;
        }, motionController.DONT_MOTION_TIME);

    }

    // Harekete arayı, süresi dolmadan iptal et.
    canMotionNow() {
        this.contElement.style.transition = this._motionString;
    }

}

/* MAINBOX COMPONENT (page) */
class MainBox {

    /*
    _box;
    _element;
    _bodyElement;
    _backgroundColor;
    _zoom;
    */

    constructor() {

        this._bodyElement = document.getElementsByTagName("BODY")[0];
        this._element = this._bodyElement;

        this._backgroundColor = "white";
        this._zoom = 1;

    }

    // short usage of element
    get elem() {
        return this._element;
    }

    get element() {
        return this._element;
    }

    get contElement() {
        return this._element;
    }

    get bodyElement() {
        return this._bodyElement;
    }

    get mainBox() {
        return this._box;
    }

    set mainBox($value) {
        this._box = $value;
        this._element = this._box.element;
    }

    get width() {
        let _w;
        _w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return basic.withPageZoom(_w);
    }

    get height() {
        let _h;
        _h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return basic.withPageZoom(_h);
    }

    get zoom() {
        return this._zoom;
    }

    set zoom($value) {
        this._zoom = $value;
        this.bodyElement.style.transformOrigin = "top left";
        this.bodyElement.style.transform = "scale(" + $value + ")";

        page.refreshSize();

    }

    get color() {
        return this._backgroundColor;
    }

    set color($value) {
        this._backgroundColor = $value;
        this.bodyElement.style.backgroundColor = $value;
    }

    fit($value = document.body.clientWidth, $maxValue) {

        page.zoom = 1
        let _w = page.width;

        // ikinci değer yok ise,
        $maxValue = $maxValue || $value;

        // ekran genişliği izin verilenden fazla ise,
        if (_w > $maxValue) {
            page.zoom = $maxValue / $value;
        } else {
            page.zoom = _w / $value;
        }

    }

    refreshSize() {
        page.mainBox.width = page.width;
        page.mainBox.height = page.height;
    }    

    onClick($func) {
        this._box._addEventListener("click", $func, window);
    }

    remove_onClick($func) {
        this._box._removeEventListener("click", $func, window);
    }

    onResize($func) {
        this._box._addEventListener("resize", $func, window);
    }

    remove_onResize($func) {
        this._box._removeEventListener("resize", $func, window);
    }

    add($obj) {
        // Eklenen nesnenin, üst nesnesi değişiyor.
        if ($obj.containerBox != this) {
            $obj.containerBox = this;
            // this.box.clickable = 1;
            this.element.appendChild($obj.contElement);
        }
    }

}

/* BOX COMPONENT */
class BBox extends Basic_UIComponent {

    constructor($left = -1000, $top = -1000, $width = 100, $height = 100) {
        
        super("box");

        // Renk
        this._backgroundColor = "whitesmoke";

        // Kenarlık
        this._border = 0;
        this._borderColor = "rgba(0, 0, 0, 0.6)";
        this._round = 0;
        
        // Text
        this._fontSize = 16;
        this._textColor = "rgba(0, 0, 0, 0.8)";
        this._textAlign = "left";

        let divElement = document.createElement("DIV");
        divElement.classList.add("basic_box");

        divElement.style.left = $left + "px";
        divElement.style.top = $top + "px";

        this._element = divElement;
        this._containerBox = defaultContainerBox;
        defaultContainerBox.element.appendChild(this._element);

        this.width = $width;
        this.height = $height;

        if (defaultContainerBox.element.style.display == "flex") {
            this.position = "relative";
        }

        makeBasicObject(this);

    }

    get elem() {
        return this._element;
    }

    get element() {
        return this._element;
    }

    get contElement() {
        return this._element;
    }

    get text() {
        return this.element.innerHTML;
    }

    set text($value) {
        this.element.innerHTML = $value;
    }

    // .text alternatif kullanım:
    get html() {
        return this.element.innerHTML;
    }

    set html($value) {
        this.element.innerHTML = $value;
    }
    
    get scrollX() {
        return (this.contElement.style.overflowX == "auto") ? 1 : 0;
    }

    get scrollY() {
        return (this.contElement.style.overflowY == "auto") ? 1 : 0;
    }

    set scrollX($value) {
        this.contElement.style.overflowX = "hidden";

        if ($value == 1) {
            this.clickable = 1;
            this.contElement.style.overflowX = "auto";
        }
    }

    set scrollY($value) {
        this.contElement.style.overflowY = "hidden";

        if ($value == 1) {
            this.clickable = 1;
            this.contElement.style.overflowY = "auto";
        }
    }

    onClick($func) {
        this.clickable = 1;
        this._addEventListener("click", $func, this.contElement);
    }

    remove_onClick($func) {
        this._removeEventListener("click", $func, this.contElement);
    }

    add($obj) {
        if ($obj.containerBox != this) {
            // Eklenen nesnenin, üst nesnesini değiştir.
            $obj.containerBox = this;
            // İçine başka bir nesne eklendiğinde, artık basılabilir.
            //this.clickable = 1;
            this.element.appendChild($obj.contElement);
        }
    }

    // Ağaç şeklinde kod blokları oluştumak için bir teknik. (Deneysel Teknik)
    in($func) {
        var _selectedBox = getDefaultContainerBox();
        setDefaultContainerBox(this);
        $func(this);
        setDefaultContainerBox(_selectedBox);
    }

}
//win.Box = Box;

// Alternatif kullanım
win.createBox = function ($left, $top, $width, $height) {
    return new BBox($left, $top, $width, $height);
}

// Alternatif kullanım
/*
win.cbox = function ($left, $top, $width, $height) {
    return new BBox($left, $top, $width, $height);
}
*/

/* BUTTON COMPONENT */
class BButton extends Basic_UIComponent {

    constructor($left = -1000, $top = -1000, $width = basic.BUTTON_WIDTH, $height = basic.BUTTON_HEIGHT) {

        super("button");

        // renk
        this._backgroundColor = basic.BUTTON_COLOR;

        // kenarlık
        this._border = 1;
        this._borderColor = "rgba(0, 0, 0, 0.40)";
        this._round = 4;
        
        // text
        this._fontSize = 20;
        this._textColor = basic.BUTTON_TEXT_COLOR;
        this._textAlign = "center";

        this._clickable = 1;

        let buttonElement = document.createElement("BUTTON");
        buttonElement.innerHTML = "Button";
        buttonElement.classList.add("basic_button");
        buttonElement.setAttribute("type", "button");

        buttonElement.style.left = $left + "px";
        buttonElement.style.top = $top + "px";

        this._element = buttonElement;
        this._containerBox = defaultContainerBox;
        defaultContainerBox.element.appendChild(this._element);

        this.width = $width;
        this.height = $height;

        if (defaultContainerBox.element.style.display == "flex") {
            this.position = "relative";
        }

        makeBasicObject(this);

    }

    get elem() {
        return this._element;
    }

    get element() {
        return this._element;
    }

    get contElement() {
        return this._element;
    }

    get buttonElement() {
        return this._element;
    }

    get text() {
        return this.buttonElement.innerHTML;
    }

    set text($value) {
        this.buttonElement.innerHTML = $value;
    }

    // Buttonun value özelliğini kullan.
    get value() {
        return this.buttonElement.value;
    }

    set value($value) {
        this.buttonElement.value = $value;
    }

    get enabled() {
        return (this.buttonElement.disabled) ? 0 : 1;
    }

    set enabled($value) {
        this.buttonElement.disabled = ($value) ? 0 : 1;
    }

    get minimal() {
        return (this.buttonElement.classList.contains("minimal")) ? 1 : 0;
    }

    set minimal($value) {
        if ($value) {
            this.buttonElement.classList.add("minimal");
        } else {
            this.buttonElement.classList.remove("minimal");
        }
    }

    get spaceX() {
        return parseInt(this.contElement.style.paddingLeft) || 0;
    }

    set spaceX($value) {
        this.contElement.style.paddingLeft = $value + "px";
        this.contElement.style.paddingRight = $value + "px";
    }

    onClick($func) {
        this.clickable = 1;
        this._addEventListener("click", $func, this.buttonElement);
    }

    remove_onClick($func) {
        this._removeEventListener("click", $func, this.buttonElement);
    }

    add($obj) {
        console.error("basic.js: add(): Insertion cannot be made inside the Button object.");
    }

}
//win.Button = Button;

// Alternatif kullanım1
win.createButton = function ($left, $top, $width, $height) {
    return new BButton($left, $top, $width, $height);
}

// Alternatif kullanım 2
/*
win.cbtn = function ($left, $top, $width, $height) {
    return new BButton($left, $top, $width, $height);
}
*/

/* TEXTBOX COMPONENT */
class BTextBox extends Basic_UIComponent {

    /*
    _titleElement;
    _mainElement;
    */

    constructor($left = -1000, $top = -1000, $width = basic.TEXTBOX_WIDTH, $height = basic.TEXTBOX_HEIGHT) {

        super("textbox");

        // renk
        this._backgroundColor = "white";

        // kenarlık
        this._border = 1;
        this._borderColor = "#4A4A4A";
        this._round = 4;
        
        // Text
        this._fontSize = 20;
        this._textColor = "#4A4A4A";
        this._textAlign = "left";

        this._clickable = 1;

        let mainElement = document.createElement("DIV");
        mainElement.classList.add("basic_textbox-main");
        this._mainElement = mainElement;

        let titleElement = document.createElement("DIV");
        titleElement.classList.add("basic_textbox-title");
        titleElement.innerHTML = "";
        this._titleElement = titleElement;

        let element = document.createElement("INPUT");
        element.value = "";
        element.classList.add("basic_textbox");
        element.setAttribute("type", "text");
        element.style.width = "100%";
        element.style.height = "100%";
        this._element = element;

        mainElement.style.left = $left + "px";
        mainElement.style.top = $top + "px";

        mainElement.appendChild(this._titleElement);
        mainElement.appendChild(this._element);

        this._containerBox = defaultContainerBox;
        defaultContainerBox.element.appendChild(this._mainElement);

        this.width = $width;
        this.height = $height;

        if (defaultContainerBox.element.style.display == "flex") {
            this.position = "relative";
        }

        makeBasicObject(this);

    }

    get elem() {
        return this._mainElement;
    }

    get element() {
        return this._mainElement;
    }

    get inputElement() {
        return this._element;
    }

    get contElement() {
        return this._mainElement;
    }

    get titleElement() {
        return this._titleElement;
    }

    get text() {
        return this.inputElement.value;
    }

    set text($value) {
        this.inputElement.value = $value.toString();
    }

    // ÖZEL: Renk özelliği
    get color() {
        return super.color;
    }

    set color($value) {
        this._backgroundColor = $value;
        this.inputElement.style.backgroundColor = $value;
    }
    // ÖZEL SONU

    get title() {
        return this.titleElement.innerHTML;
    }

    set title($value) {
        this.titleElement.innerHTML = $value;
    }

    get enabled() {
        return (this.inputElement.disabled) ? 0 : 1;
    }

    set enabled($value) {
        this.inputElement.disabled = ($value) ? 0 : 1;
    }

    // ÖZEL: Kenarlık
    set border($value) {
        this._border = $value;
        this.inputElement.style.borderWidth = $value + "px";
    }

    get border() {
        return super.border;
    }

    get borderColor() {
        return super.borderColor;
    }

    set borderColor($value) {
        this._borderColor = $value;
        this.inputElement.style.borderColor = $value;
    }

    set round($value) {
        this._round = $value;
        this.inputElement.style.borderRadius = $value + "px";
    }

    get round() {
        return super.round;
    }
    // Özel kenarlık SONU

    // ÖZEL

    get clickable() {
        return super.clickable;
    }

    set clickable($value) {
        this._clickable = $value;
        this.inputElement.style.pointerEvents = ($value == 1) ? "auto" : "none";
    }
    
    get fontSize() {
        return super.fontSize;
    }

    set fontSize($value) {
        this._fontSize = $value;
        this.inputElement.style.fontSize = $value + "px";
    }

    get textSize() {
        return super.textSize;
    }

    set textSize($value) {
        this._fontSize = $value;
        this.inputElement.style.fontSize = $value + "px";
    }
    
    get textColor() {
        return super.textColor;
    }

    set textColor($value) {
        this._textColor = $value;
        this.inputElement.style.color = $value;
    }

    get textAlign() {
        return super.textAlign;
    }

    set textAlign($value) {
        this._textAlign = $value;
        this.inputElement.style.textAlign = $value;
    }

    get minimal() {
        return (this.inputElement.classList.contains("minimal")) ? 1 : 0;
    }

    set minimal($value) {
        if ($value) {
            this.inputElement.classList.add("minimal");
        } else {
            this.inputElement.classList.remove("minimal");
        }
    }

    onChange($func) {
        this._addEventListener("change", $func, this.inputElement);
    }

    remove_onChange($func) {
        this._removeEventListener("change", $func, this.inputElement);
    }

    add($obj) {
        console.error("basic.js: add(): Insertion cannot be made inside the TextBox object.");
    }

}
//win.TextBox = TextBox;

// Alternatif kullanım
win.createTextBox = function ($left, $top, $width, $height) {
    return new BTextBox($left, $top, $width, $height);
}

win.createInput = function ($left, $top, $width, $height) {
    return new BTextBox($left, $top, $width, $height);
}

// Alternatif kullanım
/*
win.ctxt = function ($left, $top, $width, $height) {
    return new BTextBox($left, $top, $width, $height);
}
*/

/* LABEL COMPONENT */
class BLabel extends Basic_UIComponent {

    constructor($left = -1000, $top = -1000, $width = "auto", $height = "auto") {

        super("label");

        //this._value = "";
        this._backgroundColor = "transparent";

        // Kenarlık
        this._border = 0;
        this._borderColor = "rgba(0, 0, 0, 0.6)";
        this._round = 0;
        
        // Text
        this._fontSize = 20;
        this._textColor = "rgba(0, 0, 0, 0.8)";
        this._textAlign = "left";

        let divElement = document.createElement("DIV");

        divElement.innerHTML = "Label Text";
        divElement.classList.add("basic_label");

        divElement.style.left = $left + "px";
        divElement.style.top = $top + "px";

        this._element = divElement;
        this._containerBox = defaultContainerBox;
        defaultContainerBox.element.appendChild(this._element);

        this.width = $width;
        this.height = $height;

        if (defaultContainerBox.element.style.display == "flex") {
            this.position = "relative";
        }

        makeBasicObject(this);

    }

    //sample: <b>text</b><br />

    get elem() {
        return this._element;
    }

    get element() {
        return this._element;
    }

    get contElement() {
        return this._element;
    }

    get text() {
        return this.element.innerHTML;
    }

    set text($value) {
        this.element.innerHTML = $value;
    }

    get space() {
        return parseInt(this.contElement.style.padding) || 0;
    }

    set space($value) {
        this.contElement.style.padding = $value + "px";
    }

    get spaceX() {
        return parseInt(this.contElement.style.paddingLeft) || 0;
    }

    set spaceX($value) {
        this.contElement.style.paddingLeft = $value + "px";
        this.contElement.style.paddingRight = $value + "px";
    }

    get spaceY() {
        return parseInt(this.contElement.style.paddingTop) || 0;
    }

    set spaceY($value) {
        this.contElement.style.paddingTop = $value + "px";
        this.contElement.style.paddingBottom = $value + "px";
    }

    onClick($func) {
        this.clickable = 1;
        this._addEventListener("click", $func, this.contElement);
    }

    remove_onClick($func) {
        //this.clickable = 0;
        this._removeEventListener("click", $func, this.contElement);
    }

    add($obj) {
        console.error("basic.js: add(): Insertion cannot be made inside the Label object.");
    }

}
//win.Label = Label;

// Alternatif kullanım
win.createLabel = function ($left, $top, $width, $height) {
    return new BLabel($left, $top, $width, $height);
}

// Alternatif kullanım
/*
win.clbl = function ($left, $top, $width, $height) {
    return new BLabel($left, $top, $width, $height);
}
*/

//window.ImageObj = window.Image;

/* IMAGE COMPONENT */
class BImage extends Basic_UIComponent {

    // Not: CheckBox resim nesnesi ile yapılabilir.
    /*
    _autoSize;
    */

    constructor($left = -1000, $top = -1000, $width = 0, $height = 0) {

        super("image");

        this._autoSize = 1;
        this._space = 0;

        // Renk
        this._backgroundColor = "transparent";

        // kenarlık
        this._border = 0;
        this._borderColor = "rgba(0, 0, 0, 0.6)";
        this._round = 0;

        let imageElement = document.createElement("IMG");
        imageElement.classList.add("basic_image");

        imageElement.style.left = $left + "px";
        imageElement.style.top = $top + "px";

        this._element = imageElement;
        this._containerBox = defaultContainerBox;
        defaultContainerBox.element.appendChild(this._element);

        super.width = $width;
        super.height = $height;

        var _that = this;

        if ($width || $height) {
            this.autoSize = 0;
        }

        // Resim yüklendiğinde, Otomatik boyutlandır.
        imageElement.addEventListener('load', function () {

            // if auto size
            if (_that.autoSize > 0) {
                
                const _autoSize = _that.autoSize;

                _that.width = parseInt(_that.naturalWidth / _autoSize) + "px";
                _that.height = parseInt(_that.naturalHeight / _autoSize) + "px";

            }

        });

        if (defaultContainerBox.element.style.display == "flex") {
            this.position = "relative";
        }

        makeBasicObject(this);

    }

    get elem() {
        return this._element;
    }

    get element() {
        return this._element;
    }

    get imageElement() {
        return this._element;
    }

    get contElement() {
        return this._element;
    }

    // Özel boyutlandırma komutları
    
    get width() {
        return super.width;
    }

    set width($value) {
        this.autoSize = 0;
        super.width = $value;
    }
    
    get height() {
        return super.height;
    }
    
    set height($value) {
        this.autoSize = 0;
        super.height = $value;
    }

    // Resim yüklendikten sonra, çalışır.
    get naturalWidth() {
        return this.imageElement.naturalWidth;
    }

    get naturalHeight() {
        return this.imageElement.naturalHeight;
    }

    // Resmi orjinal boyutuna ölçekler. 1: orjinal, 2: 2 kat küçült, 3: 3 kat küçült.
    get autoSize() {
        return this._autoSize;
    }

    set autoSize($value) {
        this._autoSize = $value;
    }

    get space() {
        return this._space;
        // return parseInt(this.contElement.style.padding) || 0;
    }
    
    set space($value) {

        if ($value > 50) {
            $value = 50;
        }

        if ($value < 0) {
            $value = 0;
        }

        this._space = $value;
        //this.contElement.style.padding = String($value + "%");
        var spaceX = parseInt((this.width / 100) * $value);
        var spaceY = parseInt((this.height / 100) * $value);

        this.contElement.style.paddingLeft = spaceX + "px";
        this.contElement.style.paddingRight = spaceX + "px";
        this.contElement.style.paddingTop = spaceY + "px";
        this.contElement.style.paddingBottom = spaceY + "px";

    }

    onClick($func) {
        this.clickable = 1;
        this._addEventListener("click", $func, this.contElement);
    }

    remove_onClick($func) {
        //this.clickable = 0;
        this._removeEventListener("click", $func, this.contElement);
    }

    onLoad($func) {
        this._addEventListener("load", $func, this.imageElement);
    }

    remove_onLoad($func) {
        this._removeEventListener("load", $func, this.imageElement);
    }

    load($imagePath) {
        this.imageElement.setAttribute("src", $imagePath);
    }

    add($obj) {
        console.error("basic.js: add(): Insertion cannot be made inside the BImage object.");
    }

}
//win.BImage = BImage;

// Alternatif kullanım
win.createImage = function ($left, $top, $width, $height) {

    return new BImage($left, $top, $width, $height);

}

win.createIcon = function ($left, $top, $width, $height) {

    return new BImage($left, $top, $width, $height);

}

// Alternatif kullanım
/*
win.cimg = function ($left, $top, $width, $height) {
    return new BImage($left, $top, $width, $height);
}
*/

class Sound {

    /*
    _element;
    */

    constructor() {

        let element = document.createElement("AUDIO");
        let source = document.createElement("SOURCE");

        element.appendChild(source);

        this._element = element;
        document.body.appendChild(this._element);

        makeBasicObject(this);

    }

    get element() {
        return this._element;
    }

    get soundElement() {
        return this._element;
    }

    get contElement() {
        return this._element;
    }

    get time() {
        return this.element.timr;
    }

    get timeLeft() {
        return this.element.timeLeft;
    }

    get currentTime() {
        return this.element.currentTime;
    }

    get paused() {
        return this.element.paused;
    }

    get playing() {
        return !this.element.paused;
    }

    get loop() {
        return (this.element.getAttribute("loop") == "loop") ? 1 : 0;
    }

    set loop($value) {
        if ($value == 1) {
            this.element.setAttribute("loop", "loop");
        } else {
            this.element.setAttribute("loop", "");
        }
    }

    play() {
        if (this.paused) {
            this.element.play();
        }
    }

    pause($value) {
        if (!this.paused) {
            this.element.pause();
        }
    }

    stop() {
        if (!this.paused) {
            this.element.pause();
            this.element.currentTime = 0;
        }
    }
    
    onLoad($func) {
        let _that = this;
        this.element.addEventListener("canplaythrough", function () {
            $func(_that);
        });
    }

    load($path) {

        let fileType = "audio/wav";

        if ($path.substr(-3).toLowerCase() == "mp3") {
            fileType = "audio/mpeg";
        }

        this.element.children[0].setAttribute("src", $path);
        this.element.children[0].setAttribute("type", fileType);

    }

    remove() {
        this.contElement.remove();
    }

};


/* ### FUNCTIONS ### */

// Set styles with style object.
const setProparties = function ($this, $defaultParams = [], $params = [], $props = []) {

    // Tüm özellikleri bu değişkende topla.
    let allProps = {};

    // defaultPrams
    for (let parameterName in $defaultParams) {
        allProps[parameterName] = $defaultParams[parameterName];
    }
    // params
    for (let parameterName in $params) {
        allProps[parameterName] = $params[parameterName];
    }
    // props
    for (let propName in $props) {
        allProps[propName] = $props[propName];
    }

    // Tüm özellikleri tek seferde nesneye uygula.
    for (let propName in allProps) {
        $this[propName] = allProps[propName];
    }

};

// Centering one object to box.
const moveToCenter = function ($this, $position) {

    if ($position == "left" || !$position) {
        let _w = $this.containerBox.width - (($this.containerBox.border || 0) * 2);
        $this.left = parseInt((_w - $this.width) / 2);

    }

    if ($position == "top" || !$position) {
        let _h = $this.containerBox.height - (($this.containerBox.border || 0) * 2);
        $this.top = parseInt((_h - $this.height) / 2);

    }

    // Her zaman tam sayı olarak ortala, yoksa bulanıklık yapabilir.
    // NOT: Eğer, kenarlık kalınlıkları, aynı olmaz ise, hesaba katılmaz.

};

// Centering one object to an other object.
const moveToCenterBy = function ($this, $obj, $position) {

    if ($position == "left" || !$position) {
        let _w = $obj.width;
        $this.left = parseInt((_w - $this.width) / 2) + $obj.left;

        if ($position) {
            $this.top = $obj.top;
        }

    }

    if ($position == "top" || !$position) {
        let _h = $obj.height;
        $this.top = parseInt((_h - $this.height) / 2) + $obj.top;

        if ($position) {
            $this.left = $obj.left;
        }

    }

};

// Alignment of one object with respect to another object.
const moveToAline = function ($this, $obj, $position, $space, $secondPosition) {

    if ($position == "left") {
        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left - $this.width - $space);

        } else if (!isNaN($obj.right)) {
            $this.right = parseInt($obj.right + $obj.width + $space);

        }

        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top);

        } else {
            $this.bottom = parseInt($obj.bottom);

        }

    } else if ($position == "top") {
        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top - $this.height - $space);

        } else if (!isNaN($obj.bottom)) {
            $this.bottom = parseInt($obj.bottom + $obj.height + $space);

        }

        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left);

        } else {
            $this.right = parseInt($obj.right);

        }


    } else if ($position == "right") {
        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left + $obj.width + $space);

        } else if (!isNaN($obj.right)) {
            $this.right = parseInt($obj.right - $this.width - $space);

        }

        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top);

        } else {
            $this.bottom = parseInt($obj.bottom);

        }

    } else if ($position == "bottom") {
        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top + $obj.height + $space);

        } else if (!isNaN($obj.bottom)) {
            $this.bottom = parseInt($obj.bottom - $this.height - $space);

        }

        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left);

        } else {
            $this.right = parseInt($obj.right);

        }


    } else {

        if (!isNaN($obj.top)) {
            $this.top = parseInt($obj.top);

        } else if (!isNaN($obj.bottom)) {
            $this.bottom = parseInt($obj.bottom);

        }

        if (!isNaN($obj.left)) {
            $this.left = parseInt($obj.left);

        } else if (!isNaN($obj.right)) {
            $this.right = parseInt($obj.right);

        }

    }

    if ($position == "left" || $position == "right") {

        var _difference = $obj.height - $this.height;

        switch ($secondPosition) {
            case "top":
                if (!isNaN($obj.top)) {
                    //$this.top += parseInt($obj.top);
        
                } else if (!isNaN($obj.bottom)) {
                    $this.bottom += parseInt(_difference);
        
                }
                break;
            case "bottom":
                if (!isNaN($obj.top)) {
                    $this.top += parseInt(_difference);
        
                } else if (!isNaN($obj.bottom)) {
                    //$this.bottom = parseInt($obj.bottom);
        
                }
                break;
            case "center":
                if (!isNaN($obj.top)) {
                    $this.top += parseInt(_difference / 2);
        
                } else if (!isNaN($obj.bottom)) {
                    $this.bottom += parseInt(_difference / 2);
        
                }
                break;
        }

    } else if ($position == "top" || $position == "bottom") {

        var _difference = $obj.width - $this.width;

        switch ($secondPosition) {
            case "left":
                if (!isNaN($obj.left)) {
                    //$this.left = parseInt($obj.left);
        
                } else if (!isNaN($obj.right)) {
                    $this.right = parseInt($obj.right + _difference);
        
                }
                break;
            case "right":
                if (!isNaN($obj.left)) {
                    $this.left += parseInt(_difference);
        
                } else if (!isNaN($obj.right)) {
                    //$this.right = parseInt($obj.right);
        
                }
                break;
            case "center":
                if (!isNaN($obj.left)) {
                    $this.left += parseInt(_difference / 2);
        
                } else if (!isNaN($obj.right)) {
                    $this.right += parseInt(_difference / 2);
        
                }
                break;
        }

    }
    
};

basic.withPageZoom = function ($value) {
    return parseFloat($value * (1 / page.zoom));
};
win.withPageZoom = basic.withPageZoom;

basic.setLoopTimer = function ($time) {
    
    if (typeof loop === "function") {

        // Daha önceden oluşturulmuş ise temizle.
        if (loopTimer) { 
            loopTimer = clearInterval(loopTimer);
        }

        // Yenisini oluştur.
        if ($time == 0) {
            // Eğer tekrarlama zamanı 0 ise yenisini oluşturma.
        } else {
            loopTimer = setInterval(loop, $time);
        }
        
    }

};
win.setLoopTimer = basic.setLoopTimer;

// Yeni eklenen nesneler, seçili box nesnesinin içinde oluşturulur.
basic.setDefaultContainerBox = function ($box) {

    previousDefaultContainerBox = defaultContainerBox || page;
    defaultContainerBox = $box;

};
win.setDefaultContainerBox = basic.setDefaultContainerBox;

basic.restoreDefaultContainerBox = function() {
    defaultContainerBox = previousDefaultContainerBox || page;
};
win.restoreDefaultContainerBox = basic.restoreDefaultContainerBox;

// Nesne hangi kutu nesnesinin içine eklendiği.
basic.getDefaultContainerBox = function () {
    return defaultContainerBox;
};
win.getDefaultContainerBox = basic.getDefaultContainerBox;

// Add your custom object to basic.js ecosystem.
basic.makeBasicObject = function($newObject) {

    // Object can be called as that.
    previousThat = that;
    prevThat = previousThat;
    that = $newObject;

};
win.makeBasicObject = basic.makeBasicObject;

resizeDetection.onResize = function($object, $func) {

    var object = {};
    object.obj = $object;
    object.elem = $object.element;
    object.func = $func;

    resizeDetection.objectAndFunctionList.push(object);
    resizeDetection.whenDetected.observe($object.element);

};

resizeDetection.remove_onResize = function($element, $func) {

    for(var j = resizeDetection.objectAndFunctionList.length - 1; j >= 0; j--) {

        if (resizeDetection.objectAndFunctionList[j].elem == $element) {
            if (resizeDetection.objectAndFunctionList[j].func == $func) {
                resizeDetection.objectAndFunctionList.splice(j, 1);
            }
        }

    }

    // NOT: Dizi tersten kontrol edildiği için, silme işlemi, 
    // kontrol edilmeyen kayıtların sıra numarasını değiştirmez.

    resizeDetection.whenDetected.unobserve($element);

};

resizeDetection.whenDetected = new ResizeObserver(function(entries) {

    var detection = resizeDetection;

	for (var i = 0; i < entries.length; i++) {
        for(var j = 0; j < detection.objectAndFunctionList.length; j++) {

            if (entries[i].target == detection.objectAndFunctionList[j].elem) {
                detection.objectAndFunctionList[j].func(detection.objectAndFunctionList[j].obj);
            }

        }
	}

});

let startedBoxList = [];
let startedBoxAlertTimeout = null;
const checkStartedBox = function() {

    if (startedBoxAlertTimeout) {
        clearTimeout(startedBoxAlertTimeout);
    }

    startedBoxAlertTimeout = setTimeout(function() {

        const startedBoxCount = startedBoxList.length - 1;

        if (startedBoxCount > 0) {
            console.warn("basic.js: Some started boxes were not ended. Count: " + startedBoxCount);
        }

    }, 100);

}
win.startFlexBox = function(p1 = {}, p2, p3, p4, p5) {

    // - Hiç bir parametre girilmez ise boş obje girilmiş gibi işlem yapar.

    let props = {};
    let box = null;

    if (typeof p1 == "object") {
        box = createBox(0, 0, "100%", "100%");
        props = p1;

    } else if (typeof p2 == "object") {
        box = createBox(p1, 0, "100%", "100%");
        props = p2;

    } else if (typeof p3 == "object") {
        box = createBox(p1, p2, "100%", "100%");
        props = p3;
        
    } else if (typeof p4 == "object") {
        box = createBox(p1, p2, p3, "100%");
        props = p4;
        
    } else if (typeof p5 == "object") {
        box = createBox(p1, p2, p3, p4);
        props = p5;
    } else {
        box = createBox(p1, p2, p3, p4);
    }

    if (!props.flexDirection) props.flexDirection = "row"; // row, column
    if (!props.flexWrap) props.flexWrap = "nowrap"; // wrap, nowrap
    if (!props.alignContent) props.alignContent = "center"; // flex-start, center, flex-end (column)
    if (!props.justifyContent) props.justifyContent = "center"; // flex-start, center, flex-end (row)
    if (!props.alignItems) props.alignItems = "center";
    if (!props.color) props.color = "transparent";

    box.props(props);

    //const box = createBox(0, 0, "100%", "100%");
    //that.color = "transparent";

    that.element.style.display = "flex";
    for (let parameterName in props) {
        box.element.style[parameterName] = props[parameterName];
    }

    if (startedBoxList.length == 0) {
        startedBoxList.push(getDefaultContainerBox());
    }

    setDefaultContainerBox(box);
    startedBoxList.push(box);

    checkStartedBox();

    return box;

};
//win.startFlexBox = basic.startFlexBox;

win.startBox = function(p1 = {}, p2, p3, p4, p5) {

    let props = {};
    let box = null;

    if (typeof p1 == "object") {
        box = createBox();
        props = p1;

    } else if (typeof p2 == "object") {
        box = createBox(p1);
        props = p2;

    } else if (typeof p3 == "object") {
        box = createBox(p1, p2);
        props = p3;
        
    } else if (typeof p4 == "object") {
        box = createBox(p1, p2, p3);
        props = p4;
        
    } else if (typeof p5 == "object") {
        box = createBox(p1, p2, p3, p4);
        props = p5;
    } else {
        box = createBox(p1, p2, p3, p4);
    }

    box.props(props);

    if (startedBoxList.length == 0) {
        startedBoxList.push(getDefaultContainerBox());
    }

    setDefaultContainerBox(box);
    startedBoxList.push(box);

    checkStartedBox();

    return box;

};
//win.startBox = basic.startBox;

win.endBox = function() {

    if (startedBoxList.length > 1) {
        startedBoxList.pop();
    }

    setDefaultContainerBox(startedBoxList[startedBoxList.length - 1]);

    if (startedBoxList.length == 1) {
        startedBoxList = [];
    }

};
//basic.endFlexBox = basic.endBox;
//win.endBox = basic.endBox;
//win.endFlexBox = basic.endBox;
win.endFlexBox = win.endBox;

basic.useImageAsText = function(parameters = {}, editCreatedImage) {

    if (!parameters.boxSize) parameters.boxSize = 16;
    if (!parameters.outerSpaceRight) parameters.outerSpaceRight = 0;
    if (!parameters.outerSpaceLeft) parameters.outerSpaceLeft = 0;

    basic.saveCurrentThat();

    const htmText = document.createElement('span');
    htmText.style.display = "inline-block";
    htmText.style.marginRight = parameters.outerSpaceRight + "px";
    htmText.style.marginLeft = parameters.outerSpaceLeft + "px";

    const box = createBox(0, 0, parameters.boxSize, parameters.boxSize);
    that.color = "transparent";
    that.element.style.position = "relative";
    that.element.style.overflow = "visible";

    createImage(0, 0);
    box.add(that);
    editCreatedImage(that);
    that.center();

    htmText.appendChild(box.element);

    basic.restoreThatFromSaved();
    return htmText.outerHTML;

};
win.useImageAsText = basic.useImageAsText;

let savedThat = null;
let savedExThat = null;

basic.saveCurrentThat = function() {

    savedThat = that;
    savedExThat = previousThat;

};
win.saveCurrentThat = basic.saveCurrentThat;

basic.restoreThatFromSaved = function() {

    that = savedThat;
    previousThat = savedExThat;
    prevThat = previousThat;

};
win.restoreThatFromSaved = basic.restoreThatFromSaved;

// Text, Input, Icon, Box, Button
// Lbl, Inp, Img, Box, Btn
// *** Label, Input, Icon, Box, Button

win.Label = function(p1, p2, p3, p4, p5) {

    // Bu kolaylık için, gereksiz bu kadar işlem yapmaya gerek var mı?

    let props = {};
    let obj = null;

    if (typeof p1 == "object") {
        obj = createLabel();
        props = p1;

    } else if (typeof p2 == "object") {
        obj = createLabel(p1);
        props = p2;

    } else if (typeof p3 == "object") {
        obj = createLabel(p1, p2);
        props = p3;
        
    } else if (typeof p4 == "object") {
        obj = createLabel(p1, p2, p3);
        props = p4;
        
    } else if (typeof p5 == "object") {
        obj = createLabel(p1, p2, p3, p4);
        props = p5;
    } else {
        obj = createLabel(p1, p2, p3, p4);
    }

    obj.props(props);
    return obj;

}

win.Input = function(p1, p2, p3, p4, p5) {

    // Bu kolaylık için, gereksiz bu kadar işlem yapmaya gerek var mı?

    let props = {};
    let obj = null;

    if (typeof p1 == "object") {
        obj = createTextBox();
        props = p1;

    } else if (typeof p2 == "object") {
        obj = createTextBox(p1);
        props = p2;

    } else if (typeof p3 == "object") {
        obj = createTextBox(p1, p2);
        props = p3;
        
    } else if (typeof p4 == "object") {
        obj = createTextBox(p1, p2, p3);
        props = p4;
        
    } else if (typeof p5 == "object") {
        obj = createTextBox(p1, p2, p3, p4);
        props = p5;
    } else {
        obj = createTextBox(p1, p2, p3, p4);
    }

    obj.props(props);
    return obj;

}

win.Icon = function(p1, p2, p3, p4, p5) {

    // Bu kolaylık için, gereksiz bu kadar işlem yapmaya gerek var mı?

    let props = {};
    let obj = null;

    if (typeof p1 == "object") {
        obj = createImage();
        props = p1;

    } else if (typeof p2 == "object") {
        obj = createImage(p1);
        props = p2;

    } else if (typeof p3 == "object") {
        obj = createImage(p1, p2);
        props = p3;
        
    } else if (typeof p4 == "object") {
        obj = createImage(p1, p2, p3);
        props = p4;
        
    } else if (typeof p5 == "object") {
        obj = createImage(p1, p2, p3, p4);
        props = p5;
    } else {
        obj = createImage(p1, p2, p3, p4);
    }

    obj.props(props);
    return obj;

}

win.Box = function(p1, p2, p3, p4, p5) {

    // Bu kolaylık için, gereksiz bu kadar işlem yapmaya gerek var mı?

    let props = {};
    let obj = null;

    if (typeof p1 == "object") {
        obj = createBox();
        props = p1;

    } else if (typeof p2 == "object") {
        obj = createBox(p1);
        props = p2;

    } else if (typeof p3 == "object") {
        obj = createBox(p1, p2);
        props = p3;
        
    } else if (typeof p4 == "object") {
        obj = createBox(p1, p2, p3);
        props = p4;
        
    } else if (typeof p5 == "object") {
        obj = createBox(p1, p2, p3, p4);
        props = p5;
    } else {
        obj = createBox(p1, p2, p3, p4);
    }

    obj.props(props);
    return obj;

}

win.Button = function(p1, p2, p3, p4, p5) {

    // Bu kolaylık için, gereksiz bu kadar işlem yapmaya gerek var mı?

    let props = {};
    let obj = null;

    if (typeof p1 == "object") {
        obj = createButton();
        props = p1;

    } else if (typeof p2 == "object") {
        obj = createButton(p1);
        props = p2;

    } else if (typeof p3 == "object") {
        obj = createButton(p1, p2);
        props = p3;
        
    } else if (typeof p4 == "object") {
        obj = createButton(p1, p2, p3);
        props = p4;
        
    } else if (typeof p5 == "object") {
        obj = createButton(p1, p2, p3, p4);
        props = p5;
    } else {
        obj = createButton(p1, p2, p3, p4);
    }

    obj.props(props);
    return obj;

}

// When content is loaded,
window.addEventListener("load", function () {
    basic.start();
});

})();