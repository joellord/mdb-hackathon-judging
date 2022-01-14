import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api";
import { useParams, Link } from "react-router-dom";
import ScorecardsList from "../components/ScorecardsList";
import Hero from "../components/Hero";

export default function Scorecards() {
  const params = useParams();
  if (params.id === undefined) params.id = 0;
  else params.id = parseInt(params.id);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(params.id);

  useEffect(() => {
    const main = async () => {
      const cat = await API.getCategories();
      setCategories(cat);
      if (params.id === undefined) params.id = 0;
      else params.id = parseInt(params.id);
      setSelectedCategory(cat[params.id]);
    }
    main();
  }, [params.id]);

  return(
    <div>
      <Navbar />
      <Hero />
      <main>
        <div className="row">
          <ul className="nav nav-tabs">
            {categories.map((cat, index) => {
              return (
                <li key={index} className="nav-item">
                  <Link className={`nav-link ${selectedCategory === cat ? "active" : ""}`} aria-current="page" to={`/scorecards/${index}`}>{cat}</Link>
                </li>
              )
            }) }
          </ul>
        </div>
        <div className="row">
          <ScorecardsList category={selectedCategory} categoryId={params.id} />
        </div>
      </main>
      <br/><br/>
    </div>
  )
}