import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => 
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>
  createSelector(
      [selectCollections], 
      collections => (collections ? collections[collectionUrlParam] : null)
    );

 
    export const selectIsCollectionFetching = 
    createSelector(
        [selectShop],
        shop => shop.isFetching
    );


    export const selectIsCollectionsLoaded = createSelector(
        [selectShop],
        shop => !!shop.collections

        /* Our selector checks to see if our collections is loaded.
        If there is no collections then the Collectionsloaded is false.
        - it's not true that our collection is loaded.
        - Our selectIsCollectionsLoaded will be false if there no collections 
        */
    )