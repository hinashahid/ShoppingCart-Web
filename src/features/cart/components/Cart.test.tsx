import React from 'react';
import { render, screen } from '@testing-library/react';
import {Cart} from './Cart';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store, AnyAction } from '@reduxjs/toolkit';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));
const mockStore = configureStore([]);
describe('Cart', () => {
    let store: Store<any, AnyAction>;
    beforeEach(() => {
        store = mockStore({
            cart: {
                items:[]
            },
            countrySelector:{}
        });
        store.dispatch = jest.fn();
    });
  test('renders Cart component with no items when state does not have any items', () => {
    render(<Provider store={store}>
        <Cart />
      </Provider>);

    expect(screen.getByText(/Cart/)).toBeInTheDocument();
    expect(screen.getByText(/There are no items in the cart./)).toBeInTheDocument();
  });
  test('renders Cart component with items from state', () => {
    store = mockStore({
        cart: {
            items:[{
                product: {
                    id: '1',
                    name: 'test',
                    unitPrice: 1,
                    imageUrl: 'test',
                },
                quantity: 1,
                totalPrice: 1,
            }]
        },
        countrySelector:{},
    });
    

    store.dispatch = jest.fn();

    render(<Provider store={store}>
        <Cart />
      </Provider>);

    expect(screen.getByText(/Cart/)).toBeInTheDocument();
    expect(screen.queryByText(/There are no items in the cart./)).not.toBeInTheDocument();
  });
});