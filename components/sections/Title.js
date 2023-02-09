


function Title({ children }) {
    var title = children;
    title = title.toUpperCase();
  
    return (
      <div className="section--title">
        <h4>{title}</h4>
      </div>
    );
  }
  

  export default Title;