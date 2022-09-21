//Notes
notes = document.getElementById('notes')
notes_move = document.getElementById('notes_move')
notes_container = document.getElementById('notes_container')

notes_txt = localStorage.getItem('c_l_notes')
if(notes_txt == null)
    notes_txt = ''
notes.innerHTML = notes_txt

notes_pos = localStorage.getItem('notes_pos')
if(notes_pos == null)
    notes_pos = [20, 100]
else
    notes_pos = notes_pos.split(' ')
notes_container.style.marginRight = (notes_pos[0]).toString() + 'px' 
notes_container.style.marginTop = (notes_pos[1]).toString() + 'px' 

notes.addEventListener('keyup', note_set)
notes_move.addEventListener('mousedown', note_move)
window.addEventListener('mousemove', mouse_position)

function note_set(){
    localStorage.setItem('c_l_notes', notes.innerHTML)
}

move_clicked = false
function note_move(){
    move_clicked = !move_clicked;
    if(move_clicked)
        move_int = setInterval(note_constant_move, 10)
    else
        clearInterval(move_int)
}

mouse = [0, 0]
function mouse_position(e){
    mouse = [e.clientX, e.clientY]
}

function note_constant_move(){
    container = [window.innerWidth - mouse[0] - 20, mouse[1] - 140]
    if(container[0] > 1135)
        container[0] = 1135
    if(container[0] < 0)
        container[0] = 0
    if(container[1] < -125)
        container[1] = -125
    if(container[1] > 533)
        container[1] = 533
    notes_container.style.marginRight = (container[0]).toString() + 'px' 
    notes_container.style.marginTop = (container[1]).toString() + 'px'
    localStorage.setItem('notes_pos', container[0].toString() + ' ' + container[1].toString())
}
