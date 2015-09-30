App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: Items.find({}).fetch()
    }
  },

  /*
  whichItems(tags, and=0) {
    if (!and) {  // boolean OR
      return {
        this.data.items.filter(function(item) {
	  return _.intersection(item.tags, tags).length > 0
	})
      }
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
        
      <Tags tags={this.state.tags} />
      <Items items={this.whichItems(this.state.tags)} />
      </div>
    )
  }
});
