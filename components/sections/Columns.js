import Graphic from "./Graphic";
import { chevron_right } from "@/data/ICONS";







function ColumnGroup({ columns, arrows }) {


  arrows = arrows || false;
  var hasArrows = arrows ? true : false;


  if(arrows == true) arrows= "primary"

  var arrowClasses = `mask__${arrows}`;



    return (
      <>
        {columns.map((column, i) => {
          var { graphic, heading, title, description, quote, other, classes } = columns[i];
  
          var colClasses = `col-${Math.floor(12 / columns.length)}`;
          var otherClasses = "";
          if (classes.colClasses.length != 0) colClasses = classes.colClasses.join(" ");
          if (classes.otherClasses.length != 0) otherClasses = classes.otherClasses.join(" ");
  
          return (
            <Column className={`column ${colClasses} ${otherClasses}`} key={`column ${i}`}>
              {hasArrows && i != 0 && (
                <div className="column--arrow">
                  <Graphic innerClassName={arrowClasses} type="mask" img={chevron_right}></Graphic>
                </div>
              )}
              {title && <>{title}</>}
              {graphic && <>{graphic}</>}
              {heading && <>{heading}</>}
              {description && <>{description}</>}
              {quote && <>{quote}</>}
              {other && <>{other}</>}
            </Column>
          );
        })}
      </>
    );
  }
  
  function Column({ children, className }) {
    return <div className={`section--column ${className ? className : ""}`}>{children}</div>;
  }





  export {Column, ColumnGroup};