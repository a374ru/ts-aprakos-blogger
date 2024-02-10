"use strict";
var OLY = (function () {
    function OLY(year) {
        var _a;
        this.year = year;
        this.theMomentTime = new Date();
        this.anchorElemID = "#11";
        this.stateModalView = false;
        this.arrayDaysRu = [
            "ВОСРЕСЕНЬЕ",
            "ПОНЕДЕЛЬНИК",
            "ВТОРНИК",
            "СРЕДА",
            "ЧЕТВЕРГ",
            "ПЯТНИЦА",
            "СУББОТА",
        ];
        this.weeks = {};
        this.easterDates = {
            2000: [3, 30],
            2001: [3, 15],
            2002: [4, 5],
            2003: [3, 27],
            2004: [3, 11],
            2005: [4, 1],
            2006: [3, 23],
            2007: [3, 8],
            2008: [3, 27],
            2009: [3, 19],
            2010: [3, 4],
            2011: [3, 24],
            2012: [3, 15],
            2013: [4, 5],
            2014: [3, 20],
            2015: [3, 12],
            2016: [4, 1],
            2017: [3, 16],
            2018: [3, 8],
            2019: [3, 28],
            2020: [3, 19],
            2021: [4, 2],
            2022: [3, 24],
            2023: [3, 16],
            2024: [4, 5],
            2025: [3, 20],
            2026: [3, 12],
            2027: [4, 2],
            2028: [3, 16],
            2029: [3, 8],
            2030: [3, 28],
            2031: [3, 13],
            2032: [4, 2],
            2033: [3, 24],
            2034: [3, 9],
            2035: [3, 29],
            2036: [3, 20],
            2037: [3, 5],
            2038: [3, 25],
            2039: [3, 17],
            2040: [4, 6],
            2041: [3, 21],
            2042: [3, 13],
            2043: [4, 3],
            2044: [3, 24],
            2045: [3, 9],
            2046: [3, 29],
            2047: [3, 21],
            2048: [3, 5],
            2049: [3, 25],
            2050: [3, 17],
            2051: [4, 7],
            2052: [4, 21],
            2053: [3, 13],
            2054: [4, 3],
            2055: [4, 18],
            2056: [3, 9],
            2057: [3, 29],
            2058: [3, 14],
            2059: [4, 4],
            2060: [3, 25],
            2061: [3, 10],
            2062: [3, 30],
            2063: [3, 22],
            2064: [3, 13],
            2065: [3, 26],
            2066: [3, 18],
            2067: [3, 10],
            2068: [3, 29],
            2069: [3, 14],
            2070: [4, 4],
            2071: [3, 19],
            2072: [3, 10],
            2073: [3, 30],
            2074: [3, 22],
            2075: [3, 7],
            2076: [3, 26],
            2077: [3, 18],
            2078: [4, 8],
            2079: [3, 23],
            2080: [3, 14],
            2081: [4, 4],
            2082: [3, 19],
            2083: [3, 11],
            2084: [3, 30],
            2085: [3, 15],
            2086: [3, 7],
            2087: [3, 27],
            2088: [3, 18],
            2089: [4, 1],
            2090: [3, 23],
            2091: [3, 8],
            2092: [3, 27],
            2093: [3, 19],
            2094: [3, 11],
            2095: [3, 24],
            2096: [3, 15],
            2097: [4, 5],
            2098: [3, 27],
            2099: [3, 12],
            2100: [4, 2],
        };
        this.NINEHOLIDAYS = {
            rojdestvoBogorodici: {
                year: 2021,
                month: 8,
                day: 21,
                monthRU: "09",
            },
            vozdvizgenieKresta: {
                year: 2020,
                month: 8,
                day: 27,
                monthRU: "09",
            },
            vvedenieVoHram: {
                year: 2020,
                month: 11,
                day: 4,
                monthRU: "12",
            },
            rojdestvoXristovo: {
                year: 2021,
                month: 0,
                day: 7,
                monthRU: "01",
            },
            kreshenieGospodne: {
                year: 2021,
                month: 0,
                day: 19,
                monthRU: "01",
            },
            sretenieGospodne: {
                year: 2021,
                month: 1,
                day: 15,
                monthRU: "02",
            },
            blagoveshenieBogorodici: {
                year: 2021,
                month: 3,
                day: 7,
                monthRU: "04",
            },
            preobrajjenieGospodne: {
                year: 2021,
                month: 7,
                day: 19,
                monthRU: "08",
            },
            uspenieBogorodici: {
                year: 2021,
                month: 7,
                day: 28,
                monthRU: "08",
            },
        };
        this.datesOLY = {};
        this.theMomentTime = this.controlDates(year);
        this.initOLY();
        this.initDatesOLY();
        this.initWeeks();
        this.linkToAprakos = "/" + this.yearMonthID() + ".html";
        this.anchorElemID = "" + this.weeks.elemID[0];
        this.linkToHolydays = (_a = this.holydays_9()) !== null && _a !== void 0 ? _a : this.linkToAprakos;
        this.info();
        this.initElementsDOM();
        this.firstViewModal();
        this.eventKeys();
    }
    OLY.prototype.initOLY = function () {
        var yearNumber = this.theMomentTime.getFullYear();
        if (this.theMomentTime >=
            new Date(this.theMomentTime.getFullYear(), this.easterDates[yearNumber][0], this.easterDates[yearNumber][1])) {
            this.oldEaster = new Date(this.theMomentTime.getFullYear(), this.easterDates[yearNumber][0], this.easterDates[yearNumber][1]);
            this.newEaster = new Date(this.theMomentTime.getFullYear() + 1, this.easterDates[yearNumber + 1][0], this.easterDates[yearNumber + 1][1]);
        }
        else {
            this.oldEaster = new Date(this.theMomentTime.getFullYear() - 1, this.easterDates[yearNumber - 1][0], this.easterDates[yearNumber - 1][1]);
            this.newEaster = new Date(this.theMomentTime.getFullYear(), this.easterDates[yearNumber][0], this.easterDates[yearNumber][1]);
        }
        console.log("\n" +
            "Прошедшая Пасха: " +
            this.oldEaster.toString().slice(0, 15) +
            "\n" +
            "Ожидаемая Пасха: " +
            this.newEaster.toString().slice(0, 16));
        this.oldEasterMLS = this.oldEaster.getTime();
        this.newEasterMLS = this.newEaster.getTime();
        return true;
    };
    OLY.prototype.initWeeks = function () {
        var day = (this.weeks["day"] = [
            this.theMomentTime.getDay() + 1,
            "День седмицы",
        ]);
        var all = (this.weeks["all"] = [
            Math.ceil((this.newEasterMLS - this.oldEasterMLS) / 864e5 / 7),
            "Протяженность ПБГ",
        ]);
        var addMLS = sessionStorage.getItem('userDate') ? 0.001 : 0;
        var current = (this.weeks["current"] = [
            Math.ceil((this.theMomentTime.getTime() + addMLS - this.oldEasterMLS) / 864e5 / 7),
            "Текущая седмица",
        ]);
        if (current[0] == 0) {
            this.weeks["current"][0] = 1;
        }
        var mif = (this.weeks["mif"] = [all[0] - 10, "Седмица МиФ"]);
        var zakhey = (this.weeks["zakhey"] = [mif[0] - 1, "Седмица Закхея"]);
        var stupkaK = (this.weeks["stupkaK"] = [
            all[0] - 50,
            "Крещенская отступка",
            function () {
                if (current[0] > 40) {
                    return stupkaK[0];
                }
                else {
                    return 0;
                }
            }
        ]);
        var vozdvizgenie = (this.weeks["vozdvizgenie"] = [
            Math.ceil((this.datesOLY.vozdvizgenieKresta[0].getTime() - this.oldEasterMLS) /
                864e5 /
                7),
            "Седмица Воздвижения",
        ]);
        var stupkaV = (this.weeks["stupkaV"] = [
            Math.ceil((this.datesOLY.week24[0].getTime() - this.oldEasterMLS) / 864e5 / 7) - vozdvizgenie[0],
            "Воздвиженская преступка",
        ]);
        return this.weeks;
    };
    OLY.prototype.mondayAfterVozdvizgenie = function () {
        var mondayPoVozdvizgene = 1 + 7 - (this.datesOLY.vozdvizgenieKresta[0].getDay() % 7);
        var updateTheDate = this.datesOLY.vozdvizgenieKresta[0].getDate() + mondayPoVozdvizgene;
        this.datesOLY.vozdvizgenieKresta[0].setDate(updateTheDate);
        this.datesOLY.vozdvizgenieKresta[1] = "Понедельник по Воздвижении";
        return this.theMomentTime >= this.datesOLY.vozdvizgenieKresta[0];
    };
    OLY.prototype.initDatesOLY = function () {
        this.datesOLY["pentecost"] = [
            new Date(this.oldEasterMLS + 864e5 * 49),
            "Пятьдесятница",
        ];
        this.datesOLY["vozdvizgenieKresta"] = [
            new Date(this.oldEaster.getFullYear() + "-09-27T00:00:00"),
            "Воздвижение Креста Господня",
        ];
        this.datesOLY["zakhey"] = [
            new Date(this.newEasterMLS - 864e5 * 77),
            "Неделя Закхея",
        ];
        this.datesOLY["mif"] = [
            new Date(this.newEasterMLS - 864e5 * 70),
            "Неделя МиФ",
        ];
        this.datesOLY["aboutTheProdigalSon"] = [
            new Date(this.newEasterMLS - 864e5 * 63),
            "Неделя о блудном сыне",
        ];
        this.datesOLY["aboutTheLastJudgment"] = [
            new Date(this.newEasterMLS - 864e5 * 56),
            "Неделя о страшном суде",
        ];
        this.datesOLY["aboutTheAdamsExile"] = [
            new Date(this.newEasterMLS - 864e5 * 49),
            "Неделя Адамова изгнания",
        ];
        this.datesOLY["theBeginningOfLent"] = [
            new Date(this.newEasterMLS - 864e5 * 48),
            "Начало Великого Поста",
        ];
        this.datesOLY["week24"] = [
            new Date(this.oldEasterMLS + 864e5 * 168),
            "17 седмица по Пятьдесятнице",
        ];
        return this.datesOLY;
    };
    OLY.prototype.controlDates = function (userYear) {
        var _a, _b, _c;
        var currentDate = this.theMomentTime;
        var sStorageDate = sessionStorage.getItem('userDate');
        if (sessionStorage.userDate != null && userYear == undefined) {
            currentDate = new Date(String(sStorageDate));
        }
        else if (userYear != undefined && userYear[0] < 2100 && userYear[0] > 2016) {
            currentDate = new Date(userYear[0], (_a = userYear[1]) !== null && _a !== void 0 ? _a : currentDate.getMonth(), Number((_b = userYear[2]) !== null && _b !== void 0 ? _b : currentDate.getDate()));
            sessionStorage.setItem('userDate', String(currentDate));
        }
        else {
            console.warn("".concat(userYear
                ? "Формат введенный пользователем не подходит… попробуйте ([2099,00,7])"
                : "Год пользователем не предоставлен…", ".\n\u0411\u0443\u0434\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0433\u043E\u0434.\n\u0421\u041F\u0410\u0421\u0418\u0411\u041E \u0417\u0410 \u0412\u041D\u0418\u041C\u0410\u041D\u0418\u0415!"));
        }
        if (currentDate.getDate() != this.theMomentTime.getDate()) {
            (_c = document.querySelector('#userdate')) === null || _c === void 0 ? void 0 : _c.remove();
            document.querySelector('body').innerHTML +=
                "<div id=\"userdate\" class='userdate'><a id='a-visited-userdate' href=\"#\" onclick=\"apr.deleteUserDateFromSessionStorage()\">".concat(currentDate.toLocaleDateString(), "</a></div>");
        }
        return currentDate;
    };
    OLY.prototype.info = function () {
        var _a;
        for (var key in this.datesOLY) {
            if (Object.prototype.hasOwnProperty.call(this.datesOLY, key)) {
                var element = this.datesOLY[key];
                console.log(element[1] + " | " + element[0].toDateString());
            }
        }
        for (var key in this.weeks) {
            if (Object.prototype.hasOwnProperty.call(this.weeks, key)) {
                var element = this.weeks[key];
                console.log(element[1] + " | " + element[0]);
            }
        }
        console.warn("\n\u0421\u0435\u0433\u043E\u0434\u043D\u044F: ".concat(this.theMomentTime.toDateString(), "\n\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0410\u043F\u0440\u0430\u043A\u043E\u0441: https://aprakos.blogspot.com").concat(this.linkToAprakos, "\n\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A: https://aprakos.blogspot.com").concat((_a = this.linkToHolydays) !== null && _a !== void 0 ? _a : "", "\n\u0421\u043F\u0440\u0430\u0432\u043A\u0430 \u0437\u0434\u0435\u0441\u044C: https://aprakos.blogspot.com/p/blog-page_4.html\n\t\t"));
    };
    OLY.prototype.yearMonthID = function () {
        var otstupka = this.stupka();
        var elemID = this.weeks.current[0] - otstupka;
        var aprID = Number("" + elemID + this.weeks.day[0]);
        var partURL;
        switch (true) {
            case aprID <= 25:
                partURL = "2020/04/" + aprID;
                break;
            case aprID <= 71:
                partURL = "2020/05/" + aprID;
                break;
            case aprID <= 113:
                partURL = "2020/06/" + aprID;
                break;
            case aprID <= 156:
                partURL = "2020/07/" + aprID;
                break;
            case aprID <= 202:
                partURL = "2020/08/" + aprID;
                break;
            case aprID <= 244:
                partURL = "2020/09/" + aprID;
                break;
            case aprID <= 287:
                partURL = "2020/10/" + aprID;
                break;
            case aprID <= 332:
                partURL = "2020/11/" + aprID;
                break;
            case aprID <= 375:
                partURL = "2020/12/" + aprID;
                break;
            case aprID <= 407:
                partURL = "2021/01/" + aprID;
                break;
            case aprID <= 421:
                partURL = "2021/02/" + aprID;
                break;
            case aprID <= 472:
                partURL = "2021/03/" + aprID;
                break;
            case aprID <= 506:
                partURL = "2021/04/" + aprID;
                break;
            case aprID <= 517:
                partURL = "2021/05/" + aprID;
                break;
            default:
                partURL = "search/";
                break;
        }
        this.weeks["aprID"] = [aprID, "Апракос-ID"];
        this.weeks["elemID"] = [elemID, "Элемент-ID"];
        return partURL;
    };
    OLY.prototype.stupka = function () {
        var stupka;
        switch (this.mondayAfterVozdvizgenie()) {
            case true:
                stupka = this.stupkaN();
                break;
            case false:
                stupka = this.stupkaV();
                break;
            default:
                stupka = 0;
                break;
        }
        return stupka;
    };
    OLY.prototype.stupkaN = function () {
        var stpka = 0;
        if (this.weeks.current[0] >= this.weeks.mif[0]) {
            return stpka;
        }
        if (this.weeks.current[0] < 40) {
            stpka = this.weeks.stupkaV[0];
        }
        if (this.weeks.current[0] >= 40 && (this.weeks.current[0] < this.weeks.mif[0])) {
            stpka = this.weeks.stupkaK[0];
        }
        return stpka;
    };
    OLY.prototype.stupkaV = function (week) {
        return 0;
    };
    OLY.prototype.stupkaK = function () {
        return 0;
    };
    OLY.prototype.holydays_9 = function () {
        var link_to_hld9 = undefined;
        var tmt = this.theMomentTime.getMonth() + "/" + this.theMomentTime.getDate();
        for (var item in this.NINEHOLIDAYS) {
            var pathToHollliday = this.NINEHOLIDAYS[item].year +
                "/" +
                this.NINEHOLIDAYS[item].monthRU +
                "/" +
                this.NINEHOLIDAYS[item].day;
            var date_9 = new Date(pathToHollliday);
            var h9 = date_9.getMonth() + "/" + date_9.getDate();
            if (h9 === tmt) {
                link_to_hld9 =
                    "/" +
                        this.NINEHOLIDAYS[item].year +
                        "/" +
                        this.NINEHOLIDAYS[item].monthRU +
                        "/" +
                        this.NINEHOLIDAYS[item].day +
                        ".html";
                return link_to_hld9;
                break;
            }
        }
        return undefined;
    };
    OLY.prototype.initModalView = function () {
        var _this = this;
        var lastSegment = document.location.pathname.split('/').pop();
        var closeClick = '<span id="close" class="close" onclick="apr.closeModalView()"></span>';
        var commentStvol = "<span class='comment-stvol'>В стволе указаны числа текущих седмиц.<br> Подробнее<a class='a-href' href='https://www.aprakos.ru/p/blog-page.html'> здесь</a>.</div>";
        var str = "\n        <section id=\"fp-content\" class=\"fp-content\">\n        <b>\u0427\u0438\u0442\u0430\u0435\u043C\u0430\u044F \u0441\u0435\u0434\u043C\u0438\u0446\u0430:</b>\n        <div id=\"modal-cweek\">\u043F\u043E \u041F\u0430\u0441\u0445\u0435&nbsp; <span class=\"red bold\">".concat(this.weeks.current[0] - this.stupka(), ",</span></div>\n        <div id=\"modal-cweek50\">\u043F\u043E \u041F\u044F\u0442\u044C&shy;\u0434\u0435\u0441\u044F\u0442&shy;\u043D\u0438\u0446\u0435 <span class=\"red bold\">").concat(this.weeks.current[0] > 7 ? this.weeks.current[0] - 7 - this.stupka() : "нет", ".</span>\n        <div>").concat(lastSegment === "stvol.html" ? commentStvol : "", "</div></div>\n        <div>").concat(lastSegment === "blog-post.html" ? "\u041E\u0442\u0441\u0442\u0443\u043F\u043A\u0430 <span class=\"red bold\">".concat(this.weeks.stupkaK[0], "</span> \u0441\u0435\u0434\u043C.") : "", "</div></div>\n        ").concat(closeClick, "\n        </section>\n        ");
        document.getElementById("first-preview").innerHTML = str;
        document.querySelector("#fp00").classList.add("fp00");
        document.querySelector("#first-preview").classList.add("fp01");
        var rpack = this.reversePack();
        rpack();
        var timerOff = setTimeout(function () {
            _this.closeModalView(timerOff);
            alert("\n Долгое отсутствие увеличивает расстояние разлуки.");
        }, 3600000);
    };
    OLY.prototype.initElementsDOM = function () {
        var _a, _b, _c;
        var stvol = document.location.pathname.split('/').pop();
        if (stvol != "stvol.html") {
            return;
        }
        (_a = document.getElementById('name')) === null || _a === void 0 ? void 0 : _a.children[0].setAttribute('href', (_b = this.linkToHolydays) !== null && _b !== void 0 ? _b : this.linkToAprakos);
        var elemsID = {
            curweek: "".concat(this.weeks.current[0]),
            curweek50: "".concat(this.weeks.current[0] < 8 ? "*" : this.weeks.current[0] - 7),
            glass: "Глаc: " + this.glas(+this.weeks.current[0]),
        };
        for (var eid in elemsID) {
            if (Object.prototype.hasOwnProperty.call(elemsID, eid)) {
                if (eid === "curweek" || eid === "curweek50") {
                    document.getElementById(eid).innerHTML = "<a href=\"#week".concat(this.anchorElemID, "\">").concat(elemsID[eid], "</a>");
                }
                else {
                    document.getElementById(eid).innerHTML = elemsID[eid];
                }
                if (eid == "glass") {
                    document.querySelector('#glass').innerHTML = elemsID[eid];
                }
            }
        }
        if (Number(elemsID.curweek) < 8) {
            (_c = document.getElementById("id50")) === null || _c === void 0 ? void 0 : _c.remove();
        }
        document.getElementById("week" + this.weeks.elemID[0]).className += " colorBlock";
        document.getElementById("weekday" + this.weeks.aprID[0]).className += " seeddayON";
    };
    OLY.prototype.glas = function (sedmica) {
        var x = sedmica;
        var n = (x % 8) * 0.1;
        var g = Math.floor(n * 10) - 1;
        switch (g) {
            case 0:
                return "8";
                break;
            case -1:
                return "7";
                break;
            default:
                return g.toString();
                break;
        }
    };
    OLY.prototype.reversePack = function () {
        var _this = this;
        var i = this.stateModalView;
        var reverseP = function () {
            i = !i;
            _this.stateModalView = i;
            return i;
        };
        return reverseP;
    };
    OLY.prototype.closeModalView = function (timerOff) {
        var _a, _b;
        localStorage.ystm = JSON.stringify({
            entries: 1,
            opasity: 0,
            visibility: "hidden",
        });
        (_a = document.querySelector("#fp00")) === null || _a === void 0 ? void 0 : _a.classList.remove("fp00");
        (_b = document.querySelector("#first-preview")) === null || _b === void 0 ? void 0 : _b.classList.remove("fp01");
        document.querySelector("#close").outerHTML = '<!-- Will embed element-->';
        document.querySelector("#fp-content").outerHTML = '<!-- Will embed element-->';
        var rpack = this.reversePack();
        rpack();
        clearTimeout(timerOff);
    };
    OLY.prototype.firstViewModal = function () {
        var aaa = localStorage.ystm;
        if (aaa == null) {
            this.initModalView();
        }
        return {};
    };
    OLY.prototype.eventKeys = function () {
        var _this = this;
        var oneClickInfo = "";
        document.addEventListener("keyup", function (event) {
            if (event.key == "F2") {
                oneClickInfo += event.code + "";
                setTimeout(function () {
                    oneClickInfo = "";
                }, 700);
            }
            if (oneClickInfo == "F2F2" && _this.stateModalView == false) {
                _this.initModalView();
            }
            else if (oneClickInfo == "F2F2" && _this.stateModalView == true) {
                oneClickInfo = "";
                _this.closeModalView();
            }
            if (event.code == "Escape") {
                oneClickInfo += event.code + "";
            }
            if (oneClickInfo == "EscapeEscape") {
                sessionStorage.removeItem('userDate');
                oneClickInfo = "";
                document.location.replace("");
            }
        });
    };
    OLY.prototype.deleteUserDateFromSessionStorage = function () {
        sessionStorage.removeItem('userDate');
        document.location.replace(document.location.origin);
    };
    return OLY;
}());
var apr = new OLY();
