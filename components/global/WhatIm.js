import Heading from "../sections/Heading";

function WhatIm({data}) {
    return (
        <div className="whatim">
        {data.map(({ category, items }, index) => (
          <div className="whatim--group" key={category}>
            <Heading type="h3" className="whatim--heading">
              {category}
            </Heading>
            <ul className="whatim--list">
              {items.map((item) => (
                <li key={item.name || item} className="whatim--li">
                  {typeof item === "string" ? (
                    <span className="whatim--item" >{item}</span>
                  ) : (
                    <a className="whatim--item whatim--link" href={item.link} target="_blank" rel="noopener noreferrer">
                      <span>{item.name}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
);
}

export default WhatIm;