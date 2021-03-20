import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';


const ShopPage = ({fetchCollectionsStart, match }) =>  {
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

        return (
            <div className= 'shop-page'>
                <Route exact path= {`${match.path}`} 
                component={CollectionsOverviewContainer}
                />

                <Route path={`${match.path}/:collectionId`}
                component= {CollectionPageContainer}
               /* render = {props => (
                    <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />
                     REMEMBER: The value will be inverted compared to what isLoading is expecting. 
                    - If our collection is not laoded, we want to pass that the isLoading is TRUE.
                    - We want to tell our spinner to render
                    - So we actually need to reverse this value

                    -  if we pass false into isLoading, we're just going to render a wrapper because our collections
                    page withSpinner only renders IF isLoading IS TRUE.
                    - which means that if there is no collection, we want to tell that it's true so that
                    it renders the spinner.
                    */
                />
                </div>
            );
    }
 

 const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
 });

export default connect (null, mapDispatchToProps)(ShopPage);