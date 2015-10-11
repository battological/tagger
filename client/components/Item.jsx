Item = React.createClass({
  delete(item) {
    Meteor.call("deleteItem", item);
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
          <a href="#" onClick={this.props.edit.bind(null, this.props.item)}>edit</a> |&nbsp; 
	  <a href="#" onClick={this.delete.bind(null, this.props.item)}>delete</a>
	</div>
      </li>
    )
  }
});
