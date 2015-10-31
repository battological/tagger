TagClassInput = React.createClass({
  newTagClassSubmit(e) {
    e.preventDefault();

    var text = React.findDOMNode(this.refs.tagClassText).value.trim();

    Meteor.call("addTagClass", text);

    React.findDOMNode(this.refs.tagClassText).value = '';
  },

  render() {
    return (
      <form className="new-tag-class" onSubmit={this.newTagClassSubmit}>
        <label>Tag Class</label>
        <input type="text" ref="tagClassText" placeholder="New tag class" />
        <button type="submit">Add</button>
      </form>
    );
  }
});
