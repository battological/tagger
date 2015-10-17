ItemList = React.createClass({
  groupItems() {
    // Save some cycles by initially filtering out unchecked tags
    var tags = this.props.tags.filter((tag) => {
      let contains = _.contains(this.props.checked, tag._id);

      if (this.props.bool === 2) {  // NOT
        return !contains;
      }
      return contains;  // OR
    });

    // Group items by tag, duplicating items into each tag it is assigned
    tagMap = {};
    this.props.items.forEach((item) => {
      tags.filter((tag) => {
        return _.contains(item.tags, tag._id);
      }, this).forEach((tag) => {
        tagMap[tag.name] = (tagMap[tag.name] || []);
	tagMap[tag.name].push(item);
      });
    });
    return tagMap;
  },

  renderUngroupedItems() {
    return [
      <h3 key='tags'>{this.props.tags.filter((tag) => { return _.contains(this.props.checked, tag._id); }).map((tag) => { return tag.name; }).join(', ')}</h3>,
      ...this.props.items.map((item) => {
      return (
        <Item 
          key={item._id} 
	  item={item} 
	  edit={this.props.edit} 
	  tags={this.props.tags}
	/>
      );
    })];
  },
        
  renderGroupedItems() {
    var tagMap = this.groupItems();

    var tags = Object.keys(tagMap);
    tags.sort();

    var toRender = [];
    tags.forEach((tag) => {
      toRender.push(<h3 key={tag+'_label'}>{tag}</h3>);  // add tag as a header
      items = [];
      tagMap[tag].forEach((item) => {  // add each item
	items.push(
          <Item 
            key={item._id+'_'+tag} 
	    item={item} 
	    edit={this.props.edit} 
	    tags={this.props.tags}
	  />
	);
      });
      toRender.push(<div className="item-class" key={tag}>{items}</div>);
    });
    return toRender;
  },

  renderItems() {
    if (this.props.bool === 0 || this.props.bool === 2) {  // OR or NONE
      return this.renderGroupedItems();
    } else if (this.props.bool === 1) { 
      return this.renderUngroupedItems();
    }
  },
      
  render() {
    return (
      <ul className="item-list">
        {this.renderItems()}
	{!this.props.items.length && (
	  <li>
	    <h3 className="item-name">No items match your current tags</h3>
	    <p>Please double check your tag selection and your matching parameters (any, all, none).</p>
	  </li>
	)}
      </ul>
    )
  }
});
