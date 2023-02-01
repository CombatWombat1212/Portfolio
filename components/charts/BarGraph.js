import GRAPHS from "/data/charts/GRAPHS";
import { defaultProps, PropTypes } from "prop-types";

function BarGraph({ study, graph, type }) {
  study = GRAPHS.find((item) => item.study == study);
  graph = study.graphs.find((item) => item.name == graph);

  var labels = graph.label;


  // TODO: Animate when scrolled to

  

  return (
    <>
      <div
        className="bar-graph--wrapper graph--wrapper"
        style={{
          "--bar-graph-range-start": graph.clamp ? graph.clamp[0] : 0,
          "--bar-graph-range-end": graph.clamp ? graph.clamp[1] : 0,
          "--bar-graph-rows": graph.rows,
        }}>
        <div className="bar-graph">
          <div className="bar-graph--y">
            <div className="bar-graph--y-labels bar-graph--grid">
              {labels
                .slice(0)
                .reverse()
                .map((item) => {
                  return (
                    <div key={item.key} className="bar-graph--cell">
                      <span>
                        {item.value}
                        {item.value != "" || item.value === 0 ? "%" : ""}
                      </span>
                    </div>
                  );
                })}
            </div>
            <div className="bar-graph--table ">
              <div className="bar-graph--grid">
                {labels.map((label) => {
                  return (
                    <div className="bar-graph--cell" key={label.key}>
                      <div className="bar-graph--line"></div>
                    </div>
                  );
                })}
              </div>

              <div className="bar-graph--data">
                {graph.data.map((item) => {
                  return <div key={item.key} className={`bar-graph--bar ${item.highlighted ? 'bar-graph--bar__highlighted' : 'bar-graph--bar__default'}`} style={{
                    "--bar-graph-bar-value": item.value / graph.clamp[1] * 100 + "%",
                  }}>

                  <div className={`bar-graph--bar-label ${item.highlighted ? 'bar-graph--bar-label__highlighted' : 'bar-graph--bar-label__default'}`}>
                    <span>{item.value + "%"}</span>
                  </div>

                  <div className={`bar-graph--bar-name ${item.highlighted ? 'bar-graph--bar-name__highlighted' : 'bar-graph--bar-name__default'}`}>
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
