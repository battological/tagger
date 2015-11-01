ItemCreator = React.createClass({
  getInitialState() {
    // Initialize the state from props.
    // These values are likely to go out of sync.
    return({
      addResults: false,
      editItem: (this.props.editItem || false),
      name: (this.props.editItem ? this.props.editItem.name : ''),
      description: (this.props.editItem ? this.props.editItem.description : ''),
      whichChecked: this.props.whichChecked,
      tagClass: ''
    })
  },

  componentWillMount() {
    this.added = 'success';
    this.updated = 'updated';
    this.failure = 'fail';
  },

  componentWillReceiveProps(newProps) {
    if (newProps.whichChecked !== this.props.whichChecked && newProps.whichChecked.length) {  // if the whichChecked is updated
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

  whichTags() {
    return this.props.tags.filter((tag) => { return _.contains(tag.classes, this.state.tagClass); });
  },

  selectTagClass(tagClass) {
    this.setState({
      tagClass: tagClass
    });
  },

  resultTimeout() {
    setTimeout(function() {
      this.setState({ addResult: false });  // clear the message
    }.bind(this), 5000);
  },

  itemSubmit(e) {
    e.preventDefault();

    var text = this.state.name;
    var tags = this.state.whichChecked;
    var description = this.state.description;

    if (this.state.editItem) {  // editing existing item
      Meteor.call("updateItem", this.state.editItem._id, text, description, tags, function(err, res) {
        this.setState({ addResult: err ? this.failure : this.updated });
        this.resultTimeout();
      }.bind(this));
    } else {  // creating new item
      Meteor.call("addItem", text, description, tags, function(err, res) {
        this.setState({ addResult: err ? this.failure : this.added });
	this.resultTimeout();
      }.bind(this));
    }

    this.itemCancel(e);
  },

  itemCancel(e) {
    e.preventDefault();

    if (this.state.editItem) {
      this.props.endEdit();  // remove edit item from parent
    }
    this.setState({  // remove the item
      editItem: false,
      name: '',
      description: '',
      whichChecked: [] 
    });
  },

  render() {
    var resultClasses = 'results '+this.state.addResult;
    return (
      <div className="iteam-create-container">

	{/* Result bubble */}
	{this.state.addResult && (
	  <div className={resultClasses}>
            <p>{this.state.addResult === this.added ? 'Successfully added' : (this.state.addResult === this.updated ? 'Successfully updated' : 'Error adding')} tag</p>
	  </div>
	)}

	{/* Input form */}
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
	  <TagClassSelector
	    tagClasses={this.props.tagClasses}
	    selectTagClass={this.selectTagClass}
	  />
          <TagList 
	    tags={this.whichTags()} 
	    whichChecked={this.state.whichChecked} 
	    clicked={this.checkedTag} 
	  />
        </form>
	<div className="buttons">
	  <button type="submit" onClick={this.itemSubmit}>{this.state.editItem ? 'Update' : 'Create'}</button>
	  <button onClick={this.itemCancel}>Cancel</button>
	</div>
      </div>
    );
  }
});
