TagInput = React.createClass({
  newTagSubmit(e) {
    e.preventDefault();

    var text = React.findDOMNode(this.refs.tagText).value.trim();

    Meteor.call("addTag", text);

    React.findDOMNode(this.refs.tagText).value = '';
  },

  render() {
    return (
      <div className="tag-input">
        <form className="new-tag" onSubmit={this.newTagSubmit}>
          <input type="text" ref="tagText" placeholder="New tag" />
        </form>
      </div>
    )
  }
});
