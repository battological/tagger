ItemInput = React.createClass({
  render() {
    return (
      <form className="new-item" onSubmit={this.handleSubmit}>
        <input type="text" ref="itemInput" placeholder="New item" />
      </form>
    );
  }
});
