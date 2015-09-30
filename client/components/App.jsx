App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: Items.find({}).fetch()
    }
  },

  getAllItems() {
    if (this.data.items.length > 0) {
      return (
        _.uniq([this.data.items.map(
          function(item) { 
            return item.tags; 
          }
        ).reduce(
          function(p, c) { 
            return p.concat(c); 
          }
        )])
      )
    } else {
      return []
    }
  },

  whichItems(tags, andOr=0) {
    if (!andOr) {  // boolean OR
      return (
        this.data.items.filter(function(item) {
	  return _.intersection(item.tags, tags).length > 0
	})
      )
    } else { // boolean AND
      // do stuff
    }
  },
  
  /*
  getItems(and = 0, tags = _.uniq([this.data.items.map(function(item) { return item.tags; }).reduce(function(p, c) { return p.concat(c); })])) {
    if (!and) {  // boolean OR
      return {
        items: Items.find({ $or: tags.map(
	  function(tag) { 
	    return { "tags": ""+tag } ;
	  })
	})
      };
    } else {  // boolean AND
      return {
        items: Items.find({ "tags": tags.join(', "tags":') })
      };
    }
  },
*/

  render() {
    return (
      <div>
        <header>
          <h1>Tagger</h1>
        </header>
        
      <Items items={this.whichItems(this.getAllItems())} />
      </div>
    )
  }
});
