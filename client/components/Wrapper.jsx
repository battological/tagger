Wrapper = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: Items.find({}, { sort: { name: 1 } }).fetch(),
      tags: Tags.find({}, { sort: { name: 1 } }).fetch(),
      currentUser: Meteor.user()
    }
  },

  render() {
    return <App data={this.data} />
  }
});
