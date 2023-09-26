import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import Api from 'types/client';
import {
  getCurrenciesService,
  getDashboardCurrenciesService,
  getSingleCurrencyService,
  updateCurrencyService
} from 'services';

export const useGetCurrencies = (
  payload: Api.Currencies.GetCurrencies.Request,
  options?: UseQueryOptions<Api.Currencies.GetCurrencies.Response, AxiosError<Api.Responses.Error>>
) => {
  return useQuery<Api.Currencies.GetCurrencies.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['getCurrencies', payload.PageNumber, payload.PageSize],
    queryFn: () => getCurrenciesService(payload),
    ...options
  });
};

export const useGetSingleCurrency = (
  payload: Api.Currencies.GetSingleCurrency.Request,
  options?: UseQueryOptions<
    Api.Currencies.GetSingleCurrency.Response,
    AxiosError<Api.Responses.Error>
  >
) => {
  return useQuery<Api.Currencies.GetSingleCurrency.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['getSingleCurrency', payload.id],
    queryFn: () => getSingleCurrencyService(payload),
    ...options
  });
};

export const useUpdateCurrency = (
  options?: Omit<
    UseMutationOptions<
      Api.Currencies.UpdateCurrency.Response,
      AxiosError<Api.Responses.Error>,
      Api.Currencies.UpdateCurrency.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Currencies.UpdateCurrency.Response,
    AxiosError<Api.Responses.Error>,
    Api.Currencies.UpdateCurrency.Request
  >('updateCurrency', updateCurrencyService, options);
};

export const useGetDashboardCurrencies = (
  payload: Api.Currencies.GetDashboardCurrencies.Request,
  options?: UseQueryOptions<
    Api.Currencies.GetDashboardCurrencies.Response,
    AxiosError<Api.Responses.Error>
  >
) => {
  return useQuery<Api.Currencies.GetDashboardCurrencies.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['getDashboardCurrencies', payload.token],
    queryFn: () => getDashboardCurrenciesService(payload),
    ...options
  });
};
