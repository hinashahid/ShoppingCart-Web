import api from './../../../app/api';
import {
    ProductListActionTypes,
    ProductListApiEndpoints,
    fetchProductsList
} from './thunks';
import { ProductListState } from './types';
afterEach(() => {
  jest.clearAllMocks();
});


const defaultState: ProductListState = {
    isLoading: false,
    products:[
        {
            id: 'string',
            name: 'string',
            unitPrice: 1,
            imageUrl: 'string',
        },
    ],
    hasErrors: false,
    errorMessage: ''
  };

describe('fetchProductsList', () => {
  it('should dispatch request and get products from the correct api', async () => {
    // arrange
    const dispatch = jest.fn();
    const spy = jest.spyOn(api, 'get').mockResolvedValue(Promise.resolve());

    // act
    fetchProductsList()(dispatch, () => defaultState, '');

    // assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toStrictEqual(`${ProductListApiEndpoints.fetchProductsList}`);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch.mock.calls[0][0].type).toStrictEqual(`${ProductListActionTypes.FetchProductsList}/pending`);
  });
});
