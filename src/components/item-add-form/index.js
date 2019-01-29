import React, {Component} from 'react'
import './item-add-form.css'

export default class ItemAddForm extends Component {

    state={
        value:''
    }

    onLabelChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    submitForm = (e) =>{
        e.preventDefault()
        this.props.addItem(this.state.value)
        this.setState({value:''})
    }
    render(){
        
        return(
            
            <form className="item-add-form d-flex"
            onSubmit={this.submitForm}
            >
            <input className="form-control"
                placeholder="Enter your item"
                type="text"
                onChange={this.onLabelChange}
                value={this.state.value}
            />
                <button className="btn btn-outline-secondary">
                    Add Item
                </button>
            </form>
        )
    }
}