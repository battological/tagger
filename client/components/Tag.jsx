Tag = React.createClass({
  render() {
    return (
      <div>
        <input type="checkbox" checked="checked" />
        <span class="tag">{this.props.tag}</span>
      </div>
    )
  }
});
