Tag = React.createClass({
  getInitialState() {
    return({
      toDelete: false
    })
  },

  delete() {
    if (this.state.toDelete) {
      Meteor.call("deleteTag", this.props.tag);
      this.cancelDelete();
    } else {  // this triggers confirmation of deletion
      this.setState({
        toDelete: true
      });
    }
  },

  cancelDelete() {
    this.setState({
      toDelete: false
    });
  },

  render() {
    return (
      <div className="tag">
        <input 
	  type="checkbox" 
	  checked={this.props.checked} 
	  onChange={this.props.clicked.bind(null, this.props.tag._id)} 
	/>
        <span className="tag">{this.props.tag.name}</span>&nbsp;
	{this.state.toDelete ? (
	  <span className="confirm-delete">
	    <a onClick={this.delete}>confirm</a>
	    &nbsp;|&nbsp;
	    <a onClick={this.cancelDelete}>cancel</a>
	  </span>
	) : (
	  <a onClick={this.delete}>&times;</a>
	)}
      </div>
    )
  }
});
