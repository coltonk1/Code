//Creates background stars
function createStar(){
    star = document.createElement('img')
    star.setAttribute('src', 'star.png')
    star.className = 'star'
    star.pos = [-200+Math.random()*window.innerWidth, -200]
    star.speed = Math.random()*3+1
    star.style.opacity = 1-1/star.speed-.1
    star.style.width = (star.speed*star.speed*5+20) + "px"
    document.getElementById('stars').appendChild(star)

    if(document.getElementsByClassName('star').length > 15)
        clearInterval(star_interval)
}

rocket = document.getElementById('rocket')
rocket.time = 0

star_interval = setInterval(createStar, 100)

scale = 2.5/2

function update(){
    //Moves rocket
    rocket.time += .01
    rocket.style.left = Math.sin(rocket.time*Math.PI)*10*Math.sin(rocket.time*Math.PI/2)+Math.sin(rocket.time*5*Math.PI)+50 + "px"
    rocket.style.top = -Math.cos(rocket.time*Math.PI)*6*Math.cos(rocket.time*Math.PI/3)+Math.cos(rocket.time*5*Math.PI)+50 + "px"

    //Moves stars
    stars = document.getElementsByClassName('star')
    for(i = 0; i < stars.length; i++){
        stars[i].pos[0] += 1 * scale * stars[i].speed
        stars[i].pos[1] += 1.07 * scale * stars[i].speed
        stars[i].style.left = stars[i].pos[0].toString() + 'px'
        stars[i].style.top = stars[i].pos[1].toString() + 'px'
        //Sets stars position back when they leave window
        if(stars[i].pos[0] > window.innerWidth)
            stars[i].pos[0] = -100
        if(stars[i].pos[1] > window.innerHeight)
            stars[i].pos[1] = -100
    }
}

setInterval(update, 7)

//Search on google
search = document.getElementById('search')
search.addEventListener('keyup', search_)

function search_(e){
    if(e.key == "Enter"){
        url = ""
        string = ""
        if(search.value.includes(".com")){
            try {
                temp_string = search.value
                if(!temp_string.includes("https"))
                    temp_string = "https://" + temp_string
                url = new URL(temp_string);
                string = temp_string
            } catch (_) {
                string = "https://google.com/search?q=" + search.value
            }
        }
        else 
            string = "https://google.com/search?q=" + search.value
        window.location.href = string 
    }
}

//focuses when opens
search.focus()