Meteor.methods({
  addTag(tag) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var insert = Tags.insert({
      name: tag,
      owner: Meteor.userId()
    });

    return insert;
  },

  addItem(text, tags = []) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var insert = Items.insert({
      name: text,
      tags: tags,
      owner: Meteor.userId()
    });

    return insert;
  },

  addTaskToItem(itemId, taskId) {
    Items.update(itemId, { $push: { tasks: taskId } } );
  }

});
