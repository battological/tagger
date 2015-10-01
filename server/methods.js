Meteor.methods({
  /**
   * Adds a new tag to the db
   * @param tag {string} - The tag name
   * @returns {ObjectId} - The ObjectId of the newly created Tag object in Mongo or the ObjectId of the existing Tag object in Mongo
   */
  addTag(tag) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    // Make sure this tag doesn't already exist
    var existing = Tags.find({ name: tag }) 
    if (existing.count() > 0) {
      return existing.fetch()[0];
    }
      
    var insert = Tags.insert({
      name: tag,
      owner: Meteor.userId()
    });

    return insert;
  },

  /**
   * Adds a new item to the db
   * @param {string} text - The item name
   * @param {ObjectId[]} tags - Optional array of ObjectIds representing Tag objects from the Tag collection
   * @returns {ObjectId} - The ID of the newly created Item object in Mongo
   */
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

  /**
   * Associates an existing tag with an existing item
   * @param {ObjectId} itemId - The ObjectId of the item to update
   * @param {ObjectId} taskId - The ObjectId of the new tag to associate with this Item
   */
  addTaskToItem(itemId, taskId) {
    Items.update(itemId, { $push: { tasks: taskId } } );
  }

});
