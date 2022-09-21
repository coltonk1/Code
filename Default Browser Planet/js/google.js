//Gets search history

google = document.getElementById("google")
google_history = document.getElementById("google_history")
goog_history = ""
history_e = document.getElementById("history_element")
inner_e = document.getElementById("history_element_inner")
deleted = false

if(localStorage.getItem("goog_history")!=null){
    goog_history = localStorage.getItem("goog_history")
    if(goog_history == null)
        goog_history = ''
    history_ = goog_history.split(".,zcx")
    history_.reverse()
    history_.shift()
    history_.length = 11;
    // console.log(history_)
    // console.log(goog_history)
    history_.forEach(txt => generateHistory(txt))
}

function generateHistory(txt){
    e = history_e.cloneNode(true)
    e.style.display = "flex"
    e.textContent = txt
    e.onmousedown = function(){search(txt)}
    e_i = inner_e.cloneNode(true)
    e_i.onmousedown = function(){delete_(this.parentNode)}
    e_image = document.createElement("img")
    e_image.src = 'assets/history.png'
    e.append(e_i)
    e.append(e_image)
    google_history.append(e)
}

google.focus()
google.addEventListener('keydown', checkKey);

function delete_(e){
    deleted = true
    e.remove()
    setTimeout(function(){
        google.focus()
    }, 1)
    setTimeout(function(){
        deleted = false
    }, 100)
    
}

function checkKey(e){
    if(e.code === "Enter" && google.value.length > 0){
        localStorage.setItem("goog_history", goog_history+google.value+".,zcx")
        search(google.value)
    }
}

function search(txt){
    setTimeout(function(){
        if(deleted)
            return
        else
            window.location = "https://google.com/search?q="+txt
    }, 1)
}