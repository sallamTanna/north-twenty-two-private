import React, { Component } from 'react';
import './style.css';

class OurStoryProduction extends Component {
  render() {
    return <section className="ourStoryProduction-main-section" id="production">
      <p>STEP BY STEP</p>
      <p>The Production of a timepiece</p>
      <p>At NorthTwentytwo we believe that a design should be both beautiful and functional. By combining minimalistic design with quality materials we craft timepieces that endures time. A watch built to last decades with both function and design in mind.</p>

      <article>
        <div>
          <p>STEP 01</p>
          <p>design</p>
          <p>Our minimalistic designs draws inspiration from natural wonders across Scandinavia. Seastacks on the shores of Gotland, northern lights in Kiruna, runestones in Uppsala and the archipelago of Stockholm are just a few examples.</p>
        </div>

        <div>
          <p>STEP 02</p>
          <p>ASSEMBLY</p>
          <p>No shortcuts have been taken and only the most highly refined and quality materials have been used to craft our vision. All aspects during production are carefully supervised and the final part of the assembly takes place by hand at our workshop in Stockholm.</p>
        </div>

        <div>
          <p>STEP 03</p>
          <p>INSPECTION</p>
          <p>Every watch is thoroughly tested and inspected before being shipped and put around your wrist. Not until the every individual part and function, as well as the watch as a whole, has been inspected we approve the timepiece to be a part of our range.</p>
        </div>

        <div>
          <p>STEP 04</p>
          <p>PACKAGING</p>
          <p>The entire packaging process takes place at our workshop in Stockholm, Sweden. Before packaging the timepieces by hand, in our eco-friendly watch boxes, we put them through an extensive polishing procedure to ensure a correct finish upon arrival</p>
        </div>
      </article>
      
      <a href="#"><span>SHOP NOW</span></a>
    </section>
  }
}

export default OurStoryProduction;
