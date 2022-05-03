import { selectProducts } from './selectors';

describe('selectors', () => {
  const mockState = {
    products:{
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
      countries: [],
      selectedCountry: undefined,
      isLoading: false,
      hasErrors: false,
      errorMessage:'',
    }
  };

  it('selectProduct should select state.products', () => {
    
    const expectedOutput = 
    {
        products: [{
              id: 'id1',
              name: 'product1',
              unitPrice: 1,
              imageUrl: 'test',
          }],
            isLoading: false,
            hasErrors: false,
            errorMessage:'',
        
    };
  expect(selectProducts(mockState)).toEqual(expectedOutput)
  });
});
