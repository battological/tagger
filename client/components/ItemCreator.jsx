ItemCreator = React.createClass({
  getInitialState() {
    // Initialize the state from props.
    // These values are likely to go out of sync.
    return({
      editItem: (this.props.editItem || false),
      name: (this.props.editItem ? this.props.editItem.name : ''),
      whichChecked: []
    })
  },

  componentWillReceiveProps(newProps) {
    if (newProps.whichChecked !== this.props.whichChecked) {  // if the whichChecked is updated
      this.setState({
        whichChecked: newProps.whichChecked
      });
    }
    if (newProps.editItem !== this.props.editItem) {  // if we are passed a new editItem
      this.setState({
	editItem: newProps.editItem,
        name: newProps.editItem.name,
      });
    }
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

  changeName(e) {
    this.setState({
      name: e.target.value
    });
  },

  itemSubmit(e) {
    e.preventDefault();

    var text = this.state.name;
    var tags = this.state.whichChecked;

    if (this.state.editItem) {  // editing existing item
      Meteor.call("updateItem", this.state.editItem._id, text, tags); 
    } else {  // creating new item
      Meteor.call("addItem", text, tags);
    }

    this.setState({  // remove the item
      editItem: false,
      name: '',
      whichChecked: [] 
    });
  },

  render() {
    return (
      <div className="iteam-create-container">
        <form className="item-create" onSubmit={this.itemSubmit}>
          <input 
	    type="text" 
	    ref="itemInput" 
	    placeholder="New item" 
	    value={this.state.name} 
	    onChange={this.changeName}
	  />

          <TagList 
	    tags={this.props.tags} 
	    whichChecked={this.state.whichChecked} 
	    clicked={this.checkedTag} 
	  />
	  <button type="submit">{this.state.editItem ? 'Update' : 'Create'}</button>
        </form>
      </div>
    );
  }
});
