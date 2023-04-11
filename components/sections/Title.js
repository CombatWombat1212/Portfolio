


function Title({ children, className, innerClassName, caps=true, italic=false }) {
    var title = children;


    if (caps){
      title = title.toUpperCase();
    }


    className = className ? className : "";
    innerClassName = innerClassName ? innerClassName : "";

    if (italic){
      innerClassName += " text--italic";
    }
  
    return (
      <div className={`section--title ${className}`}>
        <h4 className={`${innerClassName}`}>{title}</h4>
      </div>
    );
  }
  

  export default Title;