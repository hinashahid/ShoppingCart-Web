import { render, screen } from '@testing-library/react';
import {CountrySelector} from './CountrySelector';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store, AnyAction } from '@reduxjs/toolkit';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));
const mockStore = configureStore([]);
describe('CountrySelector', () => {
    let store: Store<any, AnyAction>;
    beforeEach(() => {
        store = mockStore({
            countrySelector: {
                countries:[],
                selectedCountry: undefined,
                isLoading: false,
            },
        });
        store.dispatch = jest.fn();
    });
  test('renders Country component when loading', () => {
    store = mockStore({
        countrySelector: {
            countries:[],
            selectedCountry: undefined,
            isLoading: true,
        },
    });
    store.dispatch = jest.fn();

    render(<Provider store={store}>
        <CountrySelector />
      </Provider>);

    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });
  test('renders Country component with countries', () => {
    store = mockStore({
        countrySelector: {
            countries: [{
              id: 1,
              name: 'Australia',
              currency: 'AUD',
              symbol: '$',
              exchangeRate: 1,
            }],
            selectedCountry: {
              id: 1,
              name: 'Australia',
              currency: 'AUD',
              symbol: '$',
              exchangeRate: 1,
            },
            isLoading: false,
            hasErrors: false,
            errorMessage:'',
          },
    });
    store.dispatch = jest.fn();

    render(<Provider store={store}>
        <CountrySelector />
      </Provider>);

    expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
    expect(screen.getByText(/Choose a country/)).toBeInTheDocument();
  });
});