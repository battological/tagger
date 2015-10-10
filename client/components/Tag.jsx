Tag = React.createClass({
  delete(tag) {
    Meteor.call("deleteTag", tag);
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
	<a href="#" onClick={this.delete.bind(null, this.props.tag)}>&times;</a>
      </div>
    )
  }
});
