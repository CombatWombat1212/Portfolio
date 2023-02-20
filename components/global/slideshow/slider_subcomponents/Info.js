import Heading from "@/components/sections/Heading";

function Info({ name, hasMultiple, items }) {
    return (
      <>
        <>
          <Heading type="h5" className="card--subheading">
            {hasMultiple ? `${name}s:` : `${name}:`}
          </Heading>
          {hasMultiple ? (
            <ul className="list">
              {items.map((item, index) => (
                <li className="list--item" key={index}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="list">{items[0]}</p>
          )}
        </>
      </>
    );
  }

  

  export default Info;