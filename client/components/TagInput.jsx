TagInput = React.createClass({
  getInitialState() {
    return ({
      name: '',
      tagClass: '',
      addResult: false
    });
  },

  componentWillMount() {
    this.success = 'success';
    this.failure = 'fail';
  },

  changeName(e) {
    this.setState({
      name: e.target.value
    });
  },

  selectTagClass(value) {
    this.setState({
      tagClass: value
    });
  },
    
  newTagSubmit(e) {
    e.preventDefault();

    var text = this.state.name;
    var tagClass = [this.state.tagClass];

    Meteor.call("addTag", text, tagClass, function(err, res) {
      this.setState({ addResult: err ? this.failure : this.success });
      setTimeout(function() {
        this.setState({ addResult: false });  // clear the message
      }.bind(this), 5000);
    }.bind(this));

    this.setState({
      name: '',
      tagClass: ''
    });
  },

  render() {
    var resultClasses = 'results '+this.state.addResult;
    return (
      <div className="tag-input">
	
	{/* Result bubble */}
	{this.state.addResult && (
	  <div className={resultClasses}>
	    <p>{this.state.addResult === this.success ? 'Successfully added ' : 'Error adding '} tag.</p>
	  </div>
	)}

	{/* Input form */}
        <form className="new-tag" onSubmit={this.newTagSubmit}>
	  <label>Tag name</label>
          <input 
	    type="text" 
	    ref="tagText" 
	    placeholder="New tag" 
	    value={this.state.name}
	    onChange={this.changeName}
	  />

	  <label>Tag class</label>
          <TagClassSelector 
	    tagClasses={this.props.tagClasses} 
	    selectTagClass={this.selectTagClass}
	    input={true}
	  />

	  <button type="submit" onSubmit={this.newTagSubmit}>Add</button>
        </form>
      </div>
    )
  }
});
