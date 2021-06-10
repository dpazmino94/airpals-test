import React from 'react';
import '../homepage/homepage.styles.scss' ;

import Autocomplete  from '../../components/autocomplete/autocomplete.component';

const HomePage = () => (
  <div className='homepage'>
      <h1>Where are you located?</h1>
      <h4>So we know where to drop off the stuff</h4>
      <p>We won't share your address <br />
       with your ex (or whoever)</p>
    <Autocomplete/>
  </div>
);

export default HomePage;
