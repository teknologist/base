import React from 'react';
TagsList = React.createClass({
  mixins: [ TrackerReact ],
  getMeteorData() {
    let handle = Meteor.subscribe( 'tags' );

    return {
      currentUser: Meteor.user(),
      columns: [

        { width: '20%', label: 'Name', className: '' },
        { width: '30%', label: 'Description', className: 'text-center' },
        { width: '33%', label: 'Synonyms', className: 'text-center' },
        { width: '25%', label: 'Created At', className: 'text-center' }
      ],
      tags: Tags.find( { }, { sort: { name: 1 } } ).fetch()

    };
  },
  render() {
    return <div className="tags">
      <PageHeader label="Tags" />
      { this.getMeteorData().tags ?
        <Table context="tags" columns={ this.getMeteorData().columns }>
          { this.getMeteorData().tags.map( ( tag ) => {
            return <TagRow key={ tag._id } tag={ tag } />;
          })}
        </Table>
        : <Loading />}

            <PageHeader label="Add a new Tag" />
        <QuickFormWrapper collection="Tags" id="insertTagForm" type="method" meteormethod="submitTag" fields="name,description,synonyms"/>
    </div>

    ;
  }
});
