import { selectCart } from './selectors';

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
      items: [{
          product: {
              id: 'string',
              name: 'string',
              unitPrice: 1,
              imageUrl: 'string',
          },
          quantity: 1,
          totalPrice: 1,
      }],
      shippingCost: 1,
      totalCost: 1,
      orderSuccessful: false,
      hasErrors: false,
      errorMessage: ''
    },
    countrySelector:{
      countries: [],
      selectedCountry: undefined,
      isLoading: false,
      hasErrors: false,
      errorMessage:'',
    }
  };

  it('selectCart should select state.cart', () => {
    
    const expectedOutput = 
    {
      isLoading: false,
      items: [{
          product: {
              id: 'string',
              name: 'string',
              unitPrice: 1,
              imageUrl: 'string',
          },
          quantity: 1,
          totalPrice: 1,
      }],
      shippingCost: 1,
      totalCost: 1,
      orderSuccessful: false,
      hasErrors: false,
      errorMessage: ''
  };
  expect(selectCart(mockState)).toEqual(expectedOutput)
  });
});
