//Reminders
reminders = document.getElementById('reminders')
reminders_move = document.getElementById('reminders_move')
reminders_container = document.getElementById('reminders_container')

// reminders_txt = localStorage.getItem('c_l_reminders')
// if(reminders_txt == null)
//     reminders_txt = ''
// reminders.innerHTML = reminders_txt

reminders_pos = localStorage.getItem('reminders_pos')
if(reminders_pos == null)
    reminders_pos = [20, 100]
else
    reminders_pos = reminders_pos.split(' ')
reminders_container.style.left = (reminders_pos[0]).toString() + 'px' 
reminders_container.style.top = (reminders_pos[1]).toString() + 'px' 

reminders.addEventListener('keyup', re_set)
reminders_move.addEventListener('mousedown', re_move)
window.addEventListener('mousemove', mouse_position)

function re_set(){
    localStorage.setItem('c_l_reminders', reminders.innerHTML)
}

move_clicked = false
function re_move(){
    move_clicked = !move_clicked;
    if(move_clicked)
        move_int = setInterval(re_constant_move, 10)
    else
        clearInterval(move_int)
}

mouse = [0, 0]
function mouse_position(e){
    mouse = [e.clientX, e.clientY]
}

function re_constant_move(){
    container = [mouse[0] - 380, mouse[1] - 15]
    if(container[0] > 1135)
        container[0] = 1135
    if(container[0] < 0)
        container[0] = 0
    if(container[1] < -125)
        container[1] = -125
    if(container[1] > 533)
        container[1] = 533
    reminders_container.style.left = (container[0]).toString() + 'px' 
    reminders_container.style.top = (container[1]).toString() + 'px'
    localStorage.setItem('reminders_pos', container[0].toString() + ' ' + container[1].toString())
}
