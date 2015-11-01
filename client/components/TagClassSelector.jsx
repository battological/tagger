TagClassSelector = React.createClass({
  getDefaultProps() {
    return({
      includeAll: false
    });
  },

  getInitialState() {
    return ({
      tagClassInput: false
    });
  },
      
  selectTagClass(e) {
    e.preventDefault();
    
    this.props.selectTagClass(e.target.value);
  },
    
  tagClassInput() {
    this.setState({
      tagClassInput: true
    });
  },

  disableTagClassInput() {
    this.setState({
      tagClassInput: false
    });
  },

  renderTagClasses() {
    return this.props.tagClasses.map((tagClass) => {
      return <option key={tagClass._id} value={tagClass._id}>{tagClass.name}</option>
    });
  },

  render() {
    return (
      <div className="tag-class-selection">
        <select 
          ref="tag-class" 
          className="tag-class" 
          onChange={this.selectTagClass}
        >

          // Only show the "All" option if specified in props
          // (so that this can be reused in situations where "all" is not
          // appropriate, such as tag creation contexts).
          {this.props.includeAll ? 
	    <option value="all">All</option> :
	    <option value="none">---</option>
	  }
          {this.renderTagClasses()}
        </select>

	{/* Only display the following if input is activated (via props) */}
        {this.props.input && 
	  <span className="make-new">
	    {this.state.tagClassInput ? 
	      <TagClassInput inputComplete={this.disableTagClassInput} /> : 
	      <button className="plus" onClick={this.tagClassInput}>+</button>
	    }
	  </span>
	}
      </div>
    )
  }
});
