App = React.createClass({
  mixins: [ReactMeteorData],

  getItems(and = 0, tags = Items.distinct("tags")) {
    if (!and) {  // boolean OR
      return {
        items: Items.find({ $or: tags.map(
	  function(tag) { 
	    return { "tags": ""+tag } 
	  })
	})
      }
    } else {  // boolean AND
      return {
        items: Items.find({ "tags": tags.join(', "tags":') })
      }
    }
  },

  render() {
    return (
      <div>
        <header>
          <h1>Tagger</h1>
        </header>
        
      <Items items={
      </div>
    )
  }
});
