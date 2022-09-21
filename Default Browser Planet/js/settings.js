//Adjust multiple variables
star_speed = document.getElementById('star_speed_input')
settings = document.getElementById('settings_icon')
settings_container = document.getElementById('open_settings_container')

settings.onclick = function(){
    if(settings_container.style.opacity == '0'){
        settings_container.style.opacity = '100%'
        settings_container.style.zIndex = '1'
    }
    else{
        settings_container.style.opacity = '0'
        settings_container.style.zIndex = '-5'
    }
    console.log(settings_container.style.zIndex)
}

star_speed.addEventListener('change', change_speed)

function change_speed(){
    speed_modifier = star_speed.value/50
}