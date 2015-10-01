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
   * @param tags - An array of tagIds
   * @param and - Whether to use a boolean AND (1) or OR (0)
   * @returns An array of items tagged with the specified tags
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

  render() {
    return (
      <div>
        <header>
          <h1>Tagger</h1>
        </header>

        <AccountsUIWrapper />

	<TagList tags={this.data.tags} />
        <ItemList items={
	  this.whichItems(this.data.tags.map(
	    function(tag) { return tag._id; }
	  ))
	} />
      </div>
    )
  }
});
