ItemCreator = React.createClass({
  getInitialState() {
    // Initialize the state from props.
    // These values are likely to go out of sync.
    return({
      editItem: (this.props.editItem || false),
      name: (this.props.editItem ? this.props.editItem.name : ''),
      description: (this.props.editItem ? this.props.editItem.description : ''),
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
	description: newProps.editItem.description
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

  changeDescription(e) {
    this.setState({
      description: e.target.value
    });
  },

  itemSubmit(e) {
    e.preventDefault();

    var text = this.state.name;
    var tags = this.state.whichChecked;
    var description = this.state.description;

    console.log(text+', '+description+', '+tags);
    if (this.state.editItem) {  // editing existing item
      Meteor.call("updateItem", this.state.editItem._id, text, description, tags); 
    } else {  // creating new item
      Meteor.call("addItem", text, description, tags);
    }

    this.setState({  // remove the item
      editItem: false,
      name: '',
      description: '',
      whichChecked: [] 
    });
  },

  render() {
    return (
      <div className="iteam-create-container">
        <form className="item-create" onSubmit={this.itemSubmit}>
	  <div className="item-create-text">
	    <label>Item name</label>
            <input 
	      type="text" 
	      ref="itemInput" 
	      placeholder="New item" 
	      value={this.state.name} 
	      onChange={this.changeName}
	    />
	    <label>Item description (optional)</label>
	    <textarea 
	      ref="itemDescription" 
	      placeholder="Description"
	      onChange={this.changeDescription}
	      value={this.state.description}
	    />
	  </div>

          <label>Tags</label>
          <TagList 
	    tags={this.props.tags} 
	    whichChecked={this.state.whichChecked} 
	    clicked={this.checkedTag} 
	  />
        </form>
	<button type="submit" onClick={this.itemSubmit}>{this.state.editItem ? 'Update' : 'Create'}</button>
      </div>
    );
  }
});
