TagClassInput = React.createClass({
  componentDidMount() {
    this.refs.tagClassText.getDOMNode().focus();
  },

  newTagClassSubmit(e) {
    e.preventDefault();

    var text = React.findDOMNode(this.refs.tagClassText).value.trim();

    Meteor.call("addTagClass", text);

    React.findDOMNode(this.refs.tagClassText).value = '';
    this.props.inputComplete();
  },

  render() {
    return (
      <div className="new-tag-class">
        <input type="text" ref="tagClassText" placeholder="New tag class" />
        <button onClick={this.newTagClassSubmit}>Add</button>
      </div>
    );
  }
});
