


function Title({ children, className, innerClassName, caps=true, italic=false, id }) {
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
      <div className={`section--title ${className}`}
      {...(id ? { id: id } : {})}
      >
        <h4 className={`${innerClassName}`}>{title}</h4>
      </div>
    );
  }
  

  export default Title;