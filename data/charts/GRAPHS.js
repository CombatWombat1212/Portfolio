import { v4 as uuidv4 } from "uuid";

var GRAPHS = [
  {
    study: "MakeRight",
    graphs: [
      {
        name: "Limiting Factors",
        range: [0, 100],
        clamp: [0, 60],
        increments: 10,
        labelEvery: 20,
        labels: [],
        data: [
          {
            name: {
              xxl: "Cost of Entry",
              sm: "Entry Cost",
            },
            value: 59,
            highlighted: true,
          },
          {
            name: "Knowledge Gap",
            value: 51,
            highlighted: true,
          },
          {
            name: "Operating Cost",
            value: 39,
            highlighted: false,
          },
          {
            name: "Material Types",
            value: 34,
            highlighted: false,
          },
          {
            name: {
              xxl: "Material Availability",
              sm: "Available Materials",
            },
            value: 30,
            highlighted: false,
          },
          {
            name: "Regulations",
            value: 20,
            highlighted: false,
          },
          {
            // name: "Environmental Impact",
            name: "Enviro. Impact",
            value: 17,
            highlighted: false,
          },
        ],
      },

      {
        name: "Printer Uses",
        title: "Hobbyists often surpass these barriers out of passion",
        range: [0, 100],
        clamp: false,
        data: [
          {
            name: "Own for work",
            value: 59,
            highlighted: false,
          },
          {
            name: "Own for hobbies",
            value: 24,
            highlighted: true,
          },
          {
            name: "Own for study",
            value: 17,
            highlighted: false,
          },
        ],
      },
      {
        name: "Printer Usage",
        range: [0, 100],
        clamp: false,
        data: [
          {
            name: "Print Yearly",
            value: 24,
            highlighted: true,
          },
          {
            name: "Print Monthly",
            value: 23,
            highlighted: true,
          },
          {
            name: "Print Weekly",
            value: 16,
            highlighted: false,
          },
          {
            name: "Print Daily",
            value: 31,
            highlighted: false,
          },
          {
            name: "Never Print",
            value: 6,
            highlighted: false,
          },
        ],
      },
    ],
  },
];

function graphInit(arr) {
  arr.forEach((study) => {
    study.graphs.forEach((graph) => {
      graph.data.forEach((item) => {
        item.key = uuidv4();
      });
    });
  });


  arr.forEach((study) => {
    study.graphs.forEach((graph) => {
      if(!graph.clamp) {
        graph.clamp = graph.range;
      }
    });
  });



  arr.forEach((study) => {
    study.graphs.forEach((graph) => {


        graph.label = Array.from(Array(graph.increments).keys()).map((item) => {
          return item = (item + 1) * graph.increments;
        });

        graph.label.unshift(0);


        var labelEvery = graph.labelEvery / graph.increments;
        var counter = labelEvery;
        graph.label = graph.label.map((item) => {
          if(counter == labelEvery) {
            counter = 1;
            return item;
          }
          counter++;
          return "";
        });

        graph.label = graph.label.slice(graph.clamp[0] / graph.increments, graph.clamp[1] / graph.increments + 1);

        
        graph.label = graph.label.map((item) => {
          return {
            value: item,
            key: uuidv4(),
          };
        });

    });
  });




  arr.forEach((study) => {
    study.graphs.forEach((graph) => {
      graph.rows = graph.label.length;
    });
  });







  return arr;
}


export default graphInit(GRAPHS);