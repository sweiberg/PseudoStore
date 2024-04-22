import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
      <h2 className="text-6xl text-center mb-10 max-sm:text-3xl text-accent-content">Group 04</h2>
      <p className="text-lg text-left max-sm:text-sm max-sm:px-2 text-accent-content">
      Shayan Akhoondan<br />
      Shahbozbek Hakimov<br />
      Moshe Singerman<br />
      Jonathon Weiberg<br />
      Stephen Weiberg<br />
      </p>
      </div>
    </div>
  );
};

export default About;
