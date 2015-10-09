Meteor.publish('items', function(tags) {
  return Items.find({owner: this.userId})
});

Meteor.publish('tags', function() {
  return Tags.find({owner: this.userId})
});

