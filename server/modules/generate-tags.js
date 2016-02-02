let tags = [{
    name: 'Habillements',
    description: 'Vetements, chaussures, etc.'

  }, {
    name: 'Loisirs',
    description: 'Loisirs, Hobby, etc.'

  }, {
    name: 'Maison',
    description: 'Arts de la maison, etc.'

  }


];

let generateTags = () => {
  let tagsExist = _checkIfTagsExist(tags.length);

  if (!tagsExist) {
    _createTags(tags);
  }
};

let _checkIfTagsExist = (count) => {
  let TagCount = Tags.find().count();
  return TagCount < count ? false : true;
};

let _createTags = (tags) => {
  for (let i = 0; i < tags.length; i++) {
    let Tag = tags[i],
      TagExists = _checkIfTagExists(Tag.name);

    if (!TagExists) {
      _createTag(Tag);
    }
  }
};

let _checkIfTagExists = (name) => {
  return Tags.findOne({
    'name': name
  });
};

let _createTag = (Tag) => {
  let TagId = Tags.insert({
    name: Tag.name,
    description: Tag.description
  });

};

Modules.server.generateTags = generateTags;
