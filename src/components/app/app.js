import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component{

  newId = 100;

  state = {
    todoData:[
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term:'',
    filter: 'all'
    
  }

  createTodoItem(label) {
    return{
      label,
      important: false,
      done: false,
      id: this.newId++
    }
  }
    deleteItem = (id) => {
      this.setState(({todoData})=>{
        const idx = todoData.findIndex(el=>el.id===id)
        const toDo = [
          ...todoData.slice(0, idx),
          ...todoData.slice(idx + 1)
        ]
        return{
          todoData: toDo
        }
      })
    }

    addItem = (text) => {
      const newTodo = this.createTodoItem(text)
      this.setState(({todoData})=>{
        const newArr = [
          ...todoData,
          newTodo
        ]
        return{
          todoData: newArr
        }
      })
    }

toggleProperty(arr, id, name){
    const idx = arr.findIndex(el=>el.id===id)
    const oldItem = arr[idx]
    const newItem = {...oldItem, [name]: !oldItem[name]}
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ]
}

    onToggleImportant = (id) =>{
      this.setState(({todoData})=>{
        return{
          todoData: this.toggleProperty(todoData, id, 'important')
        }
      })
    }

    onToggleDone = (id) =>{
      this.setState(({todoData})=>{
        return{
          todoData: this.toggleProperty(todoData, id, 'done')
        }
      })
    }

    // onToggleDone = (id) => {
    //   this.setState(({ todoData })=>{
    //     const idx = todoData.findIndex(el=>el.id===id)
    //     const oldItem = todoData[idx]
    //     const newItem = {...oldItem, done:!oldItem.done}
    //     const newTodo = [
    //       ...todoData.slice(0,idx),
    //       newItem,
    //       ...todoData.slice(idx + 1)
    //     ]
    //     return{
    //       todoData: newTodo
    //     }
    //   })
    // }

    searchInput = (term) =>{
      this.setState({
        term
      })
    }

    searchItems(todoData, term){
      if(term.length === 0) return todoData
      return todoData.filter(item=>item.label.toLowerCase().indexOf(term.toLowerCase()) > -1)
    }
    
    filter(todoData, filter){
      switch (filter) {
        case 'all':
          return todoData
        case 'active':
          return todoData.filter(el=>!el.done);
        case 'done':
          return todoData.filter(el=>el.done)
        default:
          return todoData
      }
    }
    onFilter =(filter) => [
      this.setState({ filter })
    ]
    
render(){
  
  const { todoData, term, filter } = this.state
  const visibleItem = (this.searchItems(todoData, term))
  const filters = this.filter(visibleItem, filter)
  const doneCount = todoData.filter(el=>el.done===true).length
  const todoCount = todoData.length - doneCount

  return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel 
        searchInput={this.searchInput}
        />
        <ItemStatusFilter 
        filter={filter}
        onFilter={this.onFilter}
        />
      </div>

      <TodoList 
        todos={filters}
        onDelete={this.deleteItem}
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone}
      />
      <ItemAddForm
      addItem={this.addItem}
      />
    </div>
  );
}
  
  
};


