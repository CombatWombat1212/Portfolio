


function getButtonType(elem){
    var btn = elem;
    while (btn.classList.contains("button") === false) {
      btn = btn.parentNode;
    }
    var type = btn.innerText.toLowerCase();  
    return type;
}


function buttonHandler(e, group, index, cardImage, setCardImage) {
  var type = getButtonType(e.target);


    if (type == "left") {
        if (index == 0) {
            index = group.imgs.length - 1;
        } else {
            index--;
        }
        }
    if (type == "right") {
        if (index == group.imgs.length - 1) {
            index = 0;
        } else {
            index++;
        }
    }

    setCardImage(group.imgs[index]);


}

export { buttonHandler };
