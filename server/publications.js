Meteor.publish('items', function(tags) {
  return Items.find({owner: this.userId});
});

Meteor.publish('tags', function() {
  return Tags.find({owner: this.userId});
});

Meteor.publish('tagClasses', function() {
  return TagClasses.find({owner: this.userId});
});
