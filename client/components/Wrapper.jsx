Wrapper = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: Items.find({}).fetch(),
      tags: Tags.find({}).fetch(),
      currentUser: Meteor.user()
    }
  },

  render() {
    return <App data={this.data} />
  }
});
