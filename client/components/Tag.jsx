Tag = React.createClass({
  render() {
    return (
      <div>
        <input id="{this.props.key}" type="checkbox" checked="checked" />
        <span class="tag">{this.props.tag.name}</span>
      </div>
    )
  }
});
