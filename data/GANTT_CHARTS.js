import { v4 as uuidv4 } from "uuid";

var GANTT_CHARTS = [
  {
    name: "MakeRight",
    weeks: 28,
    cycles: [
      {
        length: 14,
        phases: [
          {
            name: "Research / Ideation",
            stages: [
              {
                name: "Define",
                tasks: [
                  {
                    name: "Topic Exploration",
                    start: 0,
                    end: 6,
                  },
                  {
                    name: "Define Area of Focus",
                    start: 5,
                    end: 12,
                  },
                  {
                    name: "Identify Assumptions",
                    start: 12,
                    end: 14,
                  },
                ],
              },
              {
                name: "Plan",
                tasks: [
                  {
                    name: "Project Roadmap",
                    start: 14,
                    end: 17,
                  },
                  {
                    name: "Research Plan",
                    start: 16,
                    end: 19,
                  },
                ],
              },
              {
                name: "Discover",
                tasks: [
                  {
                    name: "Secondary Research",
                    start: 19,
                    end: 23,
                  },
                  {
                    name: "Focus Group Research",
                    start: 22,
                    end: 26,
                  },
                ],
              },

              {
                name: "Insight",
                tasks: [
                  {
                    name: "Personas",
                    start: 26,
                    end: 30,
                  },
                  {
                    name: "User Journey Map",
                    start: 30,
                    end: 33,
                  },
                  {
                    name: "Empathy Map",
                    start: 33,
                    end: 35,
                  },
                  {
                    name: "Explore Barriers / Flaws",
                    start: 35,
                    end: 38,
                  },
                  {
                    name: "Frame Opportunities",
                    start: 37,
                    end: 41,
                  },
                ],
              },

              {
                name: "Develop",
                tasks: [
                  {
                    name: "Lo-Fi Prototyping",
                    start: [42, 48],
                    end: [46, 51],
                  },
                  {
                    name: "Plan / Conduct User Tests",
                    start: 45,
                    end: 48,
                  },

                  {
                    name: "Affinity Map",
                    start: 47,
                    end: 48,
                  },
                ],
              },

              {
                name: "Deliver",
                tasks: [
                  {
                    name: "Write / Design Case Study",
                    start: 51,
                    end: 56,
                  },
                ],
              },
            ],
          },

          {
            name: "Refine / Develop",
            stages: [
              {
                name: "Define",
                tasks: [
                  {
                    name: "Define Area of Focus",
                    start: 56,
                    end: 60,
                  },
                  {
                    name: "Identify Assumptions",
                    start: 59,
                    end: 61,
                  },
                ],
              },

              {
                name: "Plan",
                tasks: [
                  {
                    name: "Project Roadmap",
                    start: 60,
                    end: 63,
                  },
                  {
                    name: "Research Plan",
                    start: 62,
                    end: 63,
                  },
                ],
              },

              {
                name: "Discover",
                tasks: [
                  {
                    name: "Explore Barriers / Flaws",
                    start: 63,
                    end: 65,
                  },
                  {
                    name: "Research Review",
                    start: 65,
                    end: 66,
                  },
                  {
                    name: "Secondary Research",
                    start: 66,
                    end: 68,
                  },
                  {
                    name: "User Surveys",
                    start: 67,
                    end: 70,
                  },
                ],
              },

              {
                name: "Insight",
                tasks: [
                  {
                    name: "Affinity Map",
                    start: 69,
                    end: 71,
                  },
                  {
                    name: "Importance / Difficulty Chart",
                    start: 71,
                    end: 73,
                  },
                  {
                    name: "Brainstorming",
                    start: 73,
                    end: 76,
                  },
                  {
                    name: "Refine ideas",
                    start: 75,
                    end: 77,
                  },
                ],
              },

              {
                name: "Develop",
                tasks: [
                  {
                    name: "Lo-Fi Prototyping",
                    start: [77, 83],
                    end: [80, 85],
                  },
                  {
                    name: "Cognitive Walkthroughs",
                    start: 80,
                    end: 82,
                  },
                  {
                    name: "Affinity Map",
                    start: 82,
                    end: 83,
                  },
                ],
              },

              {
                name: "Deliver",
                tasks: [
                  {
                    name: "Write / Design Case Study",
                    start: 85,
                    end: 91,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        length: 14,
        phases: [
          {
            name: "Proposal",
            stages: [
              {
                name: "Define",
                tasks: [
                  {
                    name: "Project Statement / Goals",
                    start: 99,
                    end: 103,
                  },
                  {
                    name: "Risk Assessment",
                    start: 103,
                    end: 105,
                  },
                ],
              },

              {
                name: "Plan",
                tasks: [
                  {
                    name: "Project Roadmap",
                    start: 105,
                    end: 108,
                  },
                ],
              },

              {
                name: "Deliver",
                tasks: [
                  {
                    name: "Write / Design Proposal",
                    start: 107,
                    end: 110,
                  },
                ],
              },
            ],
          },

          {
            name: "Dev Phase 1",
            stages: [
              {
                name: "Develop",
                tasks: [
                  {
                    name: "Written Customer User Journey",
                    start: 110,
                    end: 114,
                  },
                  {
                    name: "Lo-Fi Prototyping",
                    start: 113,
                    end: 116,
                  },
                ],
              },

              {
                name: "Discover",
                tasks: [
                  {
                    name: "Planning / Conducting User Tests",
                    start: 115,
                    end: 117,
                  },
                ],
              },

              {
                name: "Insights",
                tasks: [
                  {
                    name: "Affinity Map",
                    start: 117,
                    end: 118,
                  },
                  {
                    name: "Importance / Difficulty Chart",
                    start: 117,
                    end: 118,
                  },
                ],
              },

              {
                name: "Develop",
                tasks: [
                  {
                    name: "Lo-Fi Prototyping",
                    start: 118,
                    end: 122,
                  },
                  {
                    name: "Backend System Map",
                    start: 122,
                    end: 124,
                  },
                ],
              },

              {
                name: "Deliver",
                tasks: [
                  {
                    name: "Write / Design Case Study",
                    start: 124,
                    end: 129,
                  },
                ],
              },
            ],
          },

          {
            name: "Dev Phase 2",
            stages: [
              {
                name: "Develop",
                tasks: [
                  {
                    name: "Branding / Aesthetics",
                    start: 129,
                    end: 134,
                  },
                  {
                    name: "Hi-Fi Prototyping",
                    start: 131,
                    end: 138,
                  },
                ],
              },

              {
                name: "Discover",
                tasks: [
                  {
                    name: "Planning / Conducting User Tests",
                    start: 138,
                    end: 141,
                  },
                ],
              },

              {
                name: "Insights",
                tasks: [
                  {
                    name: "Affinity Map",
                    start: 141,
                    end: 143,
                  },
                ],
              },

              {
                name: "Develop",
                tasks: [
                  {
                    name: "Hi-Fi Prototyping",
                    start: 142,
                    end: 147,
                  },
                ],
              },

              {
                name: "Discover",
                tasks: [
                  {
                    name: "Planning / Conducting User Tests",
                    start: 147,
                    end: 150,
                  },
                ],
              },

              {
                name: "Insights",
                tasks: [
                  {
                    name: "Affinity Map",
                    start: 150,
                    end: 151,
                  },
                  {
                    name: "Importance / Difficulty Chart",
                    start: 150,
                    end: 151,
                  },
                ],
              },

              {
                name: "Develop",
                tasks: [
                  {
                    name: "Hi-Fi Prototyping",
                    start: 150,
                    end: 154,
                  },
                ],
              },

              {
                name: "Deliver",
                tasks: [
                  {
                    name: "Write / Design Case Study",
                    start: 154,
                    end: 158,
                  },
                ],
              },
            ],
          },

          {
            name: "Dev Phase 3",
            stages: [
              {
                name: "Develop",
                tasks: [
                  {
                    name: "Hi-Fi Prototyping",
                    start: 158,
                    end: 164,
                  },
                ],
              },

              {
                name: "Discover",
                tasks: [
                  {
                    name: "Planning / Conducting User Tests",
                    start: 163,
                    end: 166,
                  },
                ],
              },

              {
                name: "Insights",
                tasks: [
                  {
                    name: "Affinity Map",
                    start: 166,
                    end: 167,
                  },
                  {
                    name: "Importance / Difficulty Chart",
                    start: 166,
                    end: 167,
                  },
                ],
              },

              {
                name: "Develop",
                tasks: [
                  {
                    name: "Hi-Fi Prototyping",
                    start: 167,
                    end: 174,
                  },
                ],
              },
              {
                name: "Deliver",
                tasks: [
                  {
                    name: "Plan / Storyboard Pitch Video",
                    start: 174,
                    end: 177,
                  },
                  {
                    name: "Record / Produce Pitch Video",
                    start: 177,
                    end: 184,
                  },
                  {
                    name: "Write / Design Presentation",
                    // start: 183,
                    start: [170, 183],
                    // end: 190,
                    end: [175, 190],
                  },
                ],
              },
            ],
          },
        ],
      },

      
    ],
  },
];

function checkGantt(arr) {
  for (var i = 0; i < arr.length; i++) {
    var chart = arr[i];

    var length = chart.weeks;
    var cyclesLength = 0;

    for (var j = 0; j < chart.cycles.length; j++) {
      var cycle = chart.cycles[j];
      cyclesLength += cycle.length;
    }

    if (length != cyclesLength) {
      console.error("Chart " + chart.name + " has a length of " + length + " but the sum of its cycles is " + cyclesLength + " These values should be equal.");
    }
  }
}

function ganttInit(arr) {
  // Adding keys to everything that needs to be mapped through
  for (var i = 0; i < arr.length; i++) {
    var chart = arr[i];
    chart.key = uuidv4();

    for (var j = 0; j < chart.cycles.length; j++) {
      var cycle = chart.cycles[j];
      cycle.key = uuidv4();

      for (var k = 0; k < cycle.phases.length; k++) {
        var phase = cycle.phases[k];
        phase.key = uuidv4();

        for (var l = 0; l < phase.stages.length; l++) {
          var stage = phase.stages[l];
          stage.key = uuidv4();

          for (var m = 0; m < stage.tasks.length; m++) {
            var task = stage.tasks[m];
            task.key = uuidv4();
          }
        }
      }
    }
  }

  // converting weeks to an array of numbers, trimming that array to the length of the cycle, adding keys to each week
  // adding start and end to each cycle
  for (var i = 0; i < arr.length; i++) {
    var chart = arr[i];
    var weeksPast = 0;
    var weekCount = chart.weeks;

    for (var j = 0; j < chart.cycles.length; j++) {
      var cycle = chart.cycles[j];
      weeksPast += cycle.length;
      cycle.start = weeksPast - cycle.length;
      cycle.end = weeksPast;
      cycle.weeks = Array.from(Array(weekCount).keys())
        .map((item) => item + 1)
        .slice(cycle.start, cycle.end);

      cycle.weeks = cycle.weeks.map((item) => {
        return {
          number: item,
          key: uuidv4(),
        };
      });
    }
  }

  // adding start and end to each phase
  for (var i = 0; i < arr.length; i++) {
    var chart = arr[i];

    for (var j = 0; j < chart.cycles.length; j++) {
      var cycle = chart.cycles[j];

      for (var k = 0; k < cycle.phases.length; k++) {
        var phase = cycle.phases[k];

        var phaseStart = 10000;
        var phaseEnd = 0;

        for (var l = 0; l < phase.stages.length; l++) {
          var stage = phase.stages[l];

          for (var m = 0; m < stage.tasks.length; m++) {
            var task = stage.tasks[m];

            if (typeof task.start == "number") {
              if (task.start < phaseStart) {
                phaseStart = task.start;
              }
            } else{
              for (var n = 0; n < task.start.length; n++) {
                if (task.start[n] < phaseStart) {
                  phaseStart = task.start[n];
                }
              }
            }

            if (typeof task.end == "number") {
              if (task.end > phaseEnd) {
                phaseEnd = task.end;
              }
            } else{
              for (var n = 0; n < task.end.length; n++) {
                if (task.end[n] > phaseEnd) {
                  phaseEnd = task.end[n];
                }
              }

            }
            
          }
        }

        phase.start = phaseStart;
        phase.end = phaseEnd;
      }

    }
  }



  for (var i = 0; i < arr.length; i++) {
    var chart = arr[i];

    for (var j = 0; j < chart.cycles.length; j++) {
      var cycle = chart.cycles[j];
      cycle.index = j;
    }
  }









  // // adding start and end to each stage
  // for (var i = 0; i < arr.length; i++) {
  //   var chart = arr[i];

  //   for (var j = 0; j < chart.cycles.length; j++) {
  //     var cycle = chart.cycles[j];

  //     for (var k = 0; k < cycle.phases.length; k++) {
  //       var phase = cycle.phases[k];

  //       for (var l = 0; l < phase.stages.length; l++) {
  //         var stage = phase.stages[l];

  //         var stageStart = 100000;
  //         var stageEnd = 0;

  //         for (var m = 0; m < stage.tasks.length; m++) {
  //           var task = stage.tasks[m];

  //           if (typeof task.start == "number") {
  //             if (task.start < stageStart) {
  //               stageStart = task.start;
  //             }
  //           } else {
  //             for (var n = 0; n < task.start.length; n++) {
  //               if (task.start[n] < stageStart) {
  //                 stageStart = task.start[n];
  //               }
  //             }
  //           }

  //           if (typeof task.end == "number") {
  //             if (task.end > stageEnd) {
  //               stageEnd = task.end;
  //             }
  //           } else {
  //             for (var n = 0; n < task.end.length; n++) {
  //               if (task.end[n] > stageEnd) {
  //                 stageEnd = task.end[n];
  //               }
  //             }
  //           }
  //         }

  //         stage.start = stageStart;
  //         stage.end = stageEnd;

  //       }
  //     }
  //   }
  // }

  checkGantt(arr);

  return arr;
}

export default ganttInit(GANTT_CHARTS);
