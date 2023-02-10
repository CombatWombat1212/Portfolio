


function removeEmptyClasses(className){

    if(className == "" || className == " ") return "";

    className = className.split(" ");
    className = className.filter((className) => {
        if (className == "" || className == " ") return false;
        else return true;
    });

    return className.join(" ");
    
}




function removeClassesOfPrefix(className, prefix) {
    if (className == "" || className == " ") return "";
    className = className.split(" ");
    className = className.filter((className) => {
        if (className.indexOf(prefix) != -1) return false;
        else return true;
    });
    return className.join(" ");
}


function getClassesOfPrefix(className, prefix) {
    if (className == "" || className == " ") return "";
    className = className.split(" ");
    className = className.filter((className) => {
        if (className.indexOf(prefix) != -1) return true;
        else return false;
    });
    return className.join(" ");
}





export {removeEmptyClasses, removeClassesOfPrefix, getClassesOfPrefix}