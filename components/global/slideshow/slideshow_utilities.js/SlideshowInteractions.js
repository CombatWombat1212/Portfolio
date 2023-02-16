function getButtonType(elem) {
  var btn = elem;
  while (btn.classList.contains("button") === false) {
    btn = btn.parentNode;
  }
  var type = btn.innerText.toLowerCase();
  return type;
}

function buttonHandler(e, group, cardIndex, setCardIndex) {
  var type = getButtonType(e.target);

  if (type == "left") {
    if (cardIndex == 0) {
      setCardIndex(group.imgs.length - 1);
    } else {
      setCardIndex(cardIndex - 1);
    }
  }
  if (type == "right") {
    if (cardIndex == group.imgs.length - 1) {
      setCardIndex(0);
    } else {
      setCardIndex(cardIndex + 1);
    }
  }

//   setCardImage(group.imgs[cardIndex]);
}

export { buttonHandler };
