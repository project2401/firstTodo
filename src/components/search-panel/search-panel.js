import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component{
  
  enterSearch = (e) => {
    this.props.searchInput(e.target.value)
  }
  render(){
   
    return (
    <input type="text"
              className="form-control search-input"
              placeholder="type to search" 
              onChange={this.enterSearch}/>
  );
  }
}

