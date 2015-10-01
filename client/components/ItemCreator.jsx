ItemCreator = React.createClass({
  chooseTagSubmit(e) {
    e.preventDefault();
    // to complete...
  },

  newItemSubmit(e) {
    e.preventDefault();

    var text = React.findDOMNode(this.refs.itemInput).value.trim();

    Meteor.call("addItem", text);

    React.findDOMNode(this.refs.itemInput).value = '';
  },

  render() {
    return (
      <div className="item-create">
        <ItemInput onNewSubmit={this.newItemSubmit} />
        <TagInput tags={this.props.tags} onChooseSubmit={this.chooseTagSubmit} />
      </div>
    );
  }
});
