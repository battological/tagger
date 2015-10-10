ItemList = React.createClass({
  renderItems() {
    return this.props.items.map((item) => {
      return (
        <Item 
          key={item._id} 
	  item={item} 
	  edit={this.props.edit} 
	  tags={this.props.tags}
	/>
      );
    });
  },
      
  render() {
    return (
      <ul>
        {this.renderItems()}
      </ul>
    )
  }
});
