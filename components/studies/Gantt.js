import { addAttrNonDestructive } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useRef } from "react";
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




function phaseCloseAllOthers(elem){
  var phases = document.querySelectorAll(".gantt--phase");
  for (var i = 0; i < phases.length; i++) {
    var phase = phases[i];
    if (phase !== elem) {
      phase.classList.remove("gantt--phase__open");
      phase.classList.add("gantt--phase__closed");

      var icon = phase.querySelector(".gantt--icon");
      icon.classList.remove("gantt--icon__open");
      icon.classList.add("gantt--icon__closed");

    }
  }
}


function phaseOnClick(elem) {
  elem.classList.toggle("gantt--phase__closed");
  elem.classList.toggle("gantt--phase__open");

  var icon = elem.querySelector(".gantt--icon");
  icon.classList.toggle("gantt--icon__open");
  icon.classList.toggle("gantt--icon__closed");
}

function phaseOnClickHandler(e) {
  phaseOnClick(e.current);
  phaseCloseAllOthers(e.current);
}

function phaseEnterHandler(e) {
  if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
    phaseOnClick(e.target);
    phaseCloseAllOthers(e.target);
  }
}

function Phase({ phase, cycle }) {
  var ref = useRef(null);

  useMountEffect(() => {
    // TODO: find all instances of this and make it so only one exists in the main app file
    // at the time of writing there are 2, one here and one under the DynamicLink component
    if (!ref.current) return;
    addAttrNonDestructive(ref.current, "onclick", "setTimeout(()=>{this.blur();},100)", ";");
  });

  var stages = phase.stages;

  var taskCount = 0;
  for (var i = 0; i < stages.length; i++) {
    taskCount += stages[i].tasks.length;
  }

  return (
    <>
      <div
        className="gantt--phase gantt--phase__closed"
        ref={ref}
        onClick={() => {
          phaseOnClickHandler(ref);
        }}
        onKeyDown={(e) => {
          phaseEnterHandler(e, ref);
        }}
        tabIndex="0"
        style={{ "--gantt-stage-count": stages.length, "--gantt-task-count": taskCount }}>
        <Label className="label--phase label__inner label__secondary">{phase.name}</Label>
        <Bar className="bar__phase" bars={phase.bars} cycle={cycle} />

        <div className="gantt--icon gantt--icon__closed">
          <Mask img={chevron_down} />
        </div>

        {stages.map((stage) => {
          return <Stage key={stage.key} stage={stage} cycle={cycle} />;
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

// TODO: add the background thing behind the filled phase bar

  // TODO: Collapse all phases once scrolled past

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
