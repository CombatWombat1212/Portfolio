import GRAPHS from "/data/charts/GRAPHS";
import { defaultProps, PropTypes } from "prop-types";

function BarGraph({ study, graph, type }) {
  study = GRAPHS.find((item) => item.study == study);
  graph = study.graphs.find((item) => item.name == graph);

  var labels = graph.label;


  // TODO: Animate on scroll

  

  return (
    <>
      <div
        className="graph--wrapper"
        style={{
          "--graph-range-start": graph.clamp ? graph.clamp[0] : 0,
          "--graph-range-end": graph.clamp ? graph.clamp[1] : 0,
          "--graph-rows": graph.rows,
        }}>
        <div className="graph">
          <div className="graph--y">
            <div className="graph--y-labels graph--grid">
              {labels
                .slice(0)
                .reverse()
                .map((item) => {
                  return (
                    <div key={item.key} className="graph--cell">
                      <span>
                        {item.value}
                        {item.value != "" || item.value === 0 ? "%" : ""}
                      </span>
                    </div>
                  );
                })}
            </div>
            <div className="graph--table ">
              <div className="graph--grid">
                {labels.map(() => {
                  return (
                    <div className="graph--cell">
                      <div className="graph--line"></div>
                    </div>
                  );
                })}
              </div>

              <div className="graph--data">
                {graph.data.map((item) => {
                  return <div className={`graph--bar ${item.highlighted ? 'graph--bar__highlighted' : 'graph--bar__default'}`} style={{
                    "--graph-bar-value": item.value / graph.clamp[1] * 100 + "%",
                  }}>

                  <div className={`graph--bar-label ${item.highlighted ? 'graph--bar-label__highlighted' : 'graph--bar-label__default'}`}>
                    <span>{item.value + "%"}</span>
                  </div>

                  <div className={`graph--bar-name ${item.highlighted ? 'graph--bar-name__highlighted' : 'graph--bar-name__default'}`}>
                    <span>{item.name}</span>
                  </div>

                  </div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

BarGraph.defaultProps = {
  type: "default",
};

BarGraph.propTypes = {};

export default BarGraph;
