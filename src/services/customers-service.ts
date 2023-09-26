import { addTokenHeader, AxiosConfig } from 'config/AxiosConfig';
import { AxiosResponse } from 'axios';
import Api from 'types/client';

export const getCustomersService = async (payload: Api.Customers.GetCustomers.Request) => {
  const { PageNumber, PageSize = 15 } = payload;
  const configWithToken = addTokenHeader(payload.token);

  return AxiosConfig.get<
    Api.Customers.GetCustomers.Response,
    AxiosResponse<Api.Customers.GetCustomers.Response>
  >(
    `/api/Customer/GetCustomers?PageNumber=${PageNumber}&PageSize=${PageSize}`,
    configWithToken
  ).then((res) => res.data);
};

export const getCustomerByIdService = async (payload: Api.Customers.GetCustomerById.Request) => {
  const { token, id } = payload;
  const configWithToken = addTokenHeader(token);

  return AxiosConfig.get<
    Api.Customers.GetCustomerById.Response,
    AxiosResponse<Api.Customers.GetCustomerById.Response>
  >(`/api/Customer/GetCustomerById?id=${id}`, configWithToken).then((res) => res.data);
};

export const getNewSubscribersService = async (
  payload: Api.Customers.GetNewSubscribers.Request
) => {
  const { token } = payload;
  const configWithToken = addTokenHeader(token);

  return AxiosConfig.get<
    Api.Customers.GetNewSubscribers.Response,
    AxiosResponse<Api.Customers.GetNewSubscribers.Response>
  >(`/api/Customer/GetNewSubscribers`, configWithToken).then((res) => res.data);
};
