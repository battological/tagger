Items = React.createClass({
  renderItems() {
    return this.props.items.map((item) => {
      return <Item item={item} />
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
