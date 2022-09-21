//Sets time
time = document.getElementById('time')
date = document.getElementById('date')

function start(){
    updateTime()
    date.textContent = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear()
    setInterval(update, 1000)
}

function update(){
    updateTime()
}

function updateTime(){
    d = new Date()
    seconds = d.getSeconds().toString()
    minutes = d.getMinutes().toString()
    hours = d.getHours().toString()
    if(hours.length == 1)
        hours = "0" + hours
    if(seconds.length == 1)
        seconds = "0" + seconds
    if(minutes.length == 1)
        minutes = "0" + minutes

    time.innerHTML = hours + ":" + minutes + "<small>" + seconds + "</small>"
}

start()