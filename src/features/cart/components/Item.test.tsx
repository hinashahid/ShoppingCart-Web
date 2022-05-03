import { render, screen } from '@testing-library/react';
import {Item, Props} from './Item';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store, AnyAction } from '@reduxjs/toolkit';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));
const mockStore = configureStore([]);
describe('CartItem', () => {
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
  test('renders Item component', () => {
      const props: Props = {
        item: {
            product: {
                id: '1',
                name: 'product1',
                unitPrice: 1,
                imageUrl: 'test',
            },
            quantity: 1,
            totalPrice: 1,
        },
        key :'1'
      };
    render(<Provider store={store}>
        <Item {...props}/>
      </Provider>);

    expect(screen.getByText(/product1/)).toBeInTheDocument();
  });  
});