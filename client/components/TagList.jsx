TagList = React.createClass({
  renderTags() {
    return this.props.tags.map((tag) => {
      return <Tag key={tag._id} tag={tag} />;
    });
  },

  render() {
    return (
      <ul>
        {this.renderTags()}
      </ul>
    )
  }
});
