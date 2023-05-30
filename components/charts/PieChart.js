import useInView from "@/scripts/hooks/useInView";
import GRAPHS from "@/data/charts/GRAPHS";
import { useEffect, useRef } from "react";

function Circle({ item }) {
  const circleRef = useRef(null);
  const inView = useInView(circleRef, { threshold: { entry: 0.8, exit: 0.0 } });

  return (
    <div className="circle--wrapper" ref={circleRef}>
      <div className="circle--inner">
        <div className={`circle--label ${item.highlighted ? "circle--label__highlighted" : "circle--label__default"}`}>
          <span>{item.value + "%"}</span>
        </div>
        <svg
          className={`circle--svg`}
          style={{
            "--circle-value": inView ? item.value : 0,
          }}>
          <circle className="circle circle--empty" />
          <circle
            className={`circle circle--filled ${item.highlighted ? "circle--filled__highlighted" : "circle--filled__default"} circle__${
              inView ? "in-view" : "out-of-view"
            }`}
          />
        </svg>
      </div>

      <div className={`circle--name ${item.highlighted ? "circle--name__highlighted" : "circle--name__default"}`}>
        <span>{item.name}</span>
      </div>
    </div>
  );
}

function PieChart({ study, graph }) {
  study = GRAPHS.find((item) => item.study == study);
  graph = study.graphs.find((item) => item.name == graph);

  return (
    <div className="pie--wrapper graph--wrapper graph--wrapper__small">
      <div className="pie">
        {graph.data.map((item) => {
          return (
            //<div className="circle--wrapper" >
            <Circle key={item.key} item={item}></Circle>
            //</div>
          );
        })}
      </div>
    </div>
  );
}

Circle.displayName = "Circle";
PieChart.displayName = "PieChart";

export default PieChart;
