App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: Items.find({}).fetch(),
      tags: Tags.find({}).fetch(),
      currentUser: Meteor.user()
    }
  },

  whichItems(tags, andOr=0) {
    if (!andOr) {  // boolean OR
      return (
        this.data.items.filter(function(item) {
	  return _.intersection(item.tags.map(function(tag) {
	    return tag.name
	  }), tags).length > 0
	})
      )
    } else { // boolean AND
      // do stuff
    }
  },

  render() {
    return (
      <div>
        <header>
          <h1>Tagger</h1>
        </header>

        <AccountsUIWrapper />
        
        <TagList tags={this.data.tags} />
        <ItemList items={this.whichItems(this.data.tags)} />
      </div>
    )
  }
});
