/*
arrangePopover = () => {
  let transitionPoint = 469;
  return;
  let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight || e.clientHeight || g.clientHeight;
  if (height < transitionPoint) {
    //console.log("Mode: KEYBOARD!");
    //document.getElementById("popover").className = "keyboard";
  } else {
    //document.getElementById("popover").className = "";
    // console.log("Mode: Normal");
  }
};

togglePopover = () => {
  isOpen = !isOpen;
  document.getElementById("popover").style.display = isOpen
	? "block"
	: "none";
  console.log(isOpen);
};
}
*/

updateHeight = () => {
  console.log("Updating");
  //gives current height in pixels! We save it for later comparisons
  let detectedHeight = document.getElementById("heightDetector").clientHeight;
  if (detectedHeight > window.innerHeight) {
    detectedHeight = window.innerHeight;
  }
  if (window.initialHeight > detectedHeight) {
    window.keyboardVisible = true;
  } else {
    window.keyboardVisible = false;
  }
  updateDisplay(detectedHeight);
  return detectedHeight;
};

updateDisplay = detectedHeight => {
  let display = `Initial: ${window.initialHeight} <br> InnerHeight:${
    window.innerHeight
  } <br> Detector: ${
    document.getElementById("heightDetector").clientHeight
  }<br>Keyboard?: ${window.keyboardVisible ? "YES" : "NO"}`;
  document.getElementById("heightDisplay").innerHTML = display;
};

window.addEventListener("resize", () => {
  updateHeight();
  arrangePopover();
});
window.addEventListener("load", () => {
  document.addEventListener("focusout", () => {
    setTimeout(function() {
      document.getElementById("theBody").style.backgroundColor = "white";
      let detectedHeight = updateHeight();
      window.keyboardVisible = false;
      arrangePopover();
      updateDisplay(detectedHeight);
    }, 500);
  });

  document.addEventListener("focusin", () => {
    setTimeout(function() {
      document.getElementById("theBody").style.backgroundColor = "grey";
      let detectedHeight = updateHeight();
      window.heightAtFocus = detectedHeight;
      if (window.initialHeight > detectedHeight) {
        window.keyboardVisible = true;
        console.log("Keyboard!");
        document.getElementById("popover").className = "keyboard";
      } else {
        window.keyboardVisible = false;
        //if the current viewport height is larger than 70% of the original size, it means that the keyboard is down
        console.log("No Keyboard");
        document.getElementById("popover").className = "";
      }
      updateDisplay(detectedHeight);
    }, 500);
  });

  window.initialHeight = updateHeight();
  updateHeight();
});
