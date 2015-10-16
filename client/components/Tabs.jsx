Tabs = React.createClass({
  render() {
    return (
      <nav className="tabs">
        
	<div className="view-tab" onClick={this.props.changeTab.bind(null, 0)}>
	  <a>View</a>
	</div>

        <div className="input-tab" onClick={this.props.changeTab.bind(null, 1)}>
	  <a>Input</a>
	</div>

      </nav>
    )
  }
});
