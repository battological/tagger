Tabs = React.createClass({
  render() {
    return (
      <nav className="tabs">
        
	<div 
	  className="view-tab" 
	  onClick={this.props.changeTab.bind(null, 0)}
	  style={{ borderBottom: this.props.tab === 0 ? '0' : '' }}
	>
	  <a>View</a>
	</div>

        <div 
	  className="input-tab" 
	  onClick={this.props.changeTab.bind(null, 1)} 
	  style={{ borderBottom: this.props.tab === 1 ? '0' : '' }}
	>
	  <a>{this.props.editing ? 'Edit' : 'Create'}</a>
	</div>

      </nav>
    )
  }
});
