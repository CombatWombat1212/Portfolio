import Mask from "../utilities/Mask";
import GANTT_CHARTS from "/data/GANTT_CHARTS";
import { chevron_down } from "@/data/ICONS";

function Phase({ phase, cycle }) {

  var {index} = cycle;

  var start = (cycle.start)*7 - 1 + index;

  var phaseStart = phase.start - start;
  var phaseEnd = phase.end - start;

  return (
    <>
      <div className="gantt--phase">
        <div className="label--phase label__secondary">
          <span>{phase.name}</span>
        </div>

        <div className="bar--group" style={{'--gantt-phase-start': phaseStart, '--gantt-phase-end':phaseEnd}}>
          <div className="bar--wrapper">
            <div className="bar bar__empty"></div>
          </div>
          <div className="bar--wrapper">
            <div className="bar bar__filled"></div>
          </div>
        </div>



        <div className="gantt--icon">
          <Mask img={chevron_down} />
        </div>
      </div>
    </>
  );
}

function Cycle({ cycle, weeks }) {
  var phases = cycle.phases;

  return (
    <div className="gantt--cycle" style={{ "--gantt-weeks": cycle.length, "--gantt-weeks_less": cycle.length - 1, "--gantt-days_less": (cycle.length - 1)*7 }}>
      <div className="gantt--timeline">
        <div className="label--title label__primary">
          <span>Week</span>
        </div>

        {weeks.map((week) => {
          return (
            <div key={week.key} className="label--unit label__primary">
              <span>{week.number}</span>
            </div>
          );
        })}
      </div>

      {phases.map((phase) => {
        return <Phase key={phase.key} phase={phase} cycle={cycle} />;
      })}
    </div>
  );
}

function Gantt({ study }) {
  var chart = GANTT_CHARTS.find((c) => c.name === study);
  var cycles = chart.cycles;

  var lengths = cycles.map((cycle) => cycle.length);

  return (
    <>
      <div className="gantt">
        {cycles.map((cycle) => {
          return <Cycle key={cycle.key} cycle={cycle} weeks={cycle.weeks} />;
        })}
      </div>
    </>
  );
}

export default Gantt;
