TagClassSelector = React.createClass({
  getDefaultProps() {
    return({
      includeAll: false
    });
  },

  selectTagClass(e) {
    e.preventDefault();
    
    this.props.selectTagClass(e.target.value);
  },
    
  renderTagClasses() {
    return this.props.tagClasses.map((tagClass) => {
      return <option key={tagClass._id} value={tagClass._id}>{tagClass.name}</option>
    });
  },

  render() {
    return (
      <div className="tag-class-selection">
	<label className="secondary-label">Tag Class </label>
        <select 
          ref="tag-class" 
          className="tag-class" 
          onChange={this.selectTagClass}
        >

          // Only show the "All" option if specified in props
          // (so that this can be reused in situations where "all" is not
          // appropriate, such as tag creation contexts).
          {this.props.includeAll && <option value="all">All</option>}
          {this.renderTagClasses()}
        </select>
      </div>
    )
  }
});
