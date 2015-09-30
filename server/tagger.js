Meteor.publish("items", function(tags) {
  return Items.find({ owner: this.userId() })
});

