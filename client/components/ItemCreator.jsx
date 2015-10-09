ItemCreator = React.createClass({
  getInitialState() {
    return({
      whichChecked: []
    })
  },

  checkedTag(id) {
    var newArray;
    if (_.contains(this.state.whichChecked, id)) {
      newArray = this.state.whichChecked.filter(function(e) {
        return e !== id;
      });
    } else {
      newArray = [...this.state.whichChecked, id];
    }
    this.setState({ whichChecked: newArray });
  },

  newItemSubmit(e) {
    e.preventDefault();

    var text = React.findDOMNode(this.refs.itemInput).value.trim();

    Meteor.call("addItem", text, this.state.whichChecked);

    React.findDOMNode(this.refs.itemInput).value = '';
    this.setState({ whichChecked: [] });
  },

  render() {
    return (
      <div className="iteam-create-container">
        <form className="item-create" onSubmit={this.newItemSubmit}>
          <input type="text" ref="itemInput" placeholder="New item" />

          <TagList 
	    tags={this.props.tags} 
	    whichChecked={this.state.whichChecked} 
	    clicked={this.checkedTag} 
	  />
        </form>
      </div>
    );
  }
});
