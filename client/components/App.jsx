App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: Items.find({}).fetch(),
      tags: Tags.find({}).fetch(),
      currentUser: Meteor.user()
    }
  },

  /**
   * Find the items that match the tags and the search strategy specified
   * @param {ObjectId[]} tags - An array of tagIds
   * @param {number} and - Whether to use a boolean AND (1) or OR (0)
   * @returns {Item[]} - An array of items tagged with the specified tags
   */
  whichItems(tags, and=0) {
    var min = 1;
    if (and) {
      min = tags.length;
    }
    return (
      this.data.items.filter(function(item) {
	return _.intersection(
	  item.tags.map(function(tag) { 
	    return tag._str; 
	  }), 
	  tags.map(function(tag) { 
	    return tag._str; 
	  })
	).length >= min
      })
    );
  },

  clickedTag(key) {
    return null;
  },

  render() {
    return (
      <div>
        <header>
          <h1>Tagger</h1>
        </header>

        <AccountsUIWrapper />

        <ItemCreator tags={this.data.tags} />
	<TagInput />

	<TagList 
	  tags={this.data.tags} 
	  whichChecked={this.data.tags.map((tag) => { return tag._id; })}
	  clicked={this.clickedTag} 
	/>
        <ItemList items={
	  this.whichItems(this.data.tags.map(
	    function(tag) { return tag._id; }
	  ))
	} />
      </div>
    )
  }
});
