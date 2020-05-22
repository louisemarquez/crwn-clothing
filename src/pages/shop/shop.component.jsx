import React from 'react';

import SHOP_DATA from './shop.data.js';

import CollectionPreview from '/Users/louisemarquez/crwn-clothing/src/components/collection-preview/collection-preview.jsx';

class ShopPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            collections: SHOP_DATA

        };
    }

    render() {
        const {collections} = this.state;
        return (<div className= 'shop-page'>
        {
            collections.map(({ id, ...otherCollecitonProps }) => (
                <CollectionPreview key= {id} {...otherCollecitonProps} />
            ))
        }
        </div>);

    }

}

export default ShopPage;