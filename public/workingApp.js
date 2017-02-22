var TodosList = React.createClass({
  render: function() {
    var self = this;
    var todos = this.props.todos.map(function(t){
      return (
        <div className="panel panel-default my-panel" key={t._id}>
          <div className="panel-body">
            <h3> { t.name }  </h3>
            <p> { t.description } </p>
            <p> { t.priority } </p>
          </div>
          <div className="panel-footer">
            <p> Due: { t.dueDate.slice(0,10) } </p>
            <button type="button" className="btn btn-default pull-right" onClick={self.props.handleComplete.bind(this, t)}>complete</button>
          </div>
        </div>
        )
    });
    return (
      <div>
        <h2> My list of todos </h2>
        { todos }
      </div>
      )
  }
});

var TodoForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      description: '',
      dueDate: '',
      priority: ''
    };
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },
  handleDueDateChange: function(e) {
    this.setState({dueDate: e.target.value});
  },
  handlePriorityChange: function(e) {
    this.setState({priority: e.target.value});
  }
  handleSubmit: function(e){
   e.preventDefault();
    var name = this.state.name.trim();
    var description = this.state.description.trim();
    var dueDate = this.state.dueDate.trim();
    var priority = this.state.priority.trim();
    this.props.onTodoSubmit({name: name, description: description, dueDate: dueDate, priority: priority});
    this.setState({ name: '', description: '', dueDate: '', priority: ''});
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <legend>new todo</legend>

          <div className="form-group">
            <label htmlFor="">name</label>
            <input type="text" value={this.state.name}
            onChange={this.handleNameChange} className="form-control" id=""/>
          </div>

          <div className="form-group">
            <label htmlFor="">description</label>
            <input type="text" value={this.state.description}
          onChange={this.handleDescriptionChange} className="form-control" id=""/>
          </div>

          <div className="form-group">
            <label htmlFor="">due date</label>
            <input type="date" value={this.state.dueDate}
          onChange={this.handleDueDateChange} className="form-control" id=""/>
          </div>

          <div className="form-group">
            <label htmlFor="">priority</label>
            <input type="Number" value={this.state.name}
            onChange={this.handlePriorityChange} className="form-control" id=""/>
          </div>

          <button type="" className="btn btn-primary">Submit</button>
        </form>
      </div>

      )
  }
})


var App = React.createClass({
  getInitialState: function() {
    return {
      todos : []
      }
  },
  onTodoSubmit: function(todo){
    var todo = todo;
    $.ajax({
      url: '/api/todos',
      type: 'POST',
      data: todo
    }).done(function(todo){
      console.log('sending todo to server', todo)
      this.loadTodosFromServer()
    }.bind(this))
  },
  loadTodosFromServer: function() {
    $.ajax({
      url: '/api/todos',
      method: 'GET'
    }).done(function(todos){
      console.log(todos);
      this.setState({todos: todos})
    }.bind(this))
  },
  handleComplete: function(todo) {
    var id = todo._id;
    $.ajax({
      url: 'api/todos/' + id,
      method: 'DELETE'
    }).done(function(){
      console.log('deleteing todo')
      this.loadTodosFromServer();
    }.bind(this))
  },
  componentDidMount: function(){
    this.loadTodosFromServer();
  },
  render: function() {
    return (
      <div>
        <TodosList
        todos={this.state.todos}
        handleComplete={this.handleComplete}
        />
        <TodoForm onTodoSubmit={this.onTodoSubmit}/>
      </div>
      )
  }
});

React.render(<App/>, document.getElementById('app'));
