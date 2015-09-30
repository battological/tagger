Tags = React.createClass({
  renderTags() {
    return this.props.tags.map((tag) => {
      return <Tag tag={tag} />;
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
