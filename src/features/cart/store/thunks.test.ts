import api from './../../../app/api';
import {
  CartActionTypes,
  CartApiEndpoints,
  calculateShippingCost,
  placeOrder,
} from './thunks';
import { CartState, OrderPayload } from './types';
afterEach(() => {
  jest.clearAllMocks();
});


const defaultState: CartState = {
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

describe('calculateShippingCost', () => {
  it('should dispatch request and get cost from the correct api', async () => {
    // arrange
    const dispatch = jest.fn();
    const payload = 10;

    const spy = jest.spyOn(api, 'get').mockResolvedValue(Promise.resolve({ data: payload }));

    // act
    calculateShippingCost(payload)(dispatch, () => defaultState, '');

    // assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toStrictEqual(`${CartApiEndpoints.calculateShippingCost}?totalCost=${payload}`);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch.mock.calls[0][0].type).toStrictEqual(`${CartActionTypes.CalculateShippingCost}/pending`);
  });
});

describe('placeOrder', () => {
    it('should dispatch request and place order from the correct api', async () => {
      // arrange
      const dispatch = jest.fn();
      const payload : OrderPayload = {
        items: [
            {
                product: {
                    id:'1',
                    name:'product1',
                    imageUrl:'test',
                    unitPrice:10
                },
                quantity:1,
                totalPrice:10
            }
        ],
        shippingCost: 10,
        totalCost: 20,
        currency: 'AUD',
        exchangeRate: 1,
      };
  
      const spy = jest.spyOn(api, 'post').mockResolvedValue(Promise.resolve({ data: payload }));
  
      // act
      placeOrder(payload)(dispatch, () => defaultState, '');
  
      // assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toStrictEqual(`${CartApiEndpoints.placeOder}`);
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch.mock.calls[0][0].type).toStrictEqual(`${CartActionTypes.PlaceOrder}/pending`);
    });
  });
  

