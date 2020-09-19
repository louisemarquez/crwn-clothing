import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.component.jsx';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import './collections-overview.styles.scss';

const CollectionsOverview = ({ collections }) => (
    <div className = 'collections-overview'>
    {collections.map(({ id, ...otherCollecitonProps }) => (
        <CollectionPreview key= {id} {...otherCollecitonProps} />
    ))}
    </div>
);

const mapsStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapsStateToProps)(CollectionsOverview);

