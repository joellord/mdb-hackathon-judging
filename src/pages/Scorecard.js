import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Scorecard() {
  const params = useParams();
  const navigate = useNavigate();

  const [scorecard, setScorecard] = useState({});
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [techComplexity, setTechComplexity] = useState(0);
  const [techExecution, setTechExecution] = useState(0);
  const [ideaImpact, setIdeaImpact] = useState(0);
  const [ideaCreativity, setIdeaCreativity] = useState(0);
  const [atlasInnovative, setAtlasInnovative] = useState(0);
  const [atlasExecution, setAtlasExecution] = useState(0);
  const [score, setScore] = useState();

  useEffect(() => {
    const main = async () => {
      let s = await API.getScorecard(params.scorecardId);
      setTechComplexity(s.scores.techComplexity);
      setTechExecution(s.scores.techExecution);
      setIdeaImpact(s.scores.ideaImpact);
      setIdeaCreativity(s.scores.ideaCreativity);
      setAtlasInnovative(s.scores.atlasInnovative);
      setAtlasExecution(s.scores.atlasExecution);
      setScorecard(s);
    };
    main();
  }, []);

  useEffect(() => {
    let tech = techComplexity * techExecution;
    let idea = ideaImpact * ideaCreativity;
    let atlas = atlasInnovative * atlasExecution;
    setScore(tech + idea + atlas);
  }, [techComplexity, techExecution, ideaImpact, ideaCreativity, atlasInnovative, atlasExecution])

  const handleSaveScorecard = async (e) => {
    e.preventDefault();
    setSaveDisabled(true);
    await API.saveScores(scorecard._id, {
      techComplexity, techExecution, ideaImpact, ideaCreativity, atlasInnovative, atlasExecution
    });
    setSaveDisabled(false);
    navigate(`/scorecards/${params.id}`)
  }

  return (
    <React.Fragment>
      <Navbar addBackTo={{id: 0, title: scorecard.category}}/>
      <Hero />
      <div className="row justify-content-center">
        <div className="col-9">
          <h2>Scorecard for {scorecard.title}</h2>
          <h3>{scorecard.category}</h3>
          <hr width="80%" />
        </div>
      </div>
      <form>

        <div className="row justify-content-center">
          <div className="col-9">
              <h4>Technical Difficulty</h4>
              <p>Projects should have a certain level of technical complexity and should be mostly bug-free.</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-9">
              <div className="mb-3 justify-content-left">
                <label htmlFor="techComplexity" className="form-label">Complexity</label>
                <input type="range" className="form-range" min="1" max="5" id="techComplexity" value={techComplexity} onChange={e => setTechComplexity(e.target.value)} />
                <div id="techComplexityHelp" className="row form-text justify-content-between">
                  <span className="col-3 align-self-start">The project is simple and easy to recreate</span>
                  <span className="col-3 align-self-end">So complex, I don't even understand how this works</span>
                </div>
              </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-9">
              <div className="mb-3 justify-content-left">
                <label htmlFor="techExecution" className="form-label">Execution</label>
                <input type="range" className="form-range" min="1" max="5" id="techExecution" value={techExecution} onChange={e => setTechExecution(e.target.value)} />
                <div id="techExecutionHelp" className="row form-text justify-content-between">
                  <span className="col-3 align-self-start">Project is full of bugs</span>
                  <span className="col-3 align-self-end">Everything works perfectly, smoothly</span>
                </div>
              </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-9">
            <h4>Idea</h4>
            <p>The project should be original and impactful.</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-9">
              <div className="mb-3 justify-content-left">
                <label htmlFor="ideaImpact" className="form-label">Impact</label>
                <input type="range" className="form-range" min="1" max="5" id="ideaImpact" value={ideaImpact} onChange={e => setIdeaImpact(e.target.value)} />
                <div id="ideaImpactHelp" className="row form-text justify-content-between">
                  <span className="col-3 align-self-start">Usage of this software will lead to the end of humanity</span>
                  <span className="col-3 align-self-end">This project will save lives</span>
                </div>
              </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-9">
            <div className="mb-3 justify-content-left">
              <label htmlFor="ideaCreativity" className="form-label">Creativity</label>
              <input type="range" className="form-range" min="1" max="5" id="ideaCreativity" value={ideaCreativity} onChange={e => setIdeaCreativity(e.target.value)} />
              <div id="ideaCreativityHelp" className="row form-text justify-content-between">
                <span className="col-3 align-self-start">The project is a common idea</span>
                <span className="col-3 align-self-end">This project is revolutionary</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-9">
              <h4>Use of Atlas</h4>
              <p>Projects should be using as many MongoDB Atlas features as possible, in new and creative ways.</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-9">
              <div className="mb-3 justify-content-left">
                <label htmlFor="atlasInnovative" className="form-label">Innovative</label>
                <input type="range" className="form-range" min="1" max="5" id="atlasInnovative" value={atlasInnovative} onChange={e => setAtlasInnovative(e.target.value)} />
                <div id="atlasInnovativeHelp" className="row form-text justify-content-between">
                  <span className="col-3 align-self-start">Been there, done that</span>
                  <span className="col-3 align-self-end">This is the first time I see Atlas used this way</span>
                </div>
              </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-9">
              <div className="mb-3 justify-content-left">
                <label htmlFor="atlasExecution" className="form-label">Execution</label>
                <input type="range" className="form-range" min="1" max="5" id="atlasExecution" value={atlasExecution} onChange={e => setAtlasExecution(e.target.value)} />
                <div id="atlasExecutionHelp" className="row form-text justify-content-between">
                  <span className="col-3 align-self-start">The project barely uses Atlas/could've used MySQL instead</span>
                  <span className="col-3 align-self-end">The project uses all the features available in Atlas	</span>
                </div>
              </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-9 justify-content-center">
            Score, before position bonuses: {score}/75
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-9 justify-content-center">
            <button type="submit" onClick={handleSaveScorecard} disabled={saveDisabled} className="btn btn-primary">Save Score</button>
          </div>
        </div>

      </form>
    </React.Fragment>
  )
}
