import { render, screen } from '@testing-library/react';
import {ProductList} from './ProductList';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store, AnyAction } from '@reduxjs/toolkit';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));
const mockStore = configureStore([]);
describe('ProductList', () => {
    let store: Store<any, AnyAction>;    
  test('renders ProductList component when loading', () => {
    store = mockStore({
        products:{
            products: [],
            isLoading: true,
            hasErrors: false,
            errorMessage:'',
      },
      countrySelector:{}
    });
    store.dispatch = jest.fn();

    render(<Provider store={store}>
        <ProductList />
      </Provider>);

    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });
  test('renders ProductList component with products', () => {
    store = mockStore({
        products: {
            products: [{
                id: 'id1',
                name: 'product1',
                unitPrice: 1,
                imageUrl: 'test',
            }],
            isLoading: false,
            hasErrors: false,
            errorMessage:'',
      },
      countrySelector:{}
    });
    store.dispatch = jest.fn();

    render(<Provider store={store}>
        <ProductList />
      </Provider>);

    expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
    expect(screen.getByText(/Products/)).toBeInTheDocument();
  });
});