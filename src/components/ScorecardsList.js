import React, { useState, useEffect } from "react";
import API from "../api";
import { sortableHandle, sortableContainer, sortableElement } from "react-sortable-hoc";
import { Link } from "react-router-dom";
import {arrayMoveImmutable as arrayMove} from "array-move";

export default function ScorecardsList (props) {
  const [scorecards, setScorecards] = useState([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const main = async () => {
      let cards = await API.getScorecards(props.category);
      setScorecards(cards);
    }
    main();
  },[props.category]);

  const handleGenerateButton = async () => {
    setGenerating(true);
    await API.generateScorecards(props.category);
    let cards = await API.getScorecards(props.category);
    setScorecards(cards);
    setGenerating(false);
  }

  const DragHandle = sortableHandle(() => <span>::</span>);
  const SortableItem = sortableElement(({value}) => (
    <li className="list-group-item d-flex justify-content-between align-left">
      <DragHandle />
      {value.title}
      <Link to={`/scorecards/${props.categoryId}/${value._id}`}><span className="btn btn-primary align-right">&gt;</span></Link>
    </li>
  ));
  const SortableList = sortableContainer(({items}) => {
    return (
      <ul className="list-group gy-4">
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </ul>
    );
  });

  const handleSortEnd = async ({oldIndex, newIndex}) => {
    console.log(oldIndex, newIndex);
    let newScorecards = arrayMove(scorecards, oldIndex, newIndex);
    newScorecards = newScorecards.map((e, i) => {e.position = i; return e});
    newScorecards.map(i => console.log(i));
    let r = await API.updateScorecardPositions(newScorecards);
    console.log(r);
    setScorecards(newScorecards);
  }

  return (
    <React.Fragment>
      {scorecards.length > 0 && 
      <React.Fragment>
        <div className="row justify-content-center gy-3">
          <div className="col-6">
            <h2>{props.category}</h2>
            <p>Start by scoring each project. You can see the scorecards by clicking on the blue button. Then, please sort the projects in order of preference by dragging the :: on the left.</p>
          </div>
        </div>
        <div className="row justify-content-center gy-3">
          <div className="col-6">
            <SortableList items={scorecards} onSortEnd={handleSortEnd} useDragHandle/>
          </div>
        </div>
      </React.Fragment>
      }
      {!scorecards.length && 
        <React.Fragment>
        <div className="row gy-5 gx-5 justify-content-center " style={{textAlign: "center"}}>
          <div className="col">
            No Scorecards in this category yet. Click the button below to generate the scorecards.
          </div>
        </div>
        <div className="row gy-5" style={{textAlign: "center"}}>
          <div className="col gy-5">
            <button onClick={handleGenerateButton} className="btn btn-primary" disabled={generating}>+ Generate Scorecards</button>
          </div>
        </div>
        </React.Fragment>
      }
    </React.Fragment>
  )
}