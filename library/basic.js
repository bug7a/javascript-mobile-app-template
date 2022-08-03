
/* Bismillah */

/*


(v1.6.5) Create interactive user interfaces with basic programming skills.
- Project Site: https://bug7a.github.io/basic.js/


INFORMATION:

Started Date: 25 October 2020
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Personal Site: http://bugraozden.com


LICENSE:

You are free:

to Share — to copy, distribute and transmit the work
to Remix — to adapt the work
to make commercial use of the work

https://creativecommons.org/licenses/by/4.0/

Have Fun.


*/

"use strict"
const basic = {};
basic.startTime = Date.now();

basic.ACTION_COLOR = "#689BD2";
basic.ACTION2_COLOR = "cadetblue";
basic.WARNING_COLOR = "tomato";
basic.ALERT_COLOR = "gold";
basic.CANCEL_COLOR = "lightgray";
basic.TEXT_COLOR = "#4A4A4A";
basic.BACKGROUND_COLOR = "whitesmoke";
basic.DARK_BACKGROUND_COLOR = "#141414";
basic.FONT_SIZE = 20;
basic.BUTTON_WIDTH = 130;
basic.BUTTON_HEIGHT = 50;
basic.BUTTON_COLOR = basic.ACTION_COLOR
basic.BUTTON_TEXT_COLOR = "rgba(0, 0, 0, 0.65)";
basic.TEXTBOX_WIDTH = 270;
basic.TEXTBOX_HEIGHT = 50;
basic.LABEL_WIDTH = 270;
basic.LABEL_HEIGHT = "auto";
basic.BOX_WIDTH = 100;
basic.BOX_HEIGHT = 100;
basic.IMAGE_WIDTH = 50;
basic.IMAGE_HEIGHT = 50;

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

let page;

let that = "";
let exThat = "";

basic.selectedBox;
basic.loopTimer;
basic.resizeDetection = {};
basic.resizeDetection.objectAndFunctionList = [];

basic.motionController = {};
basic.motionController.WITH_MOTION_TIME = 2;
basic.motionController.DONT_MOTION_TIME = 1;

basic.start = function () {

    page = new MainBox();
    selectBox(page);

    page.bodyElement.style.margin = "0px";
    page.bodyElement.style.overflow = "hidden";
    page.box = createBox(0, 0, page.width, page.height);
    that.element.style.position = "fixed";
    //that.element.style.width = "100%";
    //that.element.style.height = "100%";
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
        if(!basic.loopTimer) setLoopTimer(1000);
    }

}

basic.afterStart = function () {
    // Hız testi:
    // var timeUsed = (Date.now() - basic.startTime)
    // print(timeUsed);
}

basic.print = function ($message) {
    console.log($message);
}
var print = basic.print;

basic.random = function ($first, $second) {

    let result = 0;

    if ($second != undefined) {

        if ($second < $first) {
            console.log("basic.js: random(): The second parameter (number) must be greater than the first.");
        
        } else {
            result = $first + Math.round(Math.random() * ($second - $first));
        }

    } else {
        console.log("basic.js: random(): Two parameters (numbers) must be sent.");
    }

    return result;

}
var random = basic.random;

basic.num = function ($str, $type = "float") {

    if ($type == "float") {
        var i = parseFloat($str);
        return Math.round(i * 100) / 100;
        
    } else if ($type == "integer" || $type == "int") {
        return parseInt($str);
    }

}
var num = basic.num;

basic.str = function ($num) {
    return String($num);
}
var str = basic.str;

basic.isMobile = function () {

    let answer = 0;

    let a = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) { 
        answer = 1;
    }

    return answer;

}
var isMobile = basic.isMobile;

basic.go = function ($url, $windowType = "_self") {

    // window.location.href = $url;
    var openedWindow = window.open($url, $windowType);
    // openedWindow.document.write("<p>Test Message</p>");

    return openedWindow;

}
var go = basic.go;

// Tek haneli sayıyı, başına "0" ekleyerek iki haneli yapar. 03:10:05
basic.twoDigitFormat = function($number) {

    if ($number <= 9) {
        $number = "0" + $number;
    }

    return $number;

}
var twoDigitFormat = basic.twoDigitFormat;

basic.storage = {

    save(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    load(key) {
        return JSON.parse(window.localStorage.getItem(key));
    },
    remove(key) {
        window.localStorage.removeItem(key)
    }

}
var storage = basic.storage;

basic.clock = {

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
var clock = basic.clock;

basic.date = {

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

}
var date = basic.date;

// Common methods and properties of basic objects.
class Basic_UIComponent {

    /*
    _type;
    _upperObject;

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

    get upperObject() {
        return this._upperObject;
    }

    set upperObject($value) {
        this._upperObject = $value;
    }

    // Hizalama ve boyutlandırma.

    get left() {
        return parseFloat(this.contElement.style.left);
    }

    set left($value) {
        this.contElement.style.right = "";
        this.contElement.style.left = parseFloat($value) + "px";
    }

    get top() {
        return parseFloat(this.contElement.style.top);
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
        var _width = parseInt(this.contElement.style.width);
        if (isNaN(_width)) {
            _width = parseInt(this.contElement.offsetWidth);
        }
        return _width;
    }

    set width($value) {
        if ($value != "auto") {
            this.contElement.style.width = parseInt($value) + "px";
        } else {
            console.log("basic.js: .width: The 'auto' property is not supported for this object.");
        }
    }

    get height() {
        var _height = parseInt(this.contElement.style.height);
        if (isNaN(_height)) {
            _height = parseInt(this.contElement.offsetHeight);
        }
        return _height;
    }

    set height($value) {
        if ($value != "auto") {
            this.contElement.style.height = parseInt($value) + "px";

        } else {
            console.log("basic.js: .height: The 'auto' property is not supported for this object.");
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

    // Otomatik hizalama metodları

    center($position) {
        basic.moveToCenter(this, $position);
    }

    aline($obj, $position, $space = 0, $secondPosition) {
        basic.moveToAline(this, $obj, $position, $space, $secondPosition);
    }

    // -- Otomatik hizalama metodları SONU
    
    // Nesneyi sil.
    remove() {
        this.contElement.remove();
    }

    // Toplu özellik değiştirmesi.
    prop($values) {
        basic.setProparties(this, $values);
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
        basic.resizeDetection.onResize(this, $func);
    }

    remove_onResize($func) {
        basic.resizeDetection.remove_onResize(this.element, $func);
    }

    // Hareket
    setMotion($motionString) {

        // example motionString: "left 1s, top 1s, width 1s, height 1s, transform 1s, background-color 1s, border-radius 1s, opacity 1s"
        // example motionString: "all 0.3s"
        this.setMotionNow($motionString);

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
         }, basic.motionController.WITH_MOTION_TIME);

    }

    // Harekete, belli bir süre ara ver.
    dontMotion() {

        this.contElement.style.transition = "none";
        var _that = this;

        setTimeout(function(){
            _that.contElement.style.transition = _that._motionString;
        }, basic.motionController.DONT_MOTION_TIME);

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

    get element() {
        return this._element;
    }

    get contElement() {
        return this._element;
    }

    get bodyElement() {
        return this._bodyElement;
    }

    get box() {
        return this._box;
    }

    set box($value) {
        this._box = $value;
        this._element = this._box.element;
    }

    get width() {
        let _w;
        _w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return basic.antiZoom(_w);
    }

    get height() {
        let _h;
        _h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return basic.antiZoom(_h);
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
        page.box.width = page.width;
        page.box.height = page.height;
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
        if ($obj.upperObject != this) {
            $obj.upperObject = this;
            // this.box.clickable = 1;
            this.element.appendChild($obj.contElement);
        }
    }

}

/* BOX COMPONENT */
class Box extends Basic_UIComponent {

    constructor($left = 0, $top = 0, $width = basic.BOX_WIDTH, $height = basic.BOX_HEIGHT) {

        super("box");

        // Renk
        this._backgroundColor = "whitesmoke";

        // Kenarlık
        this._border = 0;
        this._borderColor = "gray";
        this._round = 0;
        
        // Text
        this._fontSize = 16;
        this._textColor = "#4A4A4A";
        this._textAlign = "left";

        let divElement = document.createElement("DIV");
        divElement.classList.add("basic_box");

        divElement.style.left = $left + "px";
        divElement.style.top = $top + "px";

        this._element = divElement;
        this._upperObject = basic.selectedBox;
        basic.selectedBox.element.appendChild(this._element);

        // Genişliğin "auto" olmasına izin verme.
        if ($width == "auto") {
            $width = basic.BOX_WIDTH;
        }

        this.width = $width;
        this.height = $height;

        makeBasicObject(this);

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

    // Otomatik yüksekliğe izin ver
    get height() {
        return super.height;
    }

    set height($value) {
        if ($value != "auto") {
            this.contElement.style.height = parseInt($value) + "px";

        } else {
            this.contElement.style.height = "auto";
        }
    }
    
    get scrollX() {
        return (this.contElement.style.overflowX == "scroll") ? 1 : 0;
    }

    get scrollY() {
        return (this.contElement.style.overflowY == "scroll") ? 1 : 0;
    }

    set scrollX($value) {
        
        this.contElement.style.overflowX = "hidden";

        if ($value == 1) {
            this.clickable = 1;
            this.contElement.style.overflowX = "scroll";
        }
    }

    set scrollY($value) {
        
        this.contElement.style.overflowY = "hidden";

        if ($value == 1) {
            this.clickable = 1;
            this.contElement.style.overflowY = "scroll";
        }
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
        if ($obj.upperObject != this) {
            // Eklenen nesnenin, üst nesnesini değiştir.
            $obj.upperObject = this;
            // İçine başka bir nesne eklendiğinde, artık basılabilir.
            this.clickable = 1;
            this.element.appendChild($obj.contElement);
        }
    }

    // Ağaç şeklinde kod blokları oluştumak için bir teknik. (Deneysel Teknik)
    in($func) {
        var _selectedBox = getSelectedBox();
        selectBox(this);
        $func(this);
        selectBox(_selectedBox);
    }

}

// Alternatif kullanım
var createBox = function ($left, $top, $width, $height) {

    return new Box($left, $top, $width, $height);

}

// Alternatif kullanım
var cbox = function ($left, $top, $width, $height) {

    return new Box($left, $top, $width, $height);

}

/* BUTTON COMPONENT */
class Button extends Basic_UIComponent {

    constructor($left = 0, $top = 0, $width = basic.BUTTON_WIDTH, $height = basic.BUTTON_HEIGHT) {

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
        this._upperObject = basic.selectedBox;
        basic.selectedBox.element.appendChild(this._element);

        // Yüksekliğin "auto" olmasına izin verme.
        if ($height == "auto") {
            $height = basic.BUTTON_HEIGHT;
        }

        this.width = $width;
        this.height = $height;

        makeBasicObject(this);

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

    // Otomatik genişliğe izin ver.
    get width() {
        return super.width;
    }

    set width($value) {
        if ($value != "auto") {
            this.contElement.style.width = parseInt($value) + "px";

        } else {
            this.contElement.style.width = "auto";
        }
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

    onClick($func) {
        this.clickable = 1;
        this._addEventListener("click", $func, this.buttonElement);
    }

    remove_onClick($func) {
        //this.clickable = 0;
        this._removeEventListener("click", $func, this.buttonElement);
    }

    add($obj) {
        console.log("basic.js: add(): Insertion cannot be made inside the Button object.");
    }

}

// Alternatif kullanım1
var createButton = function ($left, $top, $width, $height) {

    return new Button($left, $top, $width, $height);

}

// Alternatif kullanım 2
var cbtn = function ($left, $top, $width, $height) {

    return new Button($left, $top, $width, $height);

}

/* TEXTBOX COMPONENT */
class TextBox extends Basic_UIComponent {

    /*
    _titleElement;
    _mainElement;
    */

    constructor($left = 0, $top = 0, $width = basic.TEXTBOX_WIDTH, $height = basic.TEXTBOX_HEIGHT) {

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
        mainElement.style.width = $width + "px";
        mainElement.style.height = $height + "px";

        mainElement.appendChild(this._titleElement);
        mainElement.appendChild(this._element);

        this._upperObject = basic.selectedBox;
        basic.selectedBox.element.appendChild(this._mainElement);

        makeBasicObject(this);

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
        console.log("basic.js: add(): Insertion cannot be made inside the TextBox object.");
    }

}

// Alternatif kullanım
var createTextBox = function ($left, $top, $width, $height) {

    return new TextBox($left, $top, $width, $height);

}

// Alternatif kullanım
var ctxt = function ($left, $top, $width, $height) {

    return new TextBox($left, $top, $width, $height);

}

/* LABEL COMPONENT */
class Label extends Basic_UIComponent {

    constructor($left = 0, $top = 0, $width = basic.LABEL_WIDTH, $height = basic.LABEL_HEIGHT) {

        super("label");

        //this._value = "";
        this._backgroundColor = "transparent";

        // Kenarlık
        this._border = 0;
        this._borderColor = "#4A4A4A";
        this._round = 0;
        
        // Text
        this._fontSize = 20;
        this._textColor = "#4A4A4A";
        this._textAlign = "left";

        let divElement = document.createElement("DIV");

        divElement.innerHTML = "Label Text";
        divElement.classList.add("basic_label");

        divElement.style.left = $left + "px";
        divElement.style.top = $top + "px";

        this._element = divElement;
        this._upperObject = basic.selectedBox;
        basic.selectedBox.element.appendChild(this._element);

        this.width = $width;
        this.height = $height;

        makeBasicObject(this);

    }

    //sample: <b>text</b><br />

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

    get width() {
        return super.width;
    }

    set width($value) {
        if ($value != "auto") {
            this.contElement.style.width = parseInt($value) + "px";

        } else {
            this.contElement.style.width = "auto";

        }
    }

    get height() {
        return super.height;
    }

    set height($value) {
        if ($value != "auto") {
            this.contElement.style.height = parseInt($value) + "px";

        } else {
            this.contElement.style.height = "auto";
        }
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
        this.clickable = 1
        this._addEventListener("click", $func, this.contElement);
    }

    remove_onClick($func) {
        this.clickable = 0
        this._removeEventListener("click", $func, this.contElement);
    }

    add($obj) {
        console.log("basic.js: add(): Insertion cannot be made inside the Label object.");
    }

}

// Alternatif kullanım
var createLabel = function ($left, $top, $width, $height) {

    return new Label($left, $top, $width, $height);

}

// Alternatif kullanım
var clbl = function ($left, $top, $width, $height) {

    return new Label($left, $top, $width, $height);

}

/* IMAGE COMPONENT */
class Image extends Basic_UIComponent {

    // Not: CheckBox resim nesnesi ile yapılabilir.
    /*
    _autoSize;
    */

    constructor($left = 0, $top = 0, $width = 0, $height = 0) {

        super("image");

        this._autoSize = 1;
        this._space = 0;

        // Renk
        this._backgroundColor = "transparent";

        // kenarlık
        this._border = 0;
        this._borderColor = "#4A4A4A";
        this._round = 0;

        let imageElement = document.createElement("IMG");
        imageElement.classList.add("basic_image");

        imageElement.style.left = $left + "px";
        imageElement.style.top = $top + "px";

        if ($width || $height) {
            this.autoSize = 0;
        }

        imageElement.style.width = $width + "px";
        imageElement.style.height = $height + "px";


        var _that = this;

        // Resim yüklendiğinde, Otomatik boyutlandır.
        imageElement.addEventListener('load', function () {

            // if auto size
            if (_that.autoSize > 0) {
                imageElement.style.width = parseInt(_that.naturalWidth / _that.autoSize) + "px";
                imageElement.style.height = parseInt(_that.naturalHeight / _that.autoSize) + "px";
                // Her yüklemede, isteniyor ise auto size özelliğini tekrar aktif etmeli.
                // bak:
                _that.autoSize = 0;
            }

        });

        this._element = imageElement;
        this._upperObject = basic.selectedBox;
        basic.selectedBox.element.appendChild(this._element);

        makeBasicObject(this);

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
        var spaceX = parseInt((this.width / 100) * $value);
        var spaceY = parseInt((this.height / 100) * $value);

        this.contElement.style.paddingLeft = spaceX + "px";
        this.contElement.style.paddingRight = spaceX + "px";
        this.contElement.style.paddingTop = spaceY + "px";
        this.contElement.style.paddingBottom = spaceY + "px";

    }

    onClick($func) {
        this.clickable = 1
        this._addEventListener("click", $func, this.contElement);
    }

    remove_onClick($func) {
        this.clickable = 0
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
        console.log("basic.js: add(): Insertion cannot be made inside the Image object.");
    }

}

// Alternatif kullanım
var createImage = function ($left, $top, $width, $height) {

    return new Image($left, $top, $width, $height);

}

// Alternatif kullanım
var cimg = function ($left, $top, $width, $height) {

    return new Image($left, $top, $width, $height);

}

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

}


/* ### FUNCTIONS ### */

// Set styles with style object.
basic.setProparties = function ($this, $values = []) {

    for (var valueTitle in $values) {
        $this[valueTitle] = $values[valueTitle];
    }

}

// Centering one object to box.
basic.moveToCenter = function ($this, $position) {

    if ($position == "left" || !$position) {
        let _w = $this.upperObject.width - (($this.upperObject.border || 0) * 2);
        $this.left = parseInt((_w - $this.width) / 2);

    }

    if ($position == "top" || !$position) {
        let _h = $this.upperObject.height - (($this.upperObject.border || 0) * 2);
        $this.top = parseInt((_h - $this.height) / 2);

    }

    // Her zaman tam sayı olarak ortala, yoksa bulanıklık yapabilir.
    // NOT: Eğer, kenarlık kalınlıkları, aynı olmaz ise, hesaba katılmaz.

}

// Alignment of one object with respect to another object.
basic.moveToAline = function ($this, $obj, $position, $space, $secondPosition) {

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
            $this.bottom = parseInt($obj.bottom + $this.height + $space);

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
            $this.right = parseInt($obj.right - $obj.width - $space);

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
            $this.bottom = parseInt($obj.bottom - $obj.height - $space);

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
                break;
            case "bottom":
                if (!isNaN($obj.top)) {
                    $this.top += parseInt(_difference);
        
                } else if (!isNaN($obj.bottom)) {
                    $this.bottom -= parseInt(_difference);
        
                }
                break;
            case "center":
                if (!isNaN($obj.top)) {
                    $this.top += parseInt(_difference / 2);
        
                } else if (!isNaN($obj.bottom)) {
                    $this.bottom -= parseInt(_difference / 2);
        
                }
                break;
        }

    } else if ($position == "top" || $position == "bottom") {

        var _difference = $obj.width - $this.width;

        switch ($secondPosition) {
            case "left":
                break;
            case "right":
                if (!isNaN($obj.left)) {
                    $this.left += parseInt(_difference);
        
                } else if (!isNaN($obj.right)) {
                    $this.right -= parseInt(_difference);
        
                }
                break;
            case "center":
                if (!isNaN($obj.left)) {
                    $this.left += parseInt(_difference / 2);
        
                } else if (!isNaN($obj.right)) {
                    $this.right -= parseInt(_difference / 2);
        
                }
                break;
        }

    }
    
}

basic.antiZoom = function ($value) {
    return parseInt($value * (1 / page.zoom));
}

basic.setLoopTimer = function ($time) {
    
    if (typeof loop === "function") {

        // Daha önceden oluşturulmuş ise temizle.
        if (basic.loopTimer) { 
            basic.loopTimer = clearInterval(basic.loopTimer);
        }

        // Yenisini oluştur.
        if ($time == 0) {
            // Eğer tekrarlama zamanı 0 ise yenisini oluşturma.
        } else {
            basic.loopTimer = setInterval(loop, $time);
        }
        
    }

}
var setLoopTimer = basic.setLoopTimer;

// Hangi box nesnesi seçili ise, yeni eklenen nesneler onun içinde oluşturulur.
basic.selectBox = function ($box) {

    basic.selectedBox = $box;

    // Bir div elementine, Box nesnesi eklemek için;
    // document.getElementById("elementID").appendChild(boxObject.element)

    // Bir div elementini, Box nesnesi eklemek için;
    // box.html = document.getElementById("elementID").innerHTML

}
var selectBox = basic.selectBox;

// Nesne hangi kutu nesnesinin içine eklendiği.
basic.getSelectedBox = function () {
    
    return basic.selectedBox;

}
var getSelectedBox = basic.getSelectedBox;

// Add your custom object to basic.js ecosystem.
const makeBasicObject = function($newObject) {

    // Object can be called as that.
    exThat = that
    that = $newObject

}

basic.resizeDetection.onResize = function($object, $func) {

    var object = {};
    object.obj = $object;
    object.elem = $object.element;
    object.func = $func;

    basic.resizeDetection.objectAndFunctionList.push(object);
    basic.resizeDetection.whenDetected.observe($object.element);

}

basic.resizeDetection.remove_onResize = function($element, $func) {

    for(var j = basic.resizeDetection.objectAndFunctionList.length - 1; j >= 0; j--) {

        if (basic.resizeDetection.objectAndFunctionList[j].elem == $element) {
            if (basic.resizeDetection.objectAndFunctionList[j].func == $func) {
                basic.resizeDetection.objectAndFunctionList.splice(j, 1);
            }
        }

    }

    // NOT: Dizi tersten kontrol edildiği için, silme işlemi, 
    // kontrol edilmeyen kayıtların sıra numarasını değiştirmez.

    basic.resizeDetection.whenDetected.unobserve($element);

}

basic.resizeDetection.whenDetected = new ResizeObserver(function(entries) {

    var detection = basic.resizeDetection;

	for (var i = 0; i < entries.length; i++) {
        for(var j = 0; j < detection.objectAndFunctionList.length; j++) {

            if (entries[i].target == detection.objectAndFunctionList[j].elem) {
                detection.objectAndFunctionList[j].func(detection.objectAndFunctionList[j].obj);
            }

        }
	}

})

// When content is loaded,

window.addEventListener("load", function () {
    basic.start();
});