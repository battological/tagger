App = React.createClass({
  getInitialState() {
    return({
      bool: 0,  // 0 = OR, 1 = AND, 2 = NOT
      editItem: false,  // the item to be edited, otherwise false
      tab: 0,
      tags: [],  // the list of tags available given the current tag class
      whichChecked: []
    });
  },

  checkAll() {
    this.setState({
      whichChecked: this.state.tags.map((tag) => { return tag._id })
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
    this.setState({ 
      editItem: item,
    });
    if (item) {
      this.setState({ tab: 1 });
    } else {
      this.setState({ tab: 0 });
    }
  },

  endEdit() {
    this.edit(false);
  },

  changeBool(bool) {
    this.setState({
      bool: bool
    });
  },

  changeTab(tab) {
    this.setState({
      tab: tab
    })
  },

  selectTagClass(tagClass) {
    var tags = this.props.data.tags;
    if (tagClass !== 'all') {
      this.props.data.tags.filter((tag) => { 
        return _.contains(tag.classes, tagClass);
      });
    }

    this.setState({
      tags: tags
    });
  },

  render() {
    return (
      <div>
	<div className="container">
          <header>
            <h1>Tagger <span className="beta">Beta</span></h1>
            <AccountsUIWrapper />
          </header>

	  {this.props.data.currentUser ? (
	    <div>
	      <div className="navigation">
	        <Tabs 
	          tab={this.state.tab}
	          changeTab={this.changeTab}
		  editing={this.state.editItem ? true : false}
	        />
	      </div>

              <div className="body">

                {this.state.tab === 0 && (
	          <div className="view-tab-contents">
	            <div className="tag-display">
	              <h2>Your Tags</h2>

		      <TagClassSelector 
		        tagClasses={this.props.data.tagClasses}
			selectTagClass={this.selectTagClass}
			includeAll={true}
		      />

	              {this.state.tags.length ? (
	                <div>
	                  <div className="all-none">
	                    <label>Select:</label>
	                    <div className="all-none-buttons">
                              <button className="check-all" onClick={this.checkAll}>All</button>
	                      <button className="check-none" onClick={this.checkNone}>None</button>
	                    </div>
	                  </div>

	                  <div className="booleans">
	                    <form>
	                      <label>Matching:</label>
	                      <input type="radio" name="booleans" value="OR" onClick={this.changeBool.bind(null, 0)} defaultChecked="checked" />Any
	                      <input type="radio" name="booleans" value="AND" onClick={this.changeBool.bind(null, 1)} />All
	                      <input type="radio" name="booleans" value="NOT" onClick={this.changeBool.bind(null, 2)}/>None <br />
	                    </form>
	                  </div>

	                  <TagList 
	                    tags={this.state.tags} 
	                    whichChecked={this.state.whichChecked}
	                    clicked={this.clickedTag} 
	                  />

	                </div>
	              ) : (
	                <p>No tags to display. Use the Create/Edit tab to create tags and items.</p>
	              )}
	              
	            </div>

	            <div className="item-display">
	              <h2>Your Items</h2>
                      <ItemList 
	                items={this.whichItems(this.state.whichChecked)} 
			bool={this.state.bool}
	                edit={this.edit} 
	                tags={this.state.tags}
			checked={this.state.whichChecked}
	              />
	            </div>
	          </div>
	        )}

	        {this.state.tab === 1 && (
	          <div className="input-tab-contents">
	            <div className="create-edit">
	              <h2>{this.state.editItem ? 'Edit' : 'Create'} Item</h2>
                      <ItemCreator 
	                tags={this.props.data.tags} 
	                editItem={this.state.editItem}
			endEdit={this.endEdit}
	                whichChecked={this.state.editItem.tags || []}
			tagClasses={this.props.data.tagClasses}
	              />
	            </div>

	            <div className="create-tag">
	              <h2>Add Tag</h2>
	              <TagInput
		        tagClasses={this.props.data.tagClasses}
		      />
	            </div>
	          </div>
	        )}

	      </div>
	    </div>
	  ) : (
	    <div className="welcome">
	      <h2>Welcome to Tagger</h2>
	      <p>Tagger is a tool to help you organize text items by assigning tags to titles and descriptions.</p>
	      <p>Please sign in or create an account to continue.</p>
	    </div>
	  )}
	</div>
      </div>
    )
  }
});
