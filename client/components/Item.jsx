Item = React.createClass({
  render() {
    return (
      <li className="item">
        <span>{this.props.item.name}</span>&nbsp;
        <a href="#" onClick={this.props.edit.bind(null, this.props.item)}>edit</a>
      </li>
    )
  }
});
