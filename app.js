/* 
    Copyright © 2019 Gallactica
    https://github.com/gallactica
*/

var last_day = 0
var YEAR = new Date().getFullYear()
var MONTH = new Date().getUTCMonth()
var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

function time() {
    var date = new Date(Date.now())
    var time = document.querySelectorAll('.time span')
    time[0].innerHTML = date.getHours()
    time[1].innerHTML = date.getMinutes()
    time[2].innerHTML = date.getSeconds()
    if (date.getDate() != last_day) {
        Calendar(YEAR, MONTH)
        last_day = new Date().getDate()
    }
}

time()
setInterval(time, 1000)

function getWeekDay(date) {
    date = date || new Date();
    var day = date.getDay();

    return days[day];
}

function Calendar(Year, Month) {
    document.querySelector('.grid').innerHTML = null
    var d = new Date();
    d.setFullYear(Year)
    d.setUTCMonth(Month)
    var first_day = new Date(d.getFullYear(), d.getUTCMonth(), 0);
    var last_date = Math.ceil((new Date(d.getFullYear(), d.getUTCMonth() + 1, 1).getTime() - first_day.getTime() - (1000 * 60 * 60)) / (1000 * 60 * 60 * 24))

    var day = 1
    for (let t = 0; t < 6; t++)
        for (let i = 0; i < 7; i++) {
            if (t * 7 + i < first_day.getDay() || day >= last_date) {
                document.querySelector('.grid').innerHTML += `<span></span>`
                continue;
            }
            document.querySelector('.grid').innerHTML += (day == d.getDate() && Month == new Date().getUTCMonth() && Year == new Date().getFullYear()) ? `<span class="today">${day++}</span>` : `<span>${day++}</span>`
        }
    document.querySelector('.header span').innerHTML = `${months[d.getUTCMonth()]} ${d.getUTCMonth()+1}/${d.getFullYear()}`
}

function nagivation(inc) {
    MONTH += inc
    if (MONTH > 11) {
        MONTH = 0
        YEAR++;
    }
    if (MONTH < 0) {
        MONTH = 11
        YEAR--;
    }
    Calendar(YEAR, MONTH)
}