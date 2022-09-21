//Uses string in google.js and applies it to attempt to help search faster by hitting tab

pred_div = document.getElementById("google_prediction")

temp_history = goog_history
for(i = 0; i < 100; i++){
    temp_history = temp_history.replace(".,zcx", " ")
    temp_history = temp_history.replace("  ", " ")
}
temp_list = temp_history.split(" ")

hp_list = [];
temp_list.forEach((c) => {
    if (!hp_list.includes(c)) {
        hp_list.push(c);
    }
});

for(i = hp_list.length-1; i >= 0; i--){
    if(hp_list[i].length < 4){
        hp_list.splice(i, 1)
    }
}

google.addEventListener("keyup", prediction)
google.addEventListener("keydown", isTab)

function isTab(e){
    if(e.keyCode !== 9)
        return
    current_text = google.value.split(" ")
    e.preventDefault()
    if(current_text[current_text.length-1].length < 3)
        return
    google.value = pred_div.value
    pred_div.value = ""
}

function prediction(e){
    if(google.value.length < 3){
        pred_div.value = ""
        return
    }

    current_text = google.value.split(" ")
    if(current_text[current_text.length-1].length < 3){
        pred_div.value = ""
        return
    }
        
    for(x = 0; x < hp_list.length; x++){
        test = hp_list[x].startsWith(current_text[current_text.length-1])
        if(test===true){
            pred_div.value = ""
            for(y = 0; y < current_text.length-1; y++){
                pred_div.value += current_text[y]+" "
            }
            // pred_div.value = "<div style = 'color:white; display: inline-block;'>"+pred_div.textContent+"</div>"
            // if(current_text.length>1)
            //     pred_div.value += " "
            pred_div.value += hp_list[x]
            return
        }
        pred_div.value = ""
    }

}
