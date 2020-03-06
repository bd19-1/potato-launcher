(function() {
    initBackgroundImage()
    initTime()
    initDate()
    
})()

function initBackgroundImage() {
    const IMAGE_COUNT = 3
    const image_paths = []

    for (let i = 1; i <= IMAGE_COUNT; i++) {
        image_paths.push(`../images/background-images/${i}.jpg`)
    }
    
    const background = document.getElementsByClassName('background-image')[0]
    let index = 0
    const INTERVAL = 10000
    
    background.style.backgroundImage = `url(${image_paths[index]})`

    setInterval(() => {
        background.style.backgroundImage = `url(${image_paths[(index += 1) % IMAGE_COUNT]})`
    }, INTERVAL)
}

function initTime() {
    const timeContainer = document.getElementsByClassName('time')[0]
    const secondContainer = document.getElementsByClassName('second')[0]
    const nextSecondContainer = document.getElementsByClassName('next-second')[0]
    const secondSubContainer = document.getElementsByClassName('second-subcontainer')[0]
    const INTERVAL = 1000

    printNewTime(timeContainer, secondContainer, secondSubContainer, nextSecondContainer)

    setInterval(() => {
        printNewTime(timeContainer, secondContainer, secondSubContainer, nextSecondContainer)
    }, INTERVAL);
}

var animating = false

function printNewTime(timeContainer, secondContainer, secondSubContainer, nextSecondContainer) {
    const date = new Date()
    const oldSecond = secondContainer.innerHTML

    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

    timeContainer.innerHTML = `${hour}:${minute}`
    if (second != oldSecond && !animating) {
        animating = true
        animateSeconds(secondSubContainer, secondContainer, second, nextSecondContainer, setNotAnimating)
    }

    function setNotAnimating() {
        animating = false
    }
}

function animateSeconds(secondSubContainer, secondContainer, newSecond, nextSecondContainer, callback) {
    const TIMEOUT = 400
    secondSubContainer.classList.toggle('animate-second')
    nextSecondContainer.innerHTML = newSecond

    setTimeout(() => {
        secondSubContainer.classList.toggle('animate-second')
        callback()
    }, TIMEOUT);

    setTimeout(() => {
        secondContainer.innerHTML = newSecond
    }, TIMEOUT / 2);
}

function initDate() {
    const dateContainer = document.getElementsByClassName('date')[0]
    const extraContainer = document.getElementsByTagName('sup')[0]

    dateContainer.innerHTML = getCurrentDateString();
    extraContainer.innerHTML = getExtra()
}

function getCurrentDateString() {
    const date = new Date()
    const currentDate = date.getDate()
    return `${getCurrentDay(date)}, ${getCurrentMonth(date)} ${currentDate}`
}

function getExtra() {
    const currentDate = new Date().getDate()
    if (currentDate % 10 > 3 || currentDate / 10 == 1)
        return 'th'
    else if (currentDate % 10 == 1)
        return'st'
    else if (currentDate % 10 == 2)
        return 'nd'
    else
        return 'rd'
}

function getCurrentDay(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satuday']
    return days[date.getDay()]
}

function getCurrentMonth(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months[date.getMonth()]
}