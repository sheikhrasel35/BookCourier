import React from "react";
import { Link } from "react-router-dom";
import HeroSlider from '../components/Home/HeroSlider';
import HowItWorks from '../components/Home/HowItWorks';
import OurMission from '../components/Home/OurMission';
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Coverage from "../components/Home/coverage";
import LatestBooks from "../components/Home/LatestBooks";
import Features from "../components/Home/Features";
import Services from "../components/Home/Services";
import Categories from "../components/Home/Categories";
import Highlights from "../components/Home/Highlights";
import Statistics from "../components/Home/Statistics";
import Testimonials from "../components/Home/Testimonials";
import Newsletter from "../components/Home/Newsletter";
import CTA from "../components/Home/CTA";
import FAQ from "../components/Home/FAQ";

const Home = () => (
  <div>
    <title>BookCourier | Home</title>
    <HeroSlider />
          <Features />
      <Categories />
    
    <div className="whitebg py-12">
      <div className=" max-w-7xl mx-auto">
        <LatestBooks />
      </div>
      
      <div className="text-center my-8">
        <Link to="/books">
          <button className="btn btn-primary px-6 py-2 rounded-lg hover:btn-secondary transition">
            Show All Books
          </button>
        </Link>
      </div>
    </div>
        <WhyChooseUs />
      <Services />
    <div className="graybg">
      <Coverage/>
    </div>
    


    <div className="whitebg">
      <HowItWorks />
    </div>

    <OurMission />

      <Statistics />
      <Testimonials />
      <CTA />
      <FAQ />
  </div>
);

export default Home;
