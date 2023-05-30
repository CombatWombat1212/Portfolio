import Heading from "../sections/Heading";

function WhatIm({data}) {
    return (
        <div className="whatim">
        {data.map(({ category, items }, index) => (
          <div className="whatim--group" key={category}>
            <Heading type="h3" className="whatim--heading" innerhtml={category} />
            <ul className="whatim--list">
              {items.map((item) => (
                <li key={item.name || item} className="whatim--li">
                  {typeof item === "string" ? (
                    <span className="whatim--item" dangerouslySetInnerHTML={{__html: item}} />
                  ) : (
                    <a className="whatim--item whatim--link" href={item.link} target="_blank" rel="noopener noreferrer">
                      <span dangerouslySetInnerHTML={{__html: item.name}} />
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


WhatIm.displayName = "WhatIm";

export default WhatIm;