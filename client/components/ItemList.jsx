ItemList = React.createClass({
  renderItems() {
    return this.props.items.map((item) => {
      return <Item key={item._id} item={item} />
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
