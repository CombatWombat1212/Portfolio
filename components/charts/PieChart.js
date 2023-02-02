import GRAPHS from "/data/charts/GRAPHS";

function Circle({ item }) {
  return (
    <div className="circle--wrapper">
      <div className="circle--inner">
        <div className={`circle--label ${item.highlighted ? "circle--label__highlighted" : "circle--label__default"}`}>
          <span>{item.value + "%"}</span>
        </div>
        <svg
          className="circle--svg"
          style={{
            "--circle-value": item.value,
          }}>
          <circle className="circle circle--empty" />
          <circle className={`circle circle--filled ${item.highlighted ? "circle--filled__highlighted" : "circle--filled__default"}`} />
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

  console.log(graph);

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

export default PieChart;
