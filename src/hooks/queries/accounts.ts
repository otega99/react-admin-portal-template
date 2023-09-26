import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import {getAccountsService,addAccountService} from 'services';
import Api from 'types/client';


export const useGetAccounts = (
    payload:Api.Accounts.GetAccounts.Request,
    options?: UseQueryOptions<Api.Accounts.GetAccounts.Response, AxiosError<Api.Responses.Error>>
  ) => {
    return useQuery<Api.Accounts.GetAccounts.Response, AxiosError<Api.Responses.Error>>({
      queryKey: 'getAccounts',
      queryFn: () => getAccountsService(payload),
      ...options
    });
  };
  
  export const useAddAccount = (
    options?: Omit<
      UseMutationOptions<
        Api.Accounts.AddAccount.Response,
        AxiosError<Api.Responses.Error>,
        Api.Accounts.AddAccount.Request
      >,
      'mutationKey' | 'mutationFn'
    >
  ) => {
    return useMutation<
      Api.Accounts.AddAccount.Response,
      AxiosError<Api.Responses.Error>,
      Api.Accounts.AddAccount.Request
    >('addAccount', addAccountService, options);
  };
  