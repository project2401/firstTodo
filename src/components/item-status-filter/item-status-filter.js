import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component{

button = [
  {name:'all', label: 'All' },
  {name:'active', label: 'Active' },
  {name:'done', label: 'Done' }
]
 render(){
   const { onFilter, filter } = this.props
   const buttons = this.button.map(({name, label})=>{
     const isActive = filter === name
     const clazz = isActive ? 'btn-info': 'btn-outline-secondary'
      return(
        <button type="button"
              key={name}
              className={`btn ${clazz}`} 
              onClick={()=>onFilter(name)}
              >{label}</button>
      )
   })
   return (
    <div className="btn-group">
      {buttons}
    </div>
  );
 }
};


