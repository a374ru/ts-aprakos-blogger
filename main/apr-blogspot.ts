
// четверг, 25 января 2024 г. 06:55:02 (MSK)
/*
	--- APRAKOS.BLOGSPOT.COM VERSION ---

	СКРИПТ ВЫЧИСЛЕНИЯ ДАТЫ ПАСХИ ТЕКУЩЕГО ГОДА И РАЗНИЦЫ МЕЖДУ ДАТАМИ ПРАЗДНЕСТВ.
	Разница – это количество седмиц, прошедших от Пасхи до текущего момента.
	Подробное описание смотри в ./doc.

*/

// var url = "https://" + location.host + "/currentday/APRAKOS/";

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

	// theMomentTime = new Date("2016") // min
	// theMomentTime = new Date("2033") // max
	/**
	 * Текущий момент времени.
	 */
	theMomentTime: Date;

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
	 * ### Абревиатура ПБГ(OLY) – Православный Богослужебный Год.
	 * ### Абревиатура ГНГ(GNY) - Григорианский Новый Год.
	 * ### Абревиатура OLY - The Orthodox Liturgical Year.
	 *
	 * Вычисление диапазона, проверка и корректировка дат Пасх для текущего ПБГ.
	 *
	 * >ГНГ разделяет ПБГ на две части — `oly_1, oly_2`.
	 *
	 * 1. Метод вычисляет момент и в зависимости от полугодия и введеного пользователем года.
	 * 2. Устанавливает даты прошедшей и ожидаемой Пасх для корректного расчета седмиц.
	 * Диапазон между двумя датами Пасх есть пасхальный размер.
	 */
	initOLY(): void;
}

class OLY implements IOLY {

	theMomentTime = new Date();
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
		this.anchorElemID = "" + this.weeks.elemID[0]
		this.linkToHolydays = this.holydays_9() ?? this.linkToAprakos
		this.info()
		this.initElementsDOM()
		this.firstViewModal()
		this.eventKeys()

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
	 * [0] - число седмицы
	 * [1] - description
	 * [2] - отокрректированное значение [0]
	 *
	 */
	weeks: { [key: string]: [number, string?, any?] } = {};

	// TODO #12 a374ru  Расширить Пасхалию до 1900 года 

	easterDates: { [key: string]: [number, number] } = {
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

	//TODO #5 @a374ru - Проверить формат вызова функций в ДОМ - apr.func(). Вызываетчерез экземпляр…
	// done!

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
		const yearNumber = this.theMomentTime.getFullYear();
		if (
			this.theMomentTime >=
			new Date(
				this.theMomentTime.getFullYear(),
				this.easterDates[yearNumber][0],
				this.easterDates[yearNumber][1]
			)
		) {
			// Если Пасха была то она и будет oldEaster (это 1 часть ПБГ)
			this.oldEaster = new Date(
				this.theMomentTime.getFullYear(),
				this.easterDates[yearNumber][0],
				this.easterDates[yearNumber][1]
			);
			this.newEaster = new Date(
				this.theMomentTime.getFullYear() + 1,
				this.easterDates[yearNumber + 1][0],
				this.easterDates[yearNumber + 1][1]
			);
		} else {
			// Если Пасхи еще не было в текущем году (это 2 часть ПБГ)
			this.oldEaster = new Date(
				this.theMomentTime.getFullYear() - 1,
				this.easterDates[yearNumber - 1][0],
				this.easterDates[yearNumber - 1][1]
			);

			this.newEaster = new Date(
				this.theMomentTime.getFullYear(),
				this.easterDates[yearNumber][0],
				this.easterDates[yearNumber][1]
			);
		}
		console.log(
			"\n" +
			"Прошедшая Пасха: " +
			this.oldEaster.toString().slice(0, 15) +
			"\n" +
			"Ожидаемая Пасха: " +
			this.newEaster.toString().slice(0, 16)
		);

		this.oldEasterMLS = this.oldEaster.getTime();
		this.newEasterMLS = this.newEaster.getTime();

		return true;
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

		// FIXME: @a374ru решена проблема с подсчетом текущей седмицы для метода `ceil`!!!
		// смотри в проблемах – `a812023`

		// Добавление миллисекунды к пользовательскому вводу для избежания целочисленного значения.
		let addMLS = sessionStorage.getItem('userDate') ? 0.001 : 0
		const current = (this.weeks["current"] = [
			Math.ceil(
				(this.theMomentTime.getTime() + addMLS - this.oldEasterMLS) / 864e5 / 7
			),

			"Текущая седмица",
		]);

		// Переопределения значения дня Пасхи с нуля на единицу, так как нулевой седмицы не бывает.
		///////////////////////////////////
		if (current[0] == 0) { this.weeks["current"][0] = 1 }
		//////////////////////////////////

		const mif = (this.weeks["mif"] = [all[0] - 10, "Седмица МиФ"]);
		const zakhey = (this.weeks["zakhey"] = [mif[0] - 1, "Седмица Закхея"]);
		const stupkaK = (this.weeks["stupkaK"] = [
			all[0] - 51,
			"Крещенская отступка",
			//S:S корректировка времени для вычисления крещенской ступки
			() => {
				if (current[0] > 40) {
					return stupkaK[0]
				} else {
					return 0
				}

			}
		]);
    
		const vozdvizgenie = (this.weeks["vozdvizgenie"] = [
			Math.ceil(
				(this.datesOLY.vozdvizgenieKresta[0].getTime() - this.oldEasterMLS) /
				864e5 /
				7
			),
			"Седмица Воздвижения",
		]);
		const stupkaV = (this.weeks["stupkaV"] = [
			Math.ceil(
				(this.datesOLY.week24[0].getTime() - this.oldEasterMLS) / 864e5 / 7
			) - vozdvizgenie[0],
			"Воздвиженская преступка",
		]);

		return this.weeks; // вернуть словарь седмиц
	}

	/**
	 * Метод вычисляет первый понедельник по Воздвижении Креста. 
	 * Начало чтения зачал от Луки, зачало 10-е.
	 *
	 * >Метод обновляет дату Воздвижения Креста в коллекции `datesOLY` на дату Понедельника по Воздвижении.
	 *
	 * Возвращает результат проверки данного дня. Наступил это день, или еще нет для ПБГ.
	 *
	 * @returns {boolean}
	 */
	mondayAfterVozdvizgenie(): boolean {
		// Дата Воздвижения Креста

		const mondayPoVozdvizgene =
			1 + 7 - (this.datesOLY.vozdvizgenieKresta[0].getDay() % 7);
		let updateTheDate =
			this.datesOLY.vozdvizgenieKresta[0].getDate() + mondayPoVozdvizgene;
		// Изменение даты Воздвижение на дату понедельника
		this.datesOLY.vozdvizgenieKresta[0].setDate(updateTheDate);
		this.datesOLY.vozdvizgenieKresta[1] = "Понедельник по Воздвижении";

		return this.theMomentTime >= this.datesOLY.vozdvizgenieKresta[0];
	}

	/**
	 * Инициализирует список дат `datesOLY` для заявленного года.
	 * @returns {object}
	 */
	initDatesOLY(): {} {
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

		// Дата 17 седмицы по Пятьдес[ятнице.
		// После Пасхи это 24 седмица и число 168 указывает на количество дней в 24 седмицах.
		this.datesOLY["week24"] = [
			new Date(this.oldEasterMLS + 864e5 * 168),
			"17 седмица по Пятьдесятнице",
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
		// Action - нужен лучший алгоритм проверки года в колекции easterDates{}
		let sStorageDate = sessionStorage.getItem('userDate')
		if (sessionStorage.userDate != null && userYear == undefined) {

			currentDate = new Date(String(sStorageDate))

		}
		else if (userYear != undefined && userYear[0] < 2100 && userYear[0] > 2016) {
			// currentDate = new Date(userYear, Number(currentDate.getMonth()), Number(currentDate.getDate()))
			currentDate = new Date(
				userYear[0],
				userYear[1] ?? currentDate.getMonth(),
				Number(userYear[2] ?? currentDate.getDate())
			);
			// Добавка секунды к пользовательскому вводу даты
			sessionStorage.setItem('userDate', String(currentDate))


		} else {
			console.warn(
				`${userYear
					? "Формат введенный пользователем не подходит… попробуйте ([2099,00,7])"
					: "Год пользователем не предоставлен…"
				}.\nБудет использован текущий год.\nСПАСИБО ЗА ВНИМАНИЕ!`
			);

		}

		///////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////// FOR DEV… ////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////

		if (currentDate.getDate() != this.theMomentTime.getDate()) {
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
				console.log(element[1] + " | " + element[0].toDateString());
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
		let otstupka = this.stupka();
		const elemID = this.weeks.current[0] - otstupka
		let aprID = Number(
			"" + elemID + this.weeks.day[0]
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
		this.weeks["elemID"] = [elemID, "Элемент-ID"]
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
				stupka = this.stupkaV(); // передаем сюда текущую седмицу
				break;

			default:
				stupka = 0;
				break;
		}

		return stupka;
	}

	/**
	 * Метод возвращает шаг ступки для одной из двух (2 и 3) из трех возможных зон седмиц.
	 *
	 * @returns number
	 */
	stupkaN(): number {
		let stpka = 0;
		if (this.weeks.current[0] >= this.weeks.mif[0]) {
		
      // возвращаем число отступки для промежуточных седмиц
			return stpka;
		}

    if (this.weeks.current[0] < 40) {
			stpka = this.weeks.stupkaV[0];
		}

    if (this.weeks.current[0] >= 40 && (this.weeks.current[0] < this.weeks.mif[0])){
			stpka = this.weeks.stupkaK[0];
    }
		// FIXME -  нужны тесты во времени для проверки ступки до МиФ
		return stpka;
	}

	/**
	 * Метод для реализации редкого варианта ОТступки на ВОЗДВИЖЕНИЕ для далеких времен.
	 * Смотреть литературу по толкованию пяти дней для Воздвиженской ОТступки.
	 *
	 * @param week
	 * @returns
	 */
	stupkaV(week?: number) {
		return 0;
	}

	/**
	 * Метод для внесения будущих непредвиденных вычислительных обстоятельств и тестов.
	 *
	 * @returns number
	 */
	stupkaK(): number {
    // TODO @a374ru S:S Требуется добавить вычисление отступки для вычисления промежуточных седмиц!!! 
    // смотри в проблемах a4012024 
		return 0;
	}

	/**
	 * ### Метод проверяет текущий день на Двунадясятый праздник
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
        <b>Читаемая седмица:</b>
        <div id="modal-cweek">по Пасхе&nbsp; <span class="red bold">${this.weeks.current[0] - this.stupka()},</span></div>
        <div id="modal-cweek50">по Пять&shy;десят&shy;нице <span class="red bold">${this.weeks.current[0] > 7 ? this.weeks.current[0] - 7 - this.stupka() : "нет"}.</span>
        <div>${lastSegment === "stvol.html" ? commentStvol : ""}</div></div>
        <div>${lastSegment === "blog-post.html" ? `Отступка <span class="red bold">${this.weeks.stupkaK[0]}</span> седм.` : ""}</div></div>
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

	/**
	 * ### Метод инициализации элементов `DOM`
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
			glass: "Глаc: " + this.glas(+this.weeks.current[0]),
		};

		for (const eid in elemsID) {
			if (Object.prototype.hasOwnProperty.call(elemsID, eid)) {
				// const element = mmm[element];

				if (eid === "curweek" || eid === "curweek50") {
					document.getElementById(eid)!.innerHTML = `<a href="#week${this.anchorElemID}">${elemsID[eid]}</a>`

					// throw new ReferenceError(eid)
				}

				else {
					document.getElementById(eid)!.innerHTML = elemsID[eid]
				}

				if (eid == "glass") {
					document.querySelector('#glass')!.innerHTML = elemsID[eid]
				}

			}
		}

		// Удаление элемента со страницы если Пятьдесятницы еще не было.
		if (Number(elemsID.curweek) < 8) {
			document.getElementById("id50")?.remove()
			// document.getElementById("id50")!.className += " hidden";
		}
		// выделение цветом блока текущей седмицы и  дня в ней
		document.getElementById("week" + this.weeks.elemID[0])!.className += " colorBlock"
		document.getElementById("weekday" + this.weeks.aprID[0])!.className += " seeddayON"
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
}


/**
 * ### Экземпляр класса `apr` можно инициализирровать параметрами в формате `[YYYY, m, d]`.
 * Примеры
 * ```js
 * const apr = new OLY() // текущая дата
 * const apr2020 = new OLY([2020])		// год 2020
 * const apr2027 = new OLY([2027,8])	// сентябрь 2027 года
 * const apr2033 = new OLY([2033,0,7])	// Рождество Христово 2033 года
 * ```
 */
let apr = new OLY();

/**  
* [[include:namelist.md]]
*/
// let NAMELIST: {}

/**  
* [[include:problems.md]]
*/
// let PROBLEMS: {}

