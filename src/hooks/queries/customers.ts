import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import Api from 'types/client';
import { getCustomerByIdService, getCustomersService, getNewSubscribersService } from 'services';

export const useGetCustomers = (
  payload: Api.Customers.GetCustomers.Request,
  options?: UseQueryOptions<Api.Customers.GetCustomers.Response, AxiosError<Api.Responses.Error>>
) => {
  return useQuery<Api.Customers.GetCustomers.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['getCustomers', payload.PageNumber, payload.PageSize],
    queryFn: () => getCustomersService(payload),
    ...options
  });
};

export const useGetCustomerById = (
  payload: Api.Customers.GetCustomerById.Request,
  options?: UseQueryOptions<Api.Customers.GetCustomerById.Response, AxiosError<Api.Responses.Error>>
) => {
  return useQuery<Api.Customers.GetCustomerById.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['getCustomerById', payload.id, payload.token],
    queryFn: () => getCustomerByIdService(payload),
    ...options
  });
};

export const useGetNewSubscribers = (
  payload: Api.Customers.GetNewSubscribers.Request,
  options?: UseQueryOptions<
    Api.Customers.GetNewSubscribers.Response,
    AxiosError<Api.Responses.Error>
  >
) => {
  return useQuery<Api.Customers.GetNewSubscribers.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['getNewSubscribers', payload.token],
    queryFn: () => getNewSubscribersService(payload),
    ...options
  });
};
