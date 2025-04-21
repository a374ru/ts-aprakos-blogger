"use strict";
class OLY {
    constructor(year) {
        var _a;
        this.year = year;
        this.theMoment = new Date();
        this.offsetZone = this.theMoment.getTimezoneOffset() * 60000;
        this.theMomentOffsetZone = new Date(this.theMoment.getTime() - this.offsetZone);
        this.theMomentTime = new Date();
        this.anchorElemID = '#11';
        this.stateModalView = false;
        this.arrayDaysRu = [
            'ВОСРЕСЕНЬЕ',
            'ПОНЕДЕЛЬНИК',
            'ВТОРНИК',
            'СРЕДА',
            'ЧЕТВЕРГ',
            'ПЯТНИЦА',
            'СУББОТА',
        ];
        this.weeks = {};
        this.easterDates = {
            1998: [3, 19],
            1999: [3, 11],
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
            2055: [3, 18],
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
            2101: [3, 24],
        };
        this.NINEHOLIDAYS = {
            rojdestvoBogorodici: {
                year: 2021,
                month: 8,
                day: 21,
                monthRU: '09',
            },
            vozdvizgenieKresta: {
                year: 2020,
                month: 8,
                day: 27,
                monthRU: '09',
            },
            vvedenieVoHram: {
                year: 2020,
                month: 11,
                day: 4,
                monthRU: '12',
            },
            rojdestvoXristovo: {
                year: 2021,
                month: 0,
                day: 7,
                monthRU: '01',
            },
            kreshenieGospodne: {
                year: 2021,
                month: 0,
                day: 19,
                monthRU: '01',
            },
            sretenieGospodne: {
                year: 2021,
                month: 1,
                day: 15,
                monthRU: '02',
            },
            blagoveshenieBogorodici: {
                year: 2021,
                month: 3,
                day: 7,
                monthRU: '04',
            },
            preobrajjenieGospodne: {
                year: 2021,
                month: 7,
                day: 19,
                monthRU: '08',
            },
            uspenieBogorodici: {
                year: 2021,
                month: 7,
                day: 28,
                monthRU: '08',
            },
        };
        this.datesOLY = {};
        this.theMomentTime = this.controlDates(year);
        this.initOLY();
        this.initDatesOLY();
        this.initWeeks();
        this.linkToAprakos = '/' + this.yearMonthID() + '.html';
        this.anchorElemID = '' + this.weeks.evnglElemID[0];
        this.linkToHolydays = (_a = this.holydays_9()) !== null && _a !== void 0 ? _a : this.linkToAprakos;
        this.initElementsDOM();
        this.firstViewModal();
        this.eventKeys();
        this.reloadAprakosPage();
    }
    initOLY() {
        {
            const yearNumber = this.theMomentTime.getFullYear();
            if (this.theMomentTime >=
                new Date(Date.UTC(this.theMomentTime.getFullYear(), this.easterDates[yearNumber][0], this.easterDates[yearNumber][1]))) {
                this.oldEaster = new Date(Date.UTC(this.theMomentTime.getFullYear(), this.easterDates[yearNumber][0], this.easterDates[yearNumber][1]));
                this.newEaster = new Date(Date.UTC(this.theMomentTime.getFullYear() + 1, this.easterDates[yearNumber + 1][0], this.easterDates[yearNumber + 1][1]));
            }
            else {
                this.oldEaster = new Date(Date.UTC(this.theMomentTime.getFullYear() - 1, this.easterDates[yearNumber - 1][0], this.easterDates[yearNumber - 1][1]));
                this.newEaster = new Date(Date.UTC(this.theMomentTime.getFullYear(), this.easterDates[yearNumber][0], this.easterDates[yearNumber][1]));
            }
            console.log('\n' +
                'Прошедшая Пасха: ' +
                this.oldEaster.toLocaleDateString() +
                '\n' +
                'ОЖИДАЕМАЯ ПАСХА: ' +
                this.newEaster.toLocaleDateString());
            this.oldEasterMLS = this.oldEaster.getTime();
            this.newEasterMLS = this.newEaster.getTime();
            return true;
        }
    }
    ruday() {
        const days = ['Воскресенье', 'Понедельник', 'Вторник', ' Среда', 'Четверг', 'Пятница', 'Суббота'];
        const d = days[this.theMomentTime.getDay()];
        return d;
    }
    initWeeks() {
        const day = (this.weeks['day'] = [
            this.theMomentTime.getDay() + 1,
            'День седмицы',
            " … " + this.ruday(),
        ]);
        const all = (this.weeks['all'] = [
            Math.ceil((this.newEasterMLS - this.oldEasterMLS) / 864e5 / 7),
            'Протяженность ПБГ',
            'седмиц',
        ]);
        const current = (this.weeks['current'] = [
            Math.ceil((this.theMomentTime.getTime() - this.offsetZone - this.oldEasterMLS) /
                864e5 /
                7),
            'Текущая седмица',
        ]);
        if (current[0] == 0 || current[0] > 55) {
            this.weeks['current'][0] = 1;
        }
        const pip = (this.weeks['mif2'] = [
            Math.ceil((this.datesOLY.pip[0].getTime() - (this.datesOLY.pentecost[0].getTime() + 864e5 * 7)) / 864e5),
            'Петров пост',
            'дн.'
        ]);
        const zakhey = (this.weeks['zakhey'] = [
            all[0] - 10,
            'Седмица Закхея по Пасхе',
        ]);
        const mif = (this.weeks['mif'] = [all[0] - 9, 'Седмица МиФ по Пасхе']);
        const vozdvizgenie = (this.weeks['vozdvizgenie'] = [
            Math.ceil((this.datesOLY.vozdvizgenieKresta[0].getTime() - this.oldEasterMLS) /
                864e5 /
                7),
            'Седмица Воздвижения по Пасхе',
        ]);
        let stupkaV = (this.weeks['stupkaV'] = [
            Math.ceil((this.datesOLY.week24[0].getTime() - this.oldEasterMLS) / 864e5 / 7) - vozdvizgenie[0],
            'Воздвиженская ступка',
            'седм.',
        ]);
        let stupkaK = (this.weeks['stupkaK'] = [
            Math.abs(all[0] - 50 - -stupkaV[0]),
            'Крещенская отступка',
            'седм.',
        ]);
        this.correctorStupka();
        return this.weeks;
    }
    mondayAfterVozdvizgenie() {
        const daysUntilMonday = 1 + 7 - (this.datesOLY.vozdvizgenieKresta[0].getDay() % 7);
        let dateMonday = new Date(this.datesOLY.vozdvizgenieKresta[0].getTime() + 864e5 * daysUntilMonday);
        return this.theMomentTime >= dateMonday;
    }
    initDatesOLY() {
        this.datesOLY['pentecost'] = [
            new Date(this.oldEasterMLS + 864e5 * 49),
            'Пятьдесятница',
        ];
        this.datesOLY['pip'] = [
            new Date(this.oldEaster.getFullYear() + '-07-12T00:00:00'),
            'Петра и Павла',
        ];
        this.datesOLY['vozdvizgenieKresta'] = [
            new Date(this.oldEaster.getFullYear() + '-09-27T00:00:00'),
            'Воздвижение Креста Господня',
        ];
        this.datesOLY['week24'] = [
            new Date(this.oldEasterMLS + 864e5 * 168),
            '17/24 седмица по Пасхе',
        ];
        this.datesOLY['zakhey'] = [
            new Date(this.newEasterMLS - 864e5 * 77),
            'Неделя Закхея',
        ];
        this.datesOLY['mif'] = [
            new Date(this.newEasterMLS - 864e5 * 70),
            'Неделя МиФ',
        ];
        this.datesOLY['aboutTheProdigalSon'] = [
            new Date(this.newEasterMLS - 864e5 * 63),
            'Неделя о блудном сыне',
        ];
        this.datesOLY['aboutTheLastJudgment'] = [
            new Date(this.newEasterMLS - 864e5 * 56),
            'Неделя о страшном суде',
        ];
        this.datesOLY['aboutTheAdamsExile'] = [
            new Date(this.newEasterMLS - 864e5 * 49),
            'Неделя Адамова изгнания',
        ];
        this.datesOLY['theBeginningOfLent'] = [
            new Date(this.newEasterMLS - 864e5 * 48),
            'Начало Великого Поста',
        ];
        this.datesOLY['CrossSunday'] = [
            new Date(this.newEaster - 864e5 * 28),
            'Неделя Крестопоклонная'
        ];
        return this.datesOLY;
    }
    controlDates(userYear) {
        var _a, _b, _c;
        let currentDate = this.theMomentTime;
        let sStorageDate = sessionStorage.getItem('userDate');
        if (sessionStorage.userDate != null && userYear == undefined) {
            currentDate = new Date(Number(sessionStorage.getItem('userDate')));
        }
        else if (userYear != undefined &&
            userYear[0] < 2100 &&
            userYear[0] >= 1999) {
            currentDate = new Date(Date.UTC(userYear[0], (_a = userYear[1]) !== null && _a !== void 0 ? _a : currentDate.getMonth(), Number((_b = userYear[2]) !== null && _b !== void 0 ? _b : currentDate.getDate())));
            sessionStorage.setItem('userDate', String(currentDate.getTime()));
            location.reload();
        }
        else {
            console.info(`${userYear
                ? 'Формат введенный пользователем не подходит… попробуйте ([2099,0,7])'
                : 'Год пользователем не предоставлен…'}.\nБудет использован текущий год.\nСПАСИБО ЗА ВНИМАНИЕ!`);
        }
        if (currentDate != this.theMomentTime) {
            (_c = document.querySelector('#userdate')) === null || _c === void 0 ? void 0 : _c.remove();
            document.querySelector('body').innerHTML += `<div id="userdate" class='userdate'><a id='a-visited-userdate' href="#" onclick="apr.deleteUserDateFromSessionStorage()">${currentDate.toLocaleDateString()}</a></div>`;
        }
        return currentDate;
    }
    info() {
        var _a;
        for (const key in this.datesOLY) {
            if (Object.prototype.hasOwnProperty.call(this.datesOLY, key)) {
                const element = this.datesOLY[key];
                console.log(element[1] + ' | ' + element[0].toLocaleDateString());
            }
        }
        for (const key in this.weeks) {
            if (Object.prototype.hasOwnProperty.call(this.weeks, key)) {
                const element = this.weeks[key];
                console.log(element[1] + ' | ' + element[0]);
            }
        }
        console.info(`
            Сегодня: ${this.theMomentTime.toDateString()}
            Ссылка на Апракос: https://aprakos.blogspot.com${this.linkToAprakos}
            Ссылка на праздник: https://aprakos.blogspot.com${(_a = this.linkToHolydays) !== null && _a !== void 0 ? _a : ''}
            Справка здесь: https://aprakos.blogspot.com/p/blog-page_4.html
        `);
    }
    yearMonthID() {
        var apostolElemID = this.weeks.current[0] > 40
            ? this.weeks.current[0] + this.stupka()
            : this.weeks.current[0];
        var evangelieElemID = this.weeks.current[0] + this.stupka();
        let aprID = Number('' + evangelieElemID + this.weeks.day[0]);
        let partURL;
        switch (true) {
            case aprID <= 25:
                partURL = '2020/04/' + aprID;
                break;
            case aprID <= 71:
                partURL = '2020/05/' + aprID;
                break;
            case aprID <= 113:
                partURL = '2020/06/' + aprID;
                break;
            case aprID <= 156:
                partURL = '2020/07/' + aprID;
                break;
            case aprID <= 202:
                partURL = '2020/08/' + aprID;
                break;
            case aprID <= 244:
                partURL = '2020/09/' + aprID;
                break;
            case aprID <= 287:
                partURL = '2020/10/' + aprID;
                break;
            case aprID <= 332:
                partURL = '2020/11/' + aprID;
                break;
            case aprID <= 375:
                partURL = '2020/12/' + aprID;
                break;
            case aprID <= 407:
                partURL = '2021/01/' + aprID;
                break;
            case aprID <= 421:
                partURL = '2021/02/' + aprID;
                break;
            case aprID <= 472:
                partURL = '2021/03/' + aprID;
                break;
            case aprID <= 507:
                partURL = '2021/04/' + aprID;
                break;
            case aprID <= 517:
                partURL = '2021/05/' + aprID;
                break;
            default:
                partURL = 'search/';
                break;
        }
        this.weeks['aprID'] = [aprID, 'Апракос-ID'];
        this.weeks['apstlElemID'] = [
            apostolElemID,
            'Апостола-ID',
        ];
        this.weeks['evnglElemID'] = [
            evangelieElemID,
            'Евангелие-ID ',
        ];
        return partURL;
    }
    stupka() {
        let stupka;
        switch (this.mondayAfterVozdvizgenie()) {
            case true:
                stupka = this.stupkaN();
                break;
            case false:
                stupka = this.stupkaVozdvizjenia();
                break;
            default:
                stupka = 0;
                break;
        }
        return stupka;
    }
    stupkaN() {
        if (this.weeks.current[0] >= this.weeks.mif[0]) {
            return -(this.weeks.stupkaK[0] - this.weeks.stupkaV[0]);
        }
        if (this.weeks.current[0] < this.weeks.mif[0]) {
            var stepStupka = this.weeks.current[0] + this.weeks.stupkaV[0];
            var per = -this.weeks.stupkaK[0] + this.weeks.stupkaV[0];
            if (stepStupka > 40 && stepStupka < 47) {
                return per;
            }
            return this.weeks.stupkaV[0];
        }
        return 0;
    }
    stupkaVozdvizjenia(week) {
        this.weeks.evnglElemID = this.weeks.apstlElemID;
        return 0;
    }
    stupkaK() {
        return 0;
    }
    holydays_9() {
        let link_to_hld9 = undefined;
        let tmt = this.theMomentTime.getMonth() + '/' + this.theMomentTime.getDate();
        for (let item in this.NINEHOLIDAYS) {
            let pathToHollliday = this.NINEHOLIDAYS[item].year +
                '/' +
                this.NINEHOLIDAYS[item].monthRU +
                '/' +
                this.NINEHOLIDAYS[item].day;
            let date_9 = new Date(pathToHollliday);
            let h9 = date_9.getMonth() + '/' + date_9.getDate();
            if (h9 === tmt) {
                link_to_hld9 =
                    '/' +
                        this.NINEHOLIDAYS[item].year +
                        '/' +
                        this.NINEHOLIDAYS[item].monthRU +
                        '/' +
                        this.NINEHOLIDAYS[item].day +
                        '.html';
                return link_to_hld9;
                break;
            }
        }
        return undefined;
    }
    initModalView() {
        let lastSegment = document.location.pathname.split('/').pop();
        const closeClick = '<span id="close" class="close" onclick="apr.closeModalView()"></span>';
        const commentStvol = "<span class='comment-stvol'>В стволе указаны числа текущих седмиц.<br> Подробнее<a class='a-href' href='https://www.aprakos.ru/p/blog-page.html'> здесь</a>.</div>";
        let str = `
        <section id="fp-content" class="fp-content">
        <b>Седмица Евангелия: </b>
        <div id="modal-cweek">по Пасхе&nbsp; <span class="red bold">${this.anchorElemID},</span></div>
        <div id="modal-cweek50">по Пять&shy;десят&shy;нице <span class="red bold">${this.weeks.current[0] > 7 ? Number(this.anchorElemID) - 7 : 'нет'}.</span>
        <div>${lastSegment === 'stvol.html'
            ? `${this.weeks.stupkaV[1]} <span class="red bold">${Math.abs(this.weeks.stupkaV[0])}</span> седм.`
            : ''}</div></div>
        <div>${lastSegment === 'stvol.html'
            ? `${this.weeks.stupkaK[1]} <span class="red bold">${Math.abs(this.weeks.stupkaK[0])}</span> седм.`
            : ''}</div></div>
        <div>${lastSegment === 'stvol.html'
            ? `${this.weeks.all[1]} <span class="red bold">${Math.abs(this.weeks.all[0])}</span> седм.`
            : ''}</div></div>
        <div>${lastSegment === 'stvol.html' ? commentStvol : ''}</div></div>
        <div>${lastSegment === 'blog-post.html'
            ? `${this.weeks.stupkaK[1]} <span class="red bold">${Math.abs(this.weeks.stupkaK[0])}</span> седм.`
            : ''}</div></div>
        <div>${lastSegment === 'blog-page_13.html'
            ? `${this.weeks.stupkaK[1]} <span class="red bold">${Math.abs(this.weeks.stupkaK[0])}</span> седм.`
            : ''}</div></div>
        ${closeClick}
        </section>
        `;
        document.getElementById('first-preview').innerHTML = str;
        document.querySelector('#fp00').classList.add('fp00');
        document.querySelector('#first-preview').classList.add('fp01');
        const rpack = this.reversePack();
        rpack();
        let timerOff = setTimeout(() => {
            this.closeModalView(timerOff);
            alert('\n Долгое отсутствие увеличивает расстояние разлуки.');
        }, 3600000);
    }
    correctorStupka() {
        this.weeks.stupkaV[1] = String(this.weeks.stupkaV[0] <= 0
            ? 'Воздвиженская отступка'
            : 'Воздвиженская преступка');
    }
    initElementsDOM() {
        var _a, _b, _c;
        const stvol = document.location.pathname.split('/').pop();
        if (stvol != 'stvol.html') {
            return;
        }
        (_a = document
            .getElementById('name')) === null || _a === void 0 ? void 0 : _a.children[0].setAttribute('href', (_b = this.linkToHolydays) !== null && _b !== void 0 ? _b : this.linkToAprakos);
        let elemsID = {
            curweek: `${this.weeks.current[0]}`,
            curweek50: `${this.weeks.current[0] < 8 ? '*' : this.weeks.current[0] - 7}`,
            glass: 'Глаc: ' + this.glas(+this.weeks.current[0]),
        };
        for (const atrubuteID in elemsID) {
            if (Object.prototype.hasOwnProperty.call(elemsID, atrubuteID)) {
                if (atrubuteID === 'curweek') {
                    document.getElementById(atrubuteID).innerHTML = `<a href="#week${this.weeks.apstlElemID[0]}">${elemsID[atrubuteID]}</a>`;
                }
                else if (atrubuteID === 'curweek50') {
                    document.getElementById(atrubuteID).innerHTML = `<a href="#week${this.weeks.evnglElemID[0]}">${elemsID[atrubuteID]}</a>`;
                }
                else {
                    document.getElementById(atrubuteID).innerHTML = elemsID[atrubuteID];
                }
                if (atrubuteID == 'glass') {
                    document.querySelector('#glass').innerHTML = elemsID[atrubuteID];
                }
            }
        }
        if (Number(elemsID.curweek) < 8) {
            (_c = document.getElementById('id50')) === null || _c === void 0 ? void 0 : _c.remove();
        }
        document.getElementById('weekday' + this.weeks.apstlElemID[0] + this.weeks.day[0]).className += ' apstl-day';
        document.getElementById('weekday' + this.weeks.apstlElemID[0] + this.weeks.day[0]).style.lineHeight = '3.5rem';
        document.getElementById('week' + this.weeks.apstlElemID[0]).className +=
            ' color-block-apstl-stupka';
        if (this.weeks.evnglElemID[0] != this.weeks.apstlElemID[0]) {
            document.getElementById('weekday' + this.weeks.evnglElemID[0] + this.weeks.day[0]).className += ' evngl-day';
            document.getElementById('week' + this.weeks.evnglElemID[0]).className +=
                ' color-block-evngl-stupka';
            document.getElementById('weekday' + this.weeks.evnglElemID[0] + this.weeks.day[0]).style.lineHeight = '3.5rem';
        }
        else {
            document.getElementById('weekday' + this.weeks.evnglElemID[0] + this.weeks.day[0]).className += ' evngl-day';
            document.getElementById('weekday' + this.weeks.aprID[0]).className +=
                ' seedday-week-on';
            document
                .getElementById('week' + this.weeks.apstlElemID[0])
                .classList.remove('color-block-apstl-stupka');
            document.getElementById('week' + this.weeks.apstlElemID[0]).className +=
                ' color-block';
        }
        if (this.weeks.evnglElemID[0] == 50) {
            document
                .querySelector('#week50')
                .setAttribute('style', 'border: solid 4rem #fedede; background-color: #fedede;');
        }
    }
    glas(sedmica) {
        let x = sedmica;
        let n = (x % 8) * 0.1;
        let g = Math.floor(n * 10) - 1;
        switch (g) {
            case 0:
                return '8';
                break;
            case -1:
                return '7';
                break;
            default:
                return g.toString();
                break;
        }
    }
    reversePack() {
        let i = this.stateModalView;
        const reverseP = () => {
            i = !i;
            this.stateModalView = i;
            return i;
        };
        return reverseP;
    }
    closeModalView(timerOff) {
        var _a, _b;
        localStorage.ystm = JSON.stringify({
            entries: 1,
            opasity: 0,
            visibility: 'hidden',
        });
        (_a = document.querySelector('#fp00')) === null || _a === void 0 ? void 0 : _a.classList.remove('fp00');
        (_b = document.querySelector('#first-preview')) === null || _b === void 0 ? void 0 : _b.classList.remove('fp01');
        document.querySelector('#close').outerHTML = '<!-- Will embed element-->';
        document.querySelector('#fp-content').outerHTML =
            '<!-- Will embed element-->';
        const rpack = this.reversePack();
        rpack();
        clearTimeout(timerOff);
    }
    firstViewModal() {
        const aaa = localStorage.ystm;
        if (aaa == null) {
            this.initModalView();
        }
        return {};
    }
    eventKeys() {
        let oneClickInfo = '';
        document.addEventListener('keyup', event => {
            if (event.key == 'F2') {
                oneClickInfo += event.code + '';
                setTimeout(() => {
                    oneClickInfo = '';
                }, 700);
            }
            if (oneClickInfo == 'F2F2' && this.stateModalView == false) {
                this.initModalView();
            }
            else if (oneClickInfo == 'F2F2' && this.stateModalView == true) {
                oneClickInfo = '';
                this.closeModalView();
            }
            if (event.code == 'Escape') {
                oneClickInfo += event.code + '';
            }
            if (oneClickInfo == 'EscapeEscape') {
                sessionStorage.removeItem('userDate');
                oneClickInfo = '';
                document.location.replace('');
            }
        });
    }
    deleteUserDateFromSessionStorage() {
        sessionStorage.removeItem('userDate');
        document.location.replace(document.location.origin);
    }
    reloadAprakosPage() {
        let cd = new Date();
        let nextDay = new Date(cd.getFullYear(), cd.getMonth(), cd.getDate() + 1);
        let interval = nextDay.getTime() - cd.getTime();
        setTimeout(function () {
            document.location.reload();
        }, interval);
    }
}
let apr = new OLY();
class SelectedDay {
    constructor() {
        this.newDate = document.getElementById('form-date');
        this.userDate_ss = sessionStorage.getItem('userDate');
        this.checkbox = sessionStorage.getItem('userCheck');
        this.counter = 0;
        if (this.newDate) {
            this.setUserData();
            this.setColor();
            this.widthButton();
            this.listener();
        }
    }
    setUserData() {
        const color = this.userDate_ss
            ? '<span style="color: #e34234">'
            : '<span style="color: #000">';
        const color2 = this.userDate_ss
            ? '<span style="font-weight: 600; color: #5d01ff">'
            : '<span style="color: #000">';
        if (this.counter == 0) {
            let easterData = document.querySelector('#easter');
            easterData.innerHTML +=
                '<span style="font-size: 1.5rem; opasity: .5;"><span style="color: #0005"> Прошедшая Пасха: ' +
                    apr.oldEaster.toLocaleDateString() +
                    '</span><br>' +
                    'ОЖИДАЕМАЯ ПАСХА: ' +
                    color +
                    apr.newEaster.toLocaleDateString() +
                    '</span></span>';
            const obj = apr.weeks;
            const ul = document.getElementById('listWeeks');
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var element = obj[key];
                    const li = document.createElement('li');
                    var str = " ";
                    if (element[2] != undefined) {
                        str += element[2];
                    }
                    li.innerHTML += element[1] + ': ' + color2 + element[0] + str;
                    ul.appendChild(li) + '</span>';
                }
            }
            const obj2 = apr.datesOLY;
            const ul2 = document.getElementById('listDatesOly');
            for (var key in obj2) {
                if (Object.prototype.hasOwnProperty.call(obj2, key)) {
                    let element = obj2[key];
                    const li = document.createElement('li');
                    li.innerHTML +=
                        element[1] + ': ' + color + element[0].toLocaleDateString();
                    ul2.appendChild(li) + '</span>';
                }
            }
        }
        this.counter = this.counter + 1;
    }
    reloadPage() {
        if (!this.checkbox) {
            sessionStorage.removeItem('userCheck');
            sessionStorage.removeItem('userDate');
        }
        else {
            var lastDate = new Date(Number(this.userDate_ss));
            sessionStorage.setItem('lastInstalledDate', lastDate.toISOString().slice(0, 10));
            sessionStorage.removeItem('userDate');
        }
        document.location.reload();
    }
    setColor() {
        let show = 'visibility';
        let hide = 'hidden';
        if (this.userDate_ss) {
            document.getElementById('form-date').classList.add(hide);
            let returnToRealDate = document.getElementById('button-red');
            returnToRealDate.classList.add(show);
            returnToRealDate.focus();
            document
                .getElementById('warningString')
                .setAttribute('style', 'color:red; font-wigth: bold; font-weight: bolder;');
            document.getElementById('apr-year').innerHTML =
                ' для ' +
                    '<span style="padding-left: .4rem; color: #000"> ' +
                    new Date(+this.userDate_ss).toLocaleDateString() +
                    ' ✔️ </span>';
        }
        else {
            let dateFromForm = document.querySelector('input[type="date"]');
            if (this.checkbox) {
                this.newDate[0].checked = true;
            }
            !this.checkbox ? dateFromForm.value = apr.theMomentOffsetZone.toISOString().slice(0, 10)
                : dateFromForm.value = sessionStorage.getItem('lastInstalledDate');
            document.getElementById('form-date').classList.add(show);
            document.getElementById('button-red').classList.add(hide);
            document.getElementById('apr-year').innerText = ' СЕГО ДНЯ ';
        }
    }
    serializeForm(dataftf) {
        let d = [];
        const check = dataftf["fixed-date"].checked;
        if (check) {
            sessionStorage.setItem('userCheck', 'check');
        }
        else {
            sessionStorage.removeItem('userCheck');
        }
        const inputDate = dataftf["adate"].value;
        d = [+inputDate.slice(0, 4), +inputDate.slice(5, 7) - 1, +inputDate.slice(-2)];
        new OLY(d);
    }
    widthButton() {
        if (window.innerWidth < 660) {
            document.getElementById('submit').value = "✔️";
            document.getElementById('submit').style.backgroundColor = "#ffe6d3";
        }
    }
    listener() {
        this.newDate.addEventListener('submit', (e) => {
            e.preventDefault();
            this.serializeForm(this.newDate);
        });
    }
}
let set = new SelectedDay();
