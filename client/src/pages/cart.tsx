import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Loading, Header } from '../components';
import { BookTrips, CartItem } from '../containers';
import { RouteComponentProps } from '@reach/router';
import * as GetCartItemsTypes from './__generated__/GetCartItems';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

interface CartProps extends RouteComponentProps {}

const Cart: React.FC<CartProps> = () => {
  const { data, loading, error } = useQuery<GetCartItemsTypes.GetCartItems>(
    GET_CART_ITEMS
  );

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <React.Fragment>
      <Header>My Cart</Header>
      {!data || (!!data && data.cartItems.length === 0) ? (
        <p data-testid="empty-message">No items in your cart</p>
      ) : (
        <React.Fragment>
          {!!data &&
            data.cartItems.map((launchId) => (
              <CartItem key={launchId} launchId={launchId} />
            ))}
          <BookTrips cartItems={!!data ? data.cartItems : []} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Cart;
