
var tran;
if(typeof window != 'undefined') {tran = window.getComputedStyle(window.document.documentElement).getPropertyValue('--transition') || false;
tran = Number(tran.split('s')[0]) * 1000;}


function getTransition(elem) {
    return Number(window.getComputedStyle(elem, null).transitionDuration.split('s')[0]) * 1000;
}


function simpleToggleOn(elem, str, ov, transitionTime) {

    if(!tran){
        tran = getTransition(elem);
    }

    if (transitionTime != tran) {
        transitionTime = getTransition(elem);
    }
    if (ov) {
        elem.classList.add(str + "tran");
        setTimeout(() => {
            elem.classList.remove(str + 'on');
            elem.classList.add(str + 'off');
            elem.classList.remove(str + 'tran');
        }, 0);
    } else {
        elem.classList.add(str + "tran");
        setTimeout(() => {
            elem.classList.remove(str + 'on');
            elem.classList.add(str + 'off');
            elem.classList.remove(str + 'tran');
        }, transitionTime);
    }
    // if (ov) {
    //     elem.classList.add(str + "__tran");
    //     setTimeout(() => {
    //         elem.classList.remove(str + '__on');
    //         elem.classList.add(str + '__off');
    //         elem.classList.remove(str + '__tran');
    //     }, 0);
    // } else {
    //     elem.classList.add(str + "__tran");
    //     setTimeout(() => {
    //         elem.classList.remove(str + '__on');
    //         elem.classList.add(str + '__off');
    //         elem.classList.remove(str + '__tran');
    //     }, transitionTime);
    // }
}


function simpleToggleOff(elem, str, ov, transitionTime) {
    if (transitionTime != tran) {
        transitionTime = getTransition(elem);
    }
    elem.classList.add(str + "on");
    elem.classList.add(str + "tran");
    elem.classList.remove(str + "off");
    if (ov) {
        setTimeout(() => {
            elem.classList.remove(str + 'off');
            elem.classList.remove(str + 'tran');
        }, 0);
        setTimeout(() => {}, tran);
    } else {
        setTimeout(() => {
            elem.classList.remove(str + 'off');
            elem.classList.remove(str + 'tran');
        }, transitionTime);

    }
    // elem.classList.add(str + "__on");
    // elem.classList.add(str + "__tran");
    // elem.classList.remove(str + "__off");
    // if (ov) {
    //     setTimeout(() => {
    //         elem.classList.remove(str + '__off');
    //         elem.classList.remove(str + '__tran');
    //     }, 0);
    //     setTimeout(() => {}, tran);
    // } else {
    //     setTimeout(() => {
    //         elem.classList.remove(str + '__off');
    //         elem.classList.remove(str + '__tran');
    //     }, transitionTime);

    // }
}




function dualTransitionToggleOn(elem, str, ov, transitionTime) {
    if (transitionTime != tran) {
        transitionTime = getTransition(elem);
    }
    elem.classList.add(str + "tran1");
    if (ov == true) {
        setTimeout(() => {
            elem.classList.remove(str + 'on');
            elem.classList.add(str + 'off');
            elem.classList.remove(str + 'tran1');
        }, 0);
    } else {
        setTimeout(() => {
            elem.classList.remove(str + 'on');
            elem.classList.add(str + 'off');
            elem.classList.remove(str + 'tran1');
        }, transitionTime);

    }
    // elem.classList.add(str + "__tran1");
    // if (ov == true) {
    //     setTimeout(() => {
    //         elem.classList.remove(str + '__on');
    //         elem.classList.add(str + '__off');
    //         elem.classList.remove(str + '__tran1');
    //     }, 0);
    // } else {
    //     setTimeout(() => {
    //         elem.classList.remove(str + '__on');
    //         elem.classList.add(str + '__off');
    //         elem.classList.remove(str + '__tran1');
    //     }, transitionTime);

    // }
}


function dualTransitionToggleOff(elem, str, ov, transitionTime) {
    if (transitionTime != tran) {
        transitionTime = getTransition(elem);
    }
    elem.classList.add(str + "on");
    elem.classList.add(str + "tran2");
    elem.classList.remove(str + "off");
    if (ov == true) {
        setTimeout(() => {
            elem.classList.remove(str + 'off');
            elem.classList.remove(str + 'tran2');
        }, 0);
    } else {
        setTimeout(() => {
            elem.classList.remove(str + 'off');
            elem.classList.remove(str + 'tran2');
        }, transitionTime);
    }
    // elem.classList.add(str + "__on");
    // elem.classList.add(str + "__tran2");
    // elem.classList.remove(str + "__off");
    // if (ov == true) {
    //     setTimeout(() => {
    //         elem.classList.remove(str + '__off');
    //         elem.classList.remove(str + '__tran2');
    //     }, 0);
    // } else {
    //     setTimeout(() => {
    //         elem.classList.remove(str + '__off');
    //         elem.classList.remove(str + '__tran2');
    //     }, transitionTime);
    // }
}





function toggle(elem, classPref, transitionTime, anim, transitions, overlap) {
   
    var selectorPrefix = "__";
    if (classPref == "") selectorPrefix = "";

    classPref = classPref + selectorPrefix;

   
    if (anim == "animated") {
        var overlapStart = false;
        var overlapEnd = false;
        if (overlap == "overlap end") {
            overlapStart = false;
            overlapEnd = true;
        } else if (overlap == "overlap start") {
            overlapStart = true;
            overlapEnd = false;
        } else if (overlap == "overlap both") {
            overlapStart = true;
            overlapEnd = true;
        } else {
            overlapStart = false;
            overlapEnd = false;
        }





        if (transitions != "2 transitions") {
            if (elem.classList.contains(classPref + 'on')) {
                simpleToggleOn(elem, classPref, overlapStart, transitionTime);
            } else {
                simpleToggleOff(elem, classPref, overlapEnd, transitionTime);
            }
        } else {
            if (elem.classList.contains(classPref + 'on')) {
                dualTransitionToggleOn(elem, classPref, overlapStart, transitionTime);
            } else {
                dualTransitionToggleOff(elem, classPref, overlapEnd, transitionTime);
            }
        }
    } else {
        elem.classList.toggle(classPref + "on")
        elem.classList.toggle(classPref + "off")
    }
}





export default toggle;
export {simpleToggleOn, simpleToggleOff, dualTransitionToggleOn, dualTransitionToggleOff, toggle};