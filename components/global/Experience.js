import Heading from "../sections/Heading";
import { Description, Graphic } from "../sections/Sections";

function Experience({data}) {
  return (
    <div className="experience">
      <Heading className="color--secondary experience--heading">
        And the
        <br />
        'Education & Experience' in 'Education & Experience'
      </Heading>

      <div className="experience--group">
        {data.map(({ title, timeframe, position, description, card, img }) => {
          const classes = {
            wrapper: [],
            card: [],
            graphic: [],
            inner: [],
          };

          Object.keys(classes).forEach((key) => {
            classes[key].push(`experience--${key}__${card}`);
          });

          Object.keys(classes).forEach((key) => {
            classes[key] = classes[key].join(" ");
          });

          return (
            <div className={`experience--wrapper ${classes.wrapper}`} key={title}>
              <div className="experience--subheading">
                <Heading type="h4" innerClassName="color--primary">
                  {timeframe}
                </Heading>
              </div>

              <div className={`experience--card ${classes.card}`}>
                <Graphic color="primary" img={img} className={`experience--graphic ${classes.graphic}`} />
                <div className={`experience--inner ${classes.inner}`}>
                  <Heading type="h4" innerClassName="color--primary">
                    {position}
                  </Heading>
                  <Heading type="h3" className="weight-med experience--title">
                    {title}
                  </Heading>
                  <Description className="experience--description">
                    <p>{description}</p>
                  </Description>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Experience;
