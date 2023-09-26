import { addTokenHeader, AxiosConfig } from 'config/AxiosConfig';
import { AxiosResponse } from 'axios';
import Api from 'types/client';

export const getAccountsService = async (payload: Api.Accounts.GetAccounts.Request) => {
    const configWithToken = addTokenHeader(payload.token);
    return AxiosConfig.get<
      Api.Accounts.GetAccounts.Response,
      AxiosResponse<Api.Accounts.GetAccounts.Response>
    >(
      `/api/OfficeAccounts/GetAccounts`,
      configWithToken
    ).then((res) => res.data);
  };

  export const addAccountService = async (payload: Api.Accounts.AddAccount.Request) => {
    return AxiosConfig.post<
      Api.Accounts.AddAccount.Response,
      AxiosResponse<Api.Accounts.AddAccount.Response>
    >(`/api/OfficeAccounts/AddRole`, payload).then((res) => res.data);
  };