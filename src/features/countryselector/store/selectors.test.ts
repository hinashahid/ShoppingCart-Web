import { selectCountries } from './selectors';

describe('selectors', () => {
  const mockState = {
    products:{
      products: [],
      isLoading: false,
      hasErrors: false,
      errorMessage:'',
    },
    cart: {
      isLoading: false,
      items: [],
      shippingCost: 1,
      totalCost: 1,
      orderSuccessful: false,
      hasErrors: false,
      errorMessage: ''
    },
    countrySelector:{
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
    }
  };

  it('selectCountries should select state.countries', () => {
    
    const expectedOutput = 
    {
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
    };
  expect(selectCountries(mockState)).toEqual(expectedOutput)
  });
});
