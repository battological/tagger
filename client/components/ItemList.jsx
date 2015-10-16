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
      <ul className="item-list">
        {this.renderItems()}
	{!this.props.items.length && (
	  <li>
	    <h3 className="item-name">No items match your current tags</h3>
	    <p>Please double check your tag selection and your matching parameters (any, all, none).</p>
	  </li>
	)}
      </ul>
    )
  }
});
