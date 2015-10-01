Tag = React.createClass({
  render() {
    return (
      <div>
        <input type="checkbox" checked="checked" />
        <span className="tag">{this.props.tag.name}</span>
      </div>
    )
  }
});
