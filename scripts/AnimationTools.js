
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
        elem.classList.add(str + "__tran");
        setTimeout(() => {
            elem.classList.remove(str + '__on');
            elem.classList.add(str + '__off');
            elem.classList.remove(str + '__tran');
        }, 0);
    } else {
        elem.classList.add(str + "__tran");
        setTimeout(() => {
            elem.classList.remove(str + '__on');
            elem.classList.add(str + '__off');
            elem.classList.remove(str + '__tran');
        }, transitionTime);
    }
}


function simpleToggleOff(elem, str, ov, transitionTime) {
    if (transitionTime != tran) {
        transitionTime = getTransition(elem);
    }
    elem.classList.add(str + "__on");
    elem.classList.add(str + "__tran");
    elem.classList.remove(str + "__off");
    if (ov) {
        setTimeout(() => {
            elem.classList.remove(str + '__off');
            elem.classList.remove(str + '__tran');
        }, 0);
        setTimeout(() => {}, tran);
    } else {
        setTimeout(() => {
            elem.classList.remove(str + '__off');
            elem.classList.remove(str + '__tran');
        }, transitionTime);

    }
}




function dualTransitionToggleOn(elem, str, ov, transitionTime) {
    if (transitionTime != tran) {
        transitionTime = getTransition(elem);
    }
    elem.classList.add(str + "__tran1");
    if (ov == true) {
        setTimeout(() => {
            elem.classList.remove(str + '__on');
            elem.classList.add(str + '__off');
            elem.classList.remove(str + '__tran1');
        }, 0);
    } else {
        setTimeout(() => {
            elem.classList.remove(str + '__on');
            elem.classList.add(str + '__off');
            elem.classList.remove(str + '__tran1');
        }, transitionTime);

    }
}


function dualTransitionToggleOff(elem, str, ov, transitionTime) {
    if (transitionTime != tran) {
        transitionTime = getTransition(elem);
    }
    elem.classList.add(str + "__on");
    elem.classList.add(str + "__tran2");
    elem.classList.remove(str + "__off");
    if (ov == true) {
        setTimeout(() => {
            elem.classList.remove(str + '__off');
            elem.classList.remove(str + '__tran2');
        }, 0);
    } else {
        setTimeout(() => {
            elem.classList.remove(str + '__off');
            elem.classList.remove(str + '__tran2');
        }, transitionTime);
    }
}





function toggle(elem, classPref, transitionTime, anim, transitions, overlap) {
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
            if (elem.classList.contains(classPref + '__on')) {
                simpleToggleOn(elem, classPref, overlapStart, transitionTime);
            } else {
                simpleToggleOff(elem, classPref, overlapEnd, transitionTime);
            }
        } else {
            if (elem.classList.contains(classPref + '__on')) {
                dualTransitionToggleOn(elem, classPref, overlapStart, transitionTime);
            } else {
                dualTransitionToggleOff(elem, classPref, overlapEnd, transitionTime);
            }
        }
    } else {
        elem.classList.toggle(classPref + "__on")
        elem.classList.toggle(classPref + "__off")
    }
}





export default toggle;