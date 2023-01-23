import { defaultProps, PropTypes } from "prop-types";
import Tag from "../elements/Tag";

function BriefPoint({ items, type }) {
  var title, pointClasses, itemClasses;

  var LIST_TYPES = ["roles", "deliverables", "tools"];
  var STRING_TYPES = ["timeline", "description"];
  var isList = LIST_TYPES.includes(type);
  var isTools = type == "tools";

  title = type.toUpperCase();

  if (type == "description") itemClasses = "text--h3";
  pointClasses = " ";
  if (type == "description") pointClasses += "brief--desc";
  if (type == "description") itemClasses = "text--h3";
  if (type != "description") pointClasses += "brief--point";
  //   if (type == "description") pointClasses += "col-6";
  //   if (type != "description") pointClasses += "col-3";


  
  return (
    <>
      <div className={pointClasses}>
        <h4 className="brief--title">{title}</h4>

        {isList ? (
          <>
            {isTools ? (
              <ul className="brief--list brief--tools">
                {items.map((item) => {
                  return (
                    <Tag key={item.key} variant="tool">
                      {item.name}
                    </Tag>
                  );
                })}
              </ul>
            ) : (
              <ul className="brief--list">
                {items.map((item) => {
                  return (
                    <li className={itemClasses} key={item.key}>
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : (
          <>
            <p className={itemClasses}>{items}</p>
          </>
        )}
      </div>
    </>
  );
}

BriefPoint.propTypes = {
  type: PropTypes.oneOf(["description", "roles", "deliverables", "timeline", "tools"]),
};

function BriefList({ brief }) {
  var order = [
    "deliverables", 
    "roles", 
    "timeline", 
    "tools",
];
//   var order = [
//     "deliverables", 
//     "roles", 
//     "timeline", 
//     "tools",
// ];

  return (
    <>
      <div className="brief--group">
        <BriefPoint type={"description"} items={brief["description"]} />
      </div>

      <div className="brief--group brief--group__grid">
        {order.map((item) => {
          return <BriefPoint key={item} type={item} items={brief[item]} />;
        })}
      </div>
    </>
  );
}

function Brief({ brief }) {
  return (
    <div className="brief">
      <div className="container brief--container">
        <BriefList brief={brief} />
      </div>
    </div>
  );
}

export default Brief;
