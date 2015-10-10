Item = React.createClass({
  delete(item) {
    Meteor.call("deleteItem", item);
  },

  render() {
    return (
      <li className="item">
        <span className="item-name">{this.props.item.name}</span>&nbsp;
	<span className="item-tags">({
	  this.props.tags.filter(function(tag) {
	    return _.contains(this.props.item.tags, tag._id);
	  }, this).map(function(tag) {
	    return tag.name;
	  }).join(', ')
	})</span>&nbsp;
        <a href="#" onClick={this.props.edit.bind(null, this.props.item)}>edit</a>&nbsp;
	<a href="#" onClick={this.delete.bind(null, this.props.item)}>&times;</a>
      </li>
    )
  }
});
