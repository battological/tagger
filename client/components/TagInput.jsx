TagInput = React.createClass({
  getInitialState() {
    return ({
      addResult: false
    });
  },

  componentWillMount() {
    this.success = 'success';
    this.failure = 'fail';
  },

  newTagSubmit(e) {
    e.preventDefault();

    var text = React.findDOMNode(this.refs.tagText).value.trim();

    Meteor.call("addTag", text, function(err, res) {
      this.setState({ addResult: err ? this.failure : this.success });
      setTimeout(function() {
        this.setState({ addResult: false });  // clear the message
      }.bind(this), 5000);
    }.bind(this));

    React.findDOMNode(this.refs.tagText).value = '';
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
          <input type="text" ref="tagText" placeholder="New tag" />

	  <label>Tag class</label>
          <TagClassSelector tagClasses={this.props.tagClasses} />

	  <button type="submit" onSubmit={this.newTagSubmit}>Add</button>
        </form>

	<TagClassInput />
      </div>
    )
  }
});
