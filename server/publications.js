Meteor.publish("items", function(tags) {
  return Items.find({})
});

Meteor.publish("tags", function() {
  return Tags.find({})
});

