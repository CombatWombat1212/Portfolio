


function Title({ children, className }) {
    var title = children;
    title = title.toUpperCase();
    className = className ? className : "";
  
    return (
      <div className={`section--title ${className}`}>
        <h4>{title}</h4>
      </div>
    );
  }
  

  export default Title;