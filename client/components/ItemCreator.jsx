ItemCreator = React.createClass({
  render() {
    return (
      <div className="item-create">
        <ItemInput />
        <TagInput tags={this.props.tags} />
      </div>
    );
  }
});
