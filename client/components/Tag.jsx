Tag = React.createClass({
  render() {
    return (
      <div>
        <input type="checkbox" defaultChecked="checked" />
        <span className="tag">{this.props.tag.name}</span>
      </div>
    )
  }
});
