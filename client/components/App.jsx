App = React.createClass({
  getInitialState() {
    return({
      whichChecked: [],
      editItem: false,
      bool: 0  // 1 = AND, 0 = OR, 2 = NOT
    });
  },

  checkAll() {
    this.setState({
      whichChecked: this.props.data.tags.map((tag) => { return tag._id })
    })
  },

  checkNone() {
    this.setState({
      whichChecked: []
    })
  },

  /**
   * Find the items that match the tags and the search strategy specified
   * @param {string} tags - An array of tagId strings
   * @param {number} and - Whether to use a boolean AND (1) or OR (0)
   * @returns {Item[]} - An array of items tagged with the specified tags
   */
  whichItems(tags) {
    var min = 1;  // OR
    if (this.state.bool === 1) {  // AND
      min = Math.max(tags.length, 1);  // at least 1 tag must be selected
    }
    return (
      this.props.data.items.filter(function(item) {
	var intersection = _.intersection(  // returns the intersection of
	  item.tags,  // the item's tags and
	  tags  // the specified tags
	)
	if (this.state.bool === 2) {  // NOT
	  return !intersection.length;  // intersection should be 0 for NOT
	}
	return intersection.length >= min  // if the intersection qualifies for bool AND or OR, return this item
      }, this)
    );
  },

  clickedTag(id) {
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

  edit(item) {
    this.setState({ editItem: item });
  },

  changeBool(bool) {
    this.setState({
      bool: bool
    });
  },

  render() {
    return (
      <div>
	<div className="container">
          <header>
            <h1>Tagger</h1>
            <AccountsUIWrapper />
          </header>

          <div className="body">

            <div className="tag-display">
	      <h2>Your Tags</h2>
	      <TagList 
	        tags={this.props.data.tags} 
	        whichChecked={this.state.whichChecked}
	        clicked={this.clickedTag} 
	      />
              <button className="check-all" onClick={this.checkAll}>Select All</button>&nbsp;
	      <button className="check-none" onClick={this.checkNone}>Select None</button>
	      <form>
	        <input type="radio" name="booleans" value="OR" onClick={this.changeBool.bind(null, 0)} defaultChecked="checked" />OR
	        <input type="radio" name="booleans" value="AND" onClick={this.changeBool.bind(null, 1)} />AND
	        <input type="radio" name="booleans" value="NOT" onClick={this.changeBool.bind(null, 2)}/>NOT
	      </form>
	    </div>

	    <div className="item-display">
	      <h2>Your Items</h2>
              <ItemList 
	        items={this.whichItems(this.state.whichChecked)} 
	        edit={this.edit} 
	        tags={this.props.data.tags}
	      />
	    </div>

	    <div className="create-edit">
	      <h2>{this.state.editItem ? 'Edit' : 'Create'} an Item</h2>
              <ItemCreator 
	        tags={this.props.data.tags} 
	        editItem={this.state.editItem}
	        whichChecked={this.state.editItem.tags || []}
	      />
	    </div>

	  </div>
	</div>
      </div>
    )
  }
});
