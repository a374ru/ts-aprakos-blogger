// вторник, 15 октября 2024 г. 09:29:56 (MSK)

/*
    --- APRAKOS.BLOGSPOT.COM VERSION ---
*/


interface IOLY {
    /**
     * Ссылка на элемент в стволе `Древа жизни`.
    […здесь](https://aprakos.blogspot.com/2020/07/stvol.html). 
     Соответствует **текущей седмице** с учетом ступок и текущему **дню** этой седмице.
     */
    anchorElemID: string;

    /**
    * Ссылка на страницу сайта с зачалами для текущего дня согласно Церковному уставу.
    […здесь](https://aprakos.blogspot.com/). 
    Соответствует странице html с учетом ступок и текущему **дню** в седмице.
    */
    linkToAprakos: string;

    /**
     * Массив дней по-русски начиная с единицы.
     */
    readonly arrayDaysRu: string[];

    // =-=-=-=-=-=-=-=-=-
    // Вычисление кол-ва седмиц между Пасхами Православнными.
    // =-=-=-=-=-=-=-=-=-

    /**
     * Пасхалия
     */
    readonly easterDates: {};

    /**
     * Колекция девяти статических дат двунадесятых праздников.
     */
    readonly NINEHOLIDAYS: {};

    // theMomentTime = new Date("2001") // min
    // theMomentTime = new Date("2099") // max
    /**
     * Текущий момент времени.
     */
    theMomentTime: Date;

    /**
     * Отступ коррктировки для часовой зоны, так как все вычисления внутри компилятора ведутся по GMT
     * 
     */
    offsetZone: Number;

    /**
     * Дата прошедшей Пасхи.
     */
    oldEaster: Date;

    /**
     * Дата ожидаемой Пасхи.
     */
    newEaster: Date;

    /**
     *  Текущий номер дня
     */
    // currentDay: number;

    /**
     * currentDayRU
     */
    // currentDayRU: string;

    /**
     * Коллекция вычисленных седмиц в Богослужебном году от Пасхи до Пасхи.
     * Ограничивается диапазоном значений в Пасхалии: `min+1` и `max`.
     */
    weeks: {};

    /**
     * Коллекция дат Православного Богослужебного Года ПБГ.
     */
    datesOLY: {};

    /**
     * Абревиатура **ПБГ(OLY)** – Православный Богослужебный Год.

     * Абревиатура **ГНГ(GNY)** - Григорианский Новый Год.

     * Абревиатура **OLY** - The Orthodox Liturgical Year.
     *
     * Вычисление диапазона, проверка и корректировка дат Пасх для текущего ПБГ.
     *
     * >ГНГ разделяет ПБГ на две части — ` oly_1 ` и ` oly_2 `.
     *
     * 1. Метод вычисляет момент и в зависимости от полугодия и введеного пользователем года.
     * 2. Устанавливает даты прошедшей и ожидаемой Пасх для корректного расчета седмиц.
     * Диапазон между двумя датами Пасх есть пасхальный размер.
     */

    initOLY(): void;
}

class OLY implements IOLY {

    theMoment = new Date();

    offsetZone = this.theMoment.getTimezoneOffset() * 60000

    // ??? Проба настроить точное соответствие часов в момент наступления воскресения.
    theMomentTime = new Date(
        // this.theMoment.getFullYear(),
        // this.theMoment.getMonth(),
        // this.theMoment.getDate(),
        // this.theMoment.getHours()
    )
    oldEaster: any
    newEaster: any
    oldEasterMLS: any
    newEasterMLS: any
    anchorElemID = "#11"
    linkToAprakos: string
    linkToHolydays?: string
    linkToRedirect?: string
    stateModalView = false
    // userLoc: any


    constructor(public year?: [number, number?]) {
        this.theMomentTime = this.controlDates(year)
        this.initOLY()
        this.initDatesOLY()
        this.initWeeks()
        this.linkToAprakos = "/" + this.yearMonthID() + ".html" // с учетом ступок
        this.anchorElemID = "" + this.weeks.evnglElemID[0]
        this.linkToHolydays = this.holydays_9() ?? this.linkToAprakos
        this.info()
        this.initElementsDOM()
        this.firstViewModal()
        this.eventKeys()
        this.reloadAprakosPage()

    }

    arrayDaysRu: string[] = [
        "ВОСРЕСЕНЬЕ",
        "ПОНЕДЕЛЬНИК",
        "ВТОРНИК",
        "СРЕДА",
        "ЧЕТВЕРГ",
        "ПЯТНИЦА",
        "СУББОТА",
    ];

    /**
     *  Коллекция значений для ряда седмиц всего ПБГ.
     *
     * [0] - число седмицы,
     * [1] - description,
     * [2] - откорректированное значение [0]
     *
     */
    weeks: { [key: string]: [number, string?, any?] } = {};

    // TODO Расширить Пасхалию до 1900 года 

    easterDates: { [key: string]: [number, number] } = {
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
        2101: [3, 24]
    };


    NINEHOLIDAYS: { [key: string]: { [key: string]: number | string } } = {
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
        // 0 = month of January
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

        // Здесь бывают по календарю еще четыре `ПЕРЕХОДЯЩИХ` празнества:
        // 8. Вход Господень в Иерусалим,
        // 0. Пасха(не входящая в состав двунадесятых),
        // 9. Вознесение,
        // 10. Пятьдесятница.

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

    datesOLY: { [key: string]: [Date, string?] } = {};

    initOLY(): boolean {
        {
            const yearNumber = this.theMomentTime.getFullYear();
            if (
                this.theMomentTime >=
                new Date(Date.UTC(
                    this.theMomentTime.getFullYear(),
                    this.easterDates[yearNumber][0],
                    this.easterDates[yearNumber][1]
                ))
            ) {
                // oly_1 
                this.oldEaster = new Date(Date.UTC(
                    this.theMomentTime.getFullYear(),
                    this.easterDates[yearNumber][0],
                    this.easterDates[yearNumber][1]
                ));
                this.newEaster = new Date(Date.UTC(
                    this.theMomentTime.getFullYear() + 1,
                    this.easterDates[yearNumber + 1][0],
                    this.easterDates[yearNumber + 1][1]
                ));
            } else {
                // oly_2 
                this.oldEaster = new Date(Date.UTC(
                    this.theMomentTime.getFullYear() - 1,
                    this.easterDates[yearNumber - 1][0],
                    this.easterDates[yearNumber - 1][1]
                ));

                this.newEaster = new Date(Date.UTC(
                    this.theMomentTime.getFullYear(),
                    this.easterDates[yearNumber][0],
                    this.easterDates[yearNumber][1]
                ));
            }
            console.log(
                "\n" +
                "Прошедшая Пасха: " +
                this.oldEaster.toLocaleDateString() +
                "\n" +
                "ОЖИДАЕМАЯ ПАСХА: " +
                this.newEaster.toLocaleDateString()
            );

            this.oldEasterMLS = this.oldEaster.getTime();
            this.newEasterMLS = this.newEaster.getTime();

            return true;
        }

    }

    /**
     * Метод заполняет вычисленными значениями объект `weeks`.
     * В методе вычисляются все операции связанные с седмицами ПБГ.
     * Отступки для седмиц также вычисляются в данном методе.
     *
     *
     * @returns {boolean}
     */
    initWeeks(): {} {
        const day = (this.weeks["day"] = [
            this.theMomentTime.getDay() + 1,
            "День седмицы",
        ]);
        const all = (this.weeks["all"] = [
            Math.ceil((this.newEasterMLS - this.oldEasterMLS) / 864e5 / 7),
            "Протяженность ПБГ",
        ]);

        // Добавление миллисекунды к пользовательскому вводу для избежания целочисленного значения.
        // let addMLS = sessionStorage.getItem('userDate') ? 0.001 : 0

        const current = (this.weeks["current"] = [

            //  S:S  Неправильное вычисление седмицы в текущей строке, происходит сбой седмицы независимо от делителя.
            Math.ceil(
                (this.theMomentTime.getTime() - this.offsetZone - this.oldEasterMLS) / 864e5 / 7
            ),
            "Текущая седмица",
            // "Здесь происходит вычисление текущей седмицы которая зависит от системных вычислений по миллисекундам и делителя седмиц. Делитель `6.999999999` при вычислениях дает совершенно иной результат – более точный. Если делитель равен семи, то в определённый момент вычисления возвращается неверный результат."
        ]);

        // Переопределения значения дня Пасхи с нуля на единицу, так как нулевой седмицы не бывает.
        ///////////////////////////////////
        if (current[0] == 0 || current[0] > 55) { this.weeks["current"][0] = 1 }
        //////////////////////////////////

        const mif = (this.weeks["mif"] = [all[0] - 9, "Седмица МиФ по Пасхе"]);
        const zakhey = (this.weeks["zakhey"] = [mif[0] - 1, "Седмица Закхея по Пасхе"]);

        const vozdvizgenie = (this.weeks["vozdvizgenie"] = [
            Math.ceil(
                (this.datesOLY.vozdvizgenieKresta[0].getTime() - this.oldEasterMLS) /
                864e5 /
                7
            ),
            "Седмица Воздвижения по Пасхе",
        ]);
        let stupkaV = this.weeks["stupkaV"] = [
            Math.ceil(
                (this.datesOLY.week24[0].getTime() - this.oldEasterMLS) / 864e5 / 7
            ) - vozdvizgenie[0],
            "Воздвиженская ступка",
        ];

        let stupkaK = (this.weeks["stupkaK"] = [
            Math.abs(all[0] - 50 - (- stupkaV[0])),
            "Крещенская отступка"
        ]);

        this.correctorStupka()
        return this.weeks; // вернуть словарь седмиц
    }

    /**
     * Метод вычисляет первый понедельник по Воздвижении Креста. 
     * Начало чтения зачал от Луки, зачало 10-е.
     *
     * Возвращает результат сравнения для данного понедельника и текущего момента времени.
     *
     * @returns {boolean}
     */
    mondayAfterVozdvizgenie(): boolean {

        // Возвращает количество дней до понедельника от даты воздвижения
        const daysUntilMonday =
            1 + 7 - (this.datesOLY.vozdvizgenieKresta[0].getDay() % 7);

        // Вычисление даты для данного понедельника
        let dateMonday = new Date(
            this.datesOLY.vozdvizgenieKresta[0].getTime() + 864e5 * daysUntilMonday);
        // console.log(`-=-=-=-=-=-=-=-=-\n\n Дней до понедельника:\n ${daysUntilMonday}`, dateMonday,"\n\n")
        // DONE: #31 @374ru FLOAT YEARS В данном месте сравнивются дата понедельника по воздвижении системной датой. Требуется сравнение с понедельником ПБГ.
        return this.theMomentTime >= dateMonday;
    }

    /**
     * Инициализирует список дат `datesOLY` для заявленного года.
     * @returns {object}
     */
    initDatesOLY(): {} {
        // DONE: #26 Неправильное вычисление дат в 2011г. и менее 
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

        // Дата Воскресения 18 седмицы по Пятьдесятнице при условии что в воскресенье является первым днём седмицы.
        // После Пасхи это 24 седмица и число 168 указывает на количество дней в 24 седмицах.
        // Это дата, после которой в понедельник, то есть завтра начинается чтение зачал от Луки.
        this.datesOLY["week24"] = [
            new Date(this.oldEasterMLS + 864e5 * 168),
            "17/24 седмица по Пасхе",
        ];

        return this.datesOLY;
    }


    /**
     * Проверяет введенный пользователем год на присутствие в Пасхалии.
     * Если введенный год невалидный, возвращаем текущую дату.
     *
     * @param userYear
     * @returns {Date}
     */
    controlDates(userYear: [number, number?, number?] | undefined): Date {

        let currentDate = this.theMomentTime;

        let sStorageDate = sessionStorage.getItem('userDate')

        if (sessionStorage.userDate != null && userYear == undefined) {

            currentDate = new Date(Number(sessionStorage.getItem('userDate')))

        }
        else if (userYear != undefined && userYear[0] < 2100 && userYear[0] >= 1999) {
            // currentDate = new Date(userYear, Number(currentDate.getMonth()), Number(currentDate.getDate()))
            currentDate = new Date(Date.UTC(
                userYear[0],
                userYear[1] ?? currentDate.getMonth(),
                Number(userYear[2] ?? currentDate.getDate())
            ));
            // Добавка секунды к пользовательскому вводу даты
            sessionStorage.setItem('userDate', String(currentDate.getTime()))

            // здесь нужно перезагрузить страницу для очистки экземпляра `apr`
            location.reload()

        } else {
            console.warn(
                `${userYear
                    ? "Формат введенный пользователем не подходит… попробуйте ([2099,0,7])"
                    : "Год пользователем не предоставлен…"
                }.\nБудет использован текущий год.\nСПАСИБО ЗА ВНИМАНИЕ!`
            );

        }

        ///////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////// FOR DEV… ////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////

        if (currentDate != this.theMomentTime) {
            document.querySelector('#userdate')?.remove()
            document.querySelector('body')!.innerHTML +=
                `<div id="userdate" class='userdate'><a id='a-visited-userdate' href="#" onclick="apr.deleteUserDateFromSessionStorage()">${currentDate.toLocaleDateString()}</a></div>`
        }
        ///////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////// end ////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////


        return currentDate;
    }

    /**
     * Выводит все значения объектов в консоль
     *
     */
    info() {
        for (const key in this.datesOLY) {
            if (Object.prototype.hasOwnProperty.call(this.datesOLY, key)) {
                const element = this.datesOLY[key];
                console.log(element[1] + " | " + element[0].toLocaleDateString());
            }
        }
        for (const key in this.weeks) {
            if (Object.prototype.hasOwnProperty.call(this.weeks, key)) {
                const element = this.weeks[key];
                console.log(element[1] + " | " + element[0]);
            }
        }

        console.warn(`
Сегодня: ${this.theMomentTime.toDateString()}
Ссылка на Апракос: https://aprakos.blogspot.com${this.linkToAprakos}
Ссылка на праздник: https://aprakos.blogspot.com${this.linkToHolydays ?? ""}
Справка здесь: https://aprakos.blogspot.com/p/blog-page_4.html
        `);

        // return
    }

    /**
     * Добавляет в `weeks` часть URL и ID Апракоса.
     * `Switch` этого метода дествителен только для публикаций на aprakos.blogspot.com 2020-2021 года, где дни чтений совпадают с текущими днями этих годов!!
     * Формирование части URL для ссылки на текущий Апракос в соответствии с месяцами ситемного года.
     *
     * @returns string
     */
    yearMonthID() {
        var apostolElemID = (this.weeks.current[0] > 40) ? this.weeks.current[0] + this.stupka() : this.weeks.current[0]
        var evangelieElemID = this.weeks.current[0] + this.stupka()
        let aprID = Number(
            "" + evangelieElemID + this.weeks.day[0]
        ); // конкатенация двух чисел

        let partURL: string;
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
            case aprID <= 507:
                partURL = "2021/04/" + aprID;
                break;
            case aprID <= 517:
                partURL = "2021/05/" + aprID;
                break;

            default:
                partURL = "search/";
                break;
        }
        this.weeks["aprID"] = [aprID, "Апракос-ID"]
        this.weeks["evnglElemID"] = [evangelieElemID, "Элемент-ID Евангельского зачала"]
        this.weeks["apstlElemID"] = [apostolElemID, "Элемент-ID Апостольского зачала"]
        // this.weeks["partURL"] = [partURL, "Часть URL"]
        return partURL;
    }

    //- =-=-=-=-=-=-=-=-=-=-=-=-= Реализация отступки =-=-=-=-=-=-=-=-=-=-

    stupka(): number {
        // Прверяет текщую седмицу.
        let stupka: number;

        switch (this.mondayAfterVozdvizgenie()) {
            case true:
                stupka = this.stupkaN(); // нормализация ссылки до MiF
                break;
            case false:
                stupka = this.stupkaVozdvizjenia(); // передаем сюда текущую седмицу
                break;

            default:
                stupka = 0;
                break;
        }
        return stupka;
    }

    /**
     * Метод нормализации ступки возвращает шаг ступки для одной из двух или трех возможных зон седмиц.
     *
     * @returns number
     */
    stupkaN(): number {
        if (this.weeks.current[0] >= this.weeks.mif[0]) {
            return -(this.weeks.stupkaK[0] - this.weeks.stupkaV[0])
        }
        if (this.weeks.current[0] < this.weeks.mif[0]) {

            var stepStupka = this.weeks.current[0] + this.weeks.stupkaV[0]
            var per = -this.weeks.stupkaK[0] + this.weeks.stupkaV[0]

            // этот if проверяет и нормализует отступку, которая возникают при Воздвиженской преступке Евангелия.
            if (stepStupka > 40 && stepStupka < 47) {
                return per
            }
            return this.weeks.stupkaV[0]
        }
        // if (this.weeks.current[0] >= this.weeks.mif[0] - this.weeks.stupkaV[0] && (this.weeks.current[0] < this.weeks.mif[0])) {
        //     return this.weeks.stupkaK[0] - this.weeks.stupkaV[0];
        // }
        return 0
    }

    /**
     * Метод для реализации редкого варианта ОТступки на ВОЗДВИЖЕНИЕ для далеких времен.
     * Смотреть литературу по толкованию пяти дней для Воздвиженской ОТступки.
     *
     * @param week
     * @returns
     */
    stupkaVozdvizjenia(week?: number) {
        this.weeks.evnglElemID = this.weeks.apstlElemID
        return 0;
    }

    /**
     * Метод для внесения будущих непредвиденных вычислительных обстоятельств и тестов.
     *
     * @returns number
     */
    stupkaK(): number {
        // смотри в проблемах a4012024 
        return 0;
    }

    /**
     *  Метод проверяет текущий день на Двунадясятый праздник
     * Возвращает сегмент URL для случившегося праздника
     * 
     * @returns string
     */
    holydays_9() {
        let link_to_hld9 = undefined;
        let tmt =
            this.theMomentTime.getMonth() + "/" + this.theMomentTime.getDate();
        for (let item in this.NINEHOLIDAYS) {

            let pathToHollliday =
                this.NINEHOLIDAYS[item].year +
                "/" +
                this.NINEHOLIDAYS[item].monthRU +
                "/" +
                this.NINEHOLIDAYS[item].day;
            let date_9 = new Date(pathToHollliday);
            // console.log(date_9);
            // console.log(tmt);

            let h9 = date_9.getMonth() + "/" + date_9.getDate();

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
    }

    /**
     * Метод всплывающего окна с указанием читаемой седмицы.
     * На определенных страницах показывает отступку.
     * @returns description
     */
    initModalView() {
        let lastSegment = document.location.pathname.split('/').pop()
        const closeClick = '<span id="close" class="close" onclick="apr.closeModalView()"></span>';
        const commentStvol =
            "<span class='comment-stvol'>В стволе указаны числа текущих седмиц.<br> Подробнее<a class='a-href' href='https://www.aprakos.ru/p/blog-page.html'> здесь</a>.</div>";

        let str = `
        <section id="fp-content" class="fp-content">
        <b>Седмица Евангелия: </b>
        <div id="modal-cweek">по Пасхе&nbsp; <span class="red bold">${this.anchorElemID},</span></div>
        <div id="modal-cweek50">по Пять&shy;десят&shy;нице <span class="red bold">${this.weeks.current[0] > 7 ? Number(this.anchorElemID) - 7 : "нет"}.</span>
        <div>${lastSegment === "stvol.html" ? `${this.weeks.stupkaV[1]} <span class="red bold">${Math.abs(this.weeks.stupkaV[0])}</span> седм.` : ""}</div></div>
        <div>${lastSegment === "stvol.html" ? `${this.weeks.stupkaK[1]} <span class="red bold">${Math.abs(this.weeks.stupkaK[0])}</span> седм.` : ""}</div></div>
        <div>${lastSegment === "stvol.html" ? `${this.weeks.all[1]} <span class="red bold">${Math.abs(this.weeks.all[0])}</span> седм.` : ""}</div></div>
        <div>${lastSegment === "stvol.html" ? commentStvol : ""}</div></div>
        <div>${lastSegment === "blog-post.html" ? `${this.weeks.stupkaK[1]} <span class="red bold">${Math.abs(this.weeks.stupkaK[0])}</span> седм.` : ""}</div></div>
        <div>${lastSegment === "blog-page_13.html" ? `${this.weeks.stupkaK[1]} <span class="red bold">${Math.abs(this.weeks.stupkaK[0])}</span> седм.` : ""}</div></div>
        ${closeClick}
        </section>
        `;

        document.getElementById("first-preview")!.innerHTML = str;
        document.querySelector("#fp00")!.classList.add("fp00");
        document.querySelector("#first-preview")!.classList.add("fp01");
        const rpack = this.reversePack(); rpack()

        // reversePack = false;

        let timerOff = setTimeout(() => {
            this.closeModalView(timerOff);
            alert(
                "\n Долгое отсутствие увеличивает расстояние разлуки."
            );
        }, 3600000);

        // return true;


    }

    correctorStupka() {

        this.weeks.stupkaV[1] = String(this.weeks.stupkaV[0] <= 0 ? "Воздвиженская отступка" : "Воздвиженская преступка")
        // this.weeks.stupkaK[1] = this.weeks.stupkaK[0] < 0 ? "Крещенская отступка": "Крещенская преступка";

    }

    /**
     *  Метод инициализации элементов `DOM`
     *
     */
    initElementsDOM() {

        // проверка страницы для инита
        const stvol = document.location.pathname.split('/').pop()
        if (stvol != "stvol.html") { return }

        document.getElementById('name')?.children[0].setAttribute('href', this.linkToHolydays ?? this.linkToAprakos)

        // ID-список инициируемых элементов
        let elemsID: { [key: string]: string } = {
            // link_apr: this.linkToAprakos,
            curweek: `${this.weeks.current[0]}`,
            // title50: `По пятьдесятнице`,
            curweek50: `${this.weeks.current[0] < 8 ? "*" : this.weeks.current[0] - 7}`,

            // Гласс текущей седмицы
            glass: "Глаc: " + this.glas(+this.weeks.current[0])
        };

        for (const atrubuteID in elemsID) {
            if (Object.prototype.hasOwnProperty.call(elemsID, atrubuteID)) {

                if (atrubuteID === "curweek") {
                    document.getElementById(atrubuteID)!.innerHTML = `<a href="#week${this.weeks.apstlElemID[0]}">${elemsID[atrubuteID]}</a>`
                    // throw new ReferenceError(eid)
                }

                else if (atrubuteID === "curweek50") {
                    document.getElementById(atrubuteID)!.innerHTML = `<a href="#week${this.weeks.evnglElemID[0]}">${elemsID[atrubuteID]}</a>`

                    // throw new ReferenceError(eid)
                }

                else {
                    document.getElementById(atrubuteID)!.innerHTML = elemsID[atrubuteID]
                }

                if (atrubuteID == "glass") {
                    document.querySelector('#glass')!.innerHTML = elemsID[atrubuteID]
                }

            }
        }

        // Удаление элемента со страницы если Пятьдесятницы еще не было.
        if (Number(elemsID.curweek) < 8) {
            document.getElementById("id50")?.remove()
            // document.getElementById("id50")!.className += " hidden";
        }


        // выделение цветом блока текущей седмицы и  дня в ней

        document.getElementById("weekday" + this.weeks.apstlElemID[0] + this.weeks.day[0])!.className += " apstl-day"
        document.getElementById("weekday" + this.weeks.apstlElemID[0] + this.weeks.day[0])!.style.lineHeight = "3.5rem"
        document.getElementById("week" + this.weeks.apstlElemID[0])!.className += " color-block-apstl-stupka"

        if (this.weeks.evnglElemID[0] != this.weeks.apstlElemID[0]) {

            document.getElementById("weekday" + this.weeks.evnglElemID[0] + this.weeks.day[0])!.className += " evngl-day"
            document.getElementById("week" + this.weeks.evnglElemID[0])!.className += " color-block-evngl-stupka"
            document.getElementById("weekday" + this.weeks.evnglElemID[0] + this.weeks.day[0])!.style.lineHeight = "3.5rem"

        } else {

            document.getElementById("weekday" + this.weeks.evnglElemID[0] + this.weeks.day[0])!.className += " evngl-day"
            document.getElementById("weekday" + this.weeks.aprID[0])!.className += " seedday-week-on"
            document.getElementById("week" + this.weeks.apstlElemID[0])!.classList.remove("color-block-apstl-stupka");
            document.getElementById("week" + this.weeks.apstlElemID[0])!.className += " color-block"

        }

        if (this.weeks.evnglElemID[0] == 50) {
            document.querySelector("#week50")!.setAttribute("style", "border: solid 4rem #fedede; background-color: #fedede;")
        }

    }

    /**
     *  Возращает гласс по Октоиху для текущей седмицы.
     *
     * @param {*} sedmica
     * @returns string
     */
    glas(sedmica: number): string {
        let x = sedmica
        let n = (x % 8) * 0.1;
        let g = Math.floor(n * 10) - 1;

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
    }

    //====================	start modalView	========================//


    /**
     * Метод реверсиного контроля. Тригер.
     * 
     * 
     * @returns function name
     */
    reversePack() {
        let i = this.stateModalView
        const reverseP = () => {
            i = !i
            this.stateModalView = i
            return i
        }
        return reverseP
    }


    /**
    * Метод закрывает всплавющее окно. 
    * Удаляет стили элемента.
    * Устанавливает данные в `localStorage`
    *
     */
    closeModalView(timerOff?: any) {
        localStorage.ystm = JSON.stringify({
            entries: 1,
            opasity: 0,
            visibility: "hidden",
        });
        document.querySelector("#fp00")?.classList.remove("fp00");
        document.querySelector("#first-preview")?.classList.remove("fp01");
        // Removed items
        document.querySelector("#close")!.outerHTML = '<!-- Will embed element-->';
        document.querySelector("#fp-content")!.outerHTML = '<!-- Will embed element-->';

        const rpack = this.reversePack(); rpack()
        clearTimeout(timerOff);


        // return false
    }

    //====================	end modalView	========================//

    /** Метод первого показа модального окна при первой загрузке. */
    firstViewModal() {
        const aaa = localStorage.ystm
        if (aaa == null) {
            this.initModalView()
        }
        return {}
    }
    /**
     * Метод вызова модального окна по двойному нажатию клавиш `F1` или `F2`.
     * 
     */
    eventKeys() {
        let oneClickInfo = ""
        document.addEventListener("keyup",
            (event) => { // безымянку не можно заглушить методом `removeAddEventListener`
                if (event.key == "F2") {
                    oneClickInfo += event.code + "";
                    setTimeout(() => {
                        oneClickInfo = "";
                    }, 700);
                }

                if (oneClickInfo == "F2F2" && this.stateModalView == false) {
                    this.initModalView();
                }

                else if (oneClickInfo == "F2F2" && this.stateModalView == true) {
                    oneClickInfo = ""
                    this.closeModalView();
                }

                if (event.code == "Escape") {
                    oneClickInfo += event.code + ""
                    // _this.closeModalView();
                }
                if (oneClickInfo == "EscapeEscape") {
                    sessionStorage.removeItem('userDate');
                    oneClickInfo = "";
                    document.location.replace("")
                }
            })
    }

    /**
     * Для разработки. 
     * Удаляет пользовательскую дату из хранилища.Обновляет страницу.
     * 
     */
    deleteUserDateFromSessionStorage() {
        sessionStorage.removeItem('userDate')
        document.location.replace(document.location.origin)
    }

    /**
     * Метод обновляет страницу в **00:00** часов.
     *
     */
    reloadAprakosPage() {
        let cd = new Date()
        let nextDay = new Date(cd.getFullYear(), cd.getMonth(), cd.getDate() + 1)
        // let interval = nextDay.getTime()-cd.getTime()
        let interval = nextDay.getTime() - cd.getTime()
        setTimeout(function () {
            // alert("\n Долгое отсутствие увеличивает расстояние разлуки.")
            document.location.reload()
        }, interval);
    }


}




/**
 *  Экземпляр класса `apr` можно инициализирровать параметрами в формате `[YYYY, m, d]`.
 * Примеры
 * ```js
 * const apr = new OLY() // текущая дата
 * const apr2020 = new OLY([2020])		// год 2020
 * const apr2027 = new OLY([2027,8])	// сентябрь 2027 года
 * const apr2033 = new OLY([2033,0,7])	// Рождество Христово 2033 года
 * ```
 */
let apr = new OLY();
