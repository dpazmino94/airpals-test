import React from 'react';
import '../autocomplete/autocomplete.styles.scss';
import AutocompleteGoogle from "../../services/AutocompleteGoogle";

const Autocomplete = () => {

 return(
  <div className="autocomplete_google">
    <AutocompleteGoogle className="autocomplete_google"/>
  </div>
  );
};



export default Autocomplete;
