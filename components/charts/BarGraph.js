import GRAPHS from "/data/charts/GRAPHS";
import { defaultProps, PropTypes } from "prop-types";

function BarGraph({ study, graph, type, small }) {
  study = GRAPHS.find((item) => item.study == study);
  graph = study.graphs.find((item) => item.name == graph);

  var labels = graph.label;

  var isSmall = small || false;

  // TODO: Animate when scrolled to

  return (
    <>
      {type == "default" && (
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
                    return (
                      <div
                        key={item.key}
                        className={`bar-graph--bar ${item.highlighted ? "bar-graph--bar__highlighted" : "bar-graph--bar__default"}`}
                        style={{
                          "--bar-graph-bar-value": (item.value / graph.clamp[1]) * 100 + "%",
                        }}>
                        <div className={`bar-graph--bar-label ${item.highlighted ? "bar-graph--bar-label__highlighted" : "bar-graph--bar-label__default"}`}>
                          <span>{item.value + "%"}</span>
                        </div>

                        <div className={`bar-graph--bar-name ${item.highlighted ? "bar-graph--bar-name__highlighted" : "bar-graph--bar-name__default"}`}>
                          <span>{item.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {type == "seperated" && (
        <div className={`sep-graph--wrapper graph--wrapper ${isSmall ? "graph--wrapper__small" : ""}`}>
          <div className="sep-graph">
            <div className="sep-graph--column">
              {graph.data.map((item) => {
                return (
                  <div key={`value - ${item.key}`} className={`sep-graph--text sep-graph--value ${item.highlighted ? "highlighted" : "default"} sep-graph--item`}>
                    <span>{item.value + "%"}</span>
                  </div>
                );
              })}
            </div>

            <div className="sep-graph--column">
              {graph.data.map((item) => {
                return (
                  <div key={`bar - ${item.key}`} className={`sep-graph--item ${item.highlighted ? "highlighted" : "default"}`}>
                    <div
                      className="bar--group"
                      style={{
                        "--sep-graph-value": item.value,
                      }}>
                      <div className="bar--wrapper">
                        <div className="bar bar__empty"></div>
                      </div>

                      <div className="bar--wrapper">
                        <div className={`bar bar__filled ${item.highlighted ? "highlighted" : "default"}`}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="sep-graph--column">
              {graph.data.map((item) => {
                return (
                  <div key={`name - ${item.key}`} className={`sep-graph--item ${item.highlighted ? "highlighted" : "default"} sep-graph--text sep-graph--name`}>
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

BarGraph.defaultProps = {
  type: "default",
};

BarGraph.propTypes = {
  type: PropTypes.oneOf(["default", "seperated"]),
};

export default BarGraph;
