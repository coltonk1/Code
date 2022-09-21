const { ipcRenderer } = require("electron")

ipc = ipcRenderer;

function send_(data, args){
    ipc.send(data, args)
}

document.getElementById('exit').onclick = function(){
    send_('close')
}
document.getElementById('mini').onclick = function(){
    send_('minimize')
}
document.getElementById('maxi').onclick = function(){
    send_('maximize')
}
