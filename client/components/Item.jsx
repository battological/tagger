Item = React.createClass({
  getInitialState() {
    return({
      toDelete: false
    })
  },

  delete() {
    if (this.state.toDelete) {
      Meteor.call("deleteItem", this.props.item);
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
      <li className="item">
        <h3 className="item-name">{this.props.item.name}</h3>
	<p className="item-tags">Tags: {
	  this.props.tags.filter(function(tag) {
	    return _.contains(this.props.item.tags, tag._id);
	  }, this).map(function(tag) {
	    return tag.name;
	  }).join(', ')
	}</p>
	<p className="description">{this.props.item.description}</p>
	<div className="controls">
	  <span>
            <a onClick={this.props.edit.bind(null, this.props.item)}>edit</a>
	    &nbsp;|&nbsp;
	  </span>
	  {this.state.toDelete && (
	    <span>
	      <a onClick={this.cancelDelete}>cancel delete</a>
	      &nbsp;|&nbsp;
	    </span>
	  )}
	  <span>
	    <a onClick={this.delete}>{this.state.toDelete && 'really '}delete</a>
	  </span>
	</div>
      </li>
    )
  }
});
