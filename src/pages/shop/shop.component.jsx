import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    componentDidMount () {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    render () {
        const { match, isFetchingCollections, isCollectionsLoaded } = this.props;

        return (
            <div className= 'shop-page'>
                <Route exact path= {`${match.path}`} 
                render = {props => (
                    <CollectionsOverviewWithSpinner isLoading={isFetchingCollections} {...props} />
                )}
                />

                <Route path={`${match.path}/:collectionId`}
                render = {props => (
                    <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />
                    /* REMEMBER: The value will be inverted compared to what isLoading is expecting. 
                    - If our collection is not laoded, we want to pass that the isLoading is TRUE.
                    - We want to tell our spinner to render
                    - So we actually need to reverse this value

                    -  if we pass false into isLoading, we're just going to render a wrapper because our collections
                    page withSpinner only renders IF isLoading IS TRUE.
                    - which means that if there is no collection, we want to tell that it's true so that
                    it renders the spinner.
                    */
                )}
                />
                </div>
            );
    }
 } 

 const mapStateToProps = createStructuredSelector({
     isFetchingCollections: selectIsCollectionFetching,
     isCollectionsLoaded: selectIsCollectionsLoaded
 });

 const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
 });

export default connect (mapStateToProps, mapDispatchToProps)(ShopPage);