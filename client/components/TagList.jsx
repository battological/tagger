TagList = React.createClass({
  getDefaultProps() {
    return({
      whichChecked: []
    });
  },

  thisChecked(id) {
    // If this is specified as being checked
    return _.contains(this.props.whichChecked, id);
  },

  renderTags() {
    return this.props.tags.map((tag) => {
      return (
        <Tag 
          key={tag._id} 
	  tag={tag} 
	  checked={this.thisChecked(tag._id)} 
	  clicked={this.props.clicked} 
        />
      );
    });
  },

  render() {
    return (
      <ul>
        {this.renderTags()}
      </ul>
    );
  }
});
