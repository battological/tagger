TagInput = React.createClass({
  newSubmit(e) {
    e.preventDefault();

    var text = React.findDOMNode(this.refs.tagText).value.trim();

    Meteor.call("addTag", text);

    React.findDOMNode(this.refs.tagText).value = '';
  },

  chooseSubmit(e) {
    e.preventDefault();
    // to complete...
  },

  render() {
    return (
      <div className="tag-input">
        <form className="new-tag" onSubmit={this.newSubmit}>
          <input type="text" ref="tagText" placeholder="New tag" />
        </form>
        <form className="choose-tags" onSubmit={this.chooseSubmit}>
          <TagList tags={this.props.tags} />
        </form>
      </div>
    )
  }
});
