Meteor.methods({
  /**
   * Adds a new tag to the db
   * @param tag {string} - The tag name
   * @returns {string} - The id of the newly created Tag object in Mongo or the id of the existing Tag object in Mongo
   */
  addTag(tag) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    // Make sure this tag doesn't already exist
    var existing = Tags.find({ owner: Meteor.userId(), name: tag }) 
    if (existing.count() > 0) {
      return existing.fetch()[0]._id;
    }
      
    var insert = Tags.insert({
      name: tag,
      owner: Meteor.userId()
    });

    return insert;
  },

  deleteTag(tag) {
    if (!Meteor.userId() || Meteor.userId() !== tag.owner) {
      throw new Meteor.Error("not-authorized");
    }

    Tags.remove(tag._id);  // delete tag
    Items.update({ tags: tag._id }, { $pull: { tags: tag._id } }, { multi: true });  // remove tag from item tag lists

    Meteor.call("ensureNoEmptyTags");
  },

  /**
   * Adds a new item to the db
   * @param {string} text - The item name
   * @param {string[]} tags - Optional array of id strings representing Tag objects from the Tag collection
   * @returns {ObjectId} - The ID of the newly created Item object in Mongo
   */
  addItem(text, description, tags = []) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var insert = Items.insert({
      name: text,
      tags: tags,
      description: description,
      owner: Meteor.userId()
    });

    Meteor.call("ensureNoEmptyTags");

    return insert;
  },

  /**
   * Associates an existing tag with an existing item
   * @param {string} itemId - The string ID representation of the item to update
   * @param {string} tagId - The string ID representation of the new tag to associate with this Item
   */
  addTaskToItem(itemId, tagId) {
    Items.update(itemId, { $push: { tags: tagId } } );
  },

  updateItem(id, text, description, tags) {
    if (!Meteor.userId() || Meteor.userId() !== Items.findOne({ _id: id }).owner) {
      throw new Meteor.Error("not-authorized");
    }

    var update = Items.update(id, {
      $set: { name: text, description: description, tags: tags }
    });

    Meteor.call("ensureNoEmptyTags");

    return update;
  },

  deleteItem(item) {
    if (!Meteor.userId() || Meteor.userId() !== item.owner) {
      throw new Meteor.Error("not-authorized");
    }

    Items.remove(item._id);
  }, 

  /**
   * Checks for items without associated tags and assigned [no tag] to any it finds
   */
  ensureNoEmptyTags() {
    if (Items.find({ tags: { $size: 0 } }).count()) {  
      var no_tag = Meteor.call("addTag", "[no tag]");
      Items.update({ tags: { $size: 0 }}, { $push: { tags: no_tag } }, { multi: true });
    }
  }

});
