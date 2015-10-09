Tag = React.createClass({
  render() {
    return (
      <div>
        <input 
	  type="checkbox" 
	  checked={this.props.checked} 
	  onChange={this.props.clicked.bind(null, this.props.tag._id)} 
	/>
        <span className="tag">{this.props.tag.name}</span>
      </div>
    )
  }
});
