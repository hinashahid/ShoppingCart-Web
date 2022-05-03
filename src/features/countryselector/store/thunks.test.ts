import api from './../../../app/api';
import {
    CountrySelectorActionTypes,
    CountrySelectorApiEndpoints,
  fetchCountriesList
} from './thunks';
import { CountrySelectorState } from './types';
afterEach(() => {
  jest.clearAllMocks();
});


const defaultState: CountrySelectorState = {
    isLoading: false,
    countries:[
        {
            id:1,
            currency:'AUD',
            exchangeRate:1,
            name:'Australia',
            symbol:'AUD',
        }
    ],
    selectedCountry:{
        id:1,
        currency:'AUD',
        exchangeRate:1,
        name:'Australia',
        symbol:'AUD',
    },
    hasErrors: false,
    errorMessage: ''
  };

describe('fetchCountriesList', () => {
  it('should dispatch request and get countries from the correct api', async () => {
    // arrange
    const dispatch = jest.fn();
    const spy = jest.spyOn(api, 'get').mockResolvedValue(Promise.resolve());

    // act
    fetchCountriesList()(dispatch, () => defaultState, '');

    // assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toStrictEqual(`${CountrySelectorApiEndpoints.fetchCountriesList}`);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch.mock.calls[0][0].type).toStrictEqual(`${CountrySelectorActionTypes.FetchCountriesList}/pending`);
  });
});
