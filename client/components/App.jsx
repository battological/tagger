App = React.createClass({
  getInitialState() {
    return({
      whichChecked: [],
      editItem: false
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
  whichItems(tags, and=0) {
    var min = 1;
    if (and) {
      min = tags.length;
    }
    return (
      this.props.data.items.filter(function(item) {
	return _.intersection(  // returns the intersection of
	  item.tags,  // the item's tags and
	  tags  // the specified tags
	).length >= min  // if the intersection qualifies for bool AND or OR, return this item
      })
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

  render() {
    return (
      <div>
        <header>
          <h1>Tagger</h1>
        </header>

        <AccountsUIWrapper />

        <ItemCreator 
	  tags={this.props.data.tags} 
	  editItem={this.state.editItem}
	  whichChecked={this.state.editItem.tags || []}
	/>
	<TagInput />

        <button className="check-all" onClick={this.checkAll}>Select All</button>
	<button className="check-none" onClick={this.checkNone}>Select None</button>
	<TagList 
	  tags={this.props.data.tags} 
	  whichChecked={this.state.whichChecked}
	  clicked={this.clickedTag} 
	/>
        <ItemList 
	  items={this.whichItems(this.state.whichChecked)} 
	  edit={this.edit} 
	  tags={this.props.data.tags}
	/>
      </div>
    )
  }
});
