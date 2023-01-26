import Mask from "../utilities/Mask";
import GANTT_CHARTS from "/data/GANTT_CHARTS";
import { chevron_down } from "/data/ICONS";


function BarFilled({ className, start, end }) {
  return (
    <div className={`bar--wrapper ${className}`} style={{ "--gantt-start": start, "--gantt-end": end }}>
      <div className="bar bar__filled"></div>
    </div>
  );
}

function Bar({ className, bars, cycle }) {

  var { index } = cycle;

  var adjustedBars = [];

  for (var i = 0; i < bars.length; i++) {
    var bar = bars[i];
    var start = cycle.start * 7 - 1 + index;
    var barStart = bar.start - start;
    var barEnd = bar.end - start;

    adjustedBars[i] = { ...bar, start: barStart, end: barEnd };
  }



  return (
    <div className="bar--group">
      <div className={`bar--wrapper ${className}`}>
        <div className="bar bar__empty"></div>
      </div>

      {adjustedBars.map((bar) => {
        return <BarFilled key={bar.key} className={className} start={bar.start} end={bar.end} />;
      })}
    </div>
  );
}

function Label({ className, children }) {
  return (
    <div className={`label ${className}`}>
      <span title={children}>{children}</span>
    </div>
  );
}

function Task({ task, cycle }) {

  var bars = task.bars;

  return (
    <>
      <div className="gantt--task">
        <Label className="label--task label__inner label__tertiary">{task.name}</Label>
        <Bar className="bar__task" bars={bars} cycle={cycle} />
      </div>
    </>
  );
}

function Stage({ stage, cycle }) {
  var tasks = stage.tasks;

  return (
    <>
      <div className="gantt--stage">
        <Label className="label--stage label__inner label__secondary">{stage.name}</Label>

        {tasks.map((task) => {
          return <Task key={task.key} task={task} cycle={cycle} />;
        })}
      </div>
    </>
  );
}

function Phase({ phase, cycle }) {

  var stages = phase.stages;

  return (
    <>
      <div className="gantt--phase">
        <Label className="label--phase label__inner label__secondary">{phase.name}</Label>
        <Bar className="bar__phase" bars={phase.bars} cycle={cycle} />{/* <Bar className="bar__phase" start={phaseStart} end={phaseEnd} /> */}
        <div className="gantt--icon">
          <Mask img={chevron_down} />
        </div>
        {stages.map((stage) => {
          return <Stage key={stage.key} stage={stage} cycle={cycle}  />;
        })}
      </div>
    </>
  );
}

function Cycle({ cycle, weeks }) {
  var phases = cycle.phases;

  return (
    <div className="gantt--cycle" style={{ "--gantt-weeks": cycle.length, "--gantt-weeks_less": cycle.length - 1, "--gantt-days_less": (cycle.length - 1) * 7 }}>
      <div className="gantt--timeline">
        <Label className="label--title label__primary">Week</Label>

        {weeks.map((week) => {
          return (
            <Label key={week.key} className="label--unit label__primary">
              {week.number}
            </Label>
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
