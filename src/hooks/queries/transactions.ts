import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import {
  approveTransactionService,
  cancelTransactionService,
  getRecentExchangeOrdersService,
  getSingleTransactionService,
  getTransactionsByOwnerIdService,
  getTransactionsService
} from 'services';
import Api from 'types/client';

export const useGetTransactions = (
  payload: Api.Transactions.GetTransactions.Request,
  options?: UseQueryOptions<
    Api.Transactions.GetTransactions.Response,
    AxiosError<Api.Responses.Error>
  >
) => {
  return useQuery<Api.Transactions.GetTransactions.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['getTransactions', payload.PageNumber, payload.PageSize],
    queryFn: () => getTransactionsService(payload),
    ...options
  });
};

export const useGetTransactionsByOwnerId = (
  payload: Api.Transactions.GetTransactionsByOwnerId.Request,
  options?: UseQueryOptions<
    Api.Transactions.GetTransactionsByOwnerId.Response,
    AxiosError<Api.Responses.Error>
  >
) => {
  return useQuery<
    Api.Transactions.GetTransactionsByOwnerId.Response,
    AxiosError<Api.Responses.Error>
  >({
    queryKey: ['getTransactionsByOwnerId', payload.PageNumber, payload.PageSize],
    queryFn: () => getTransactionsByOwnerIdService(payload),
    ...options
  });
};

export const useGetSingleTransaction = (
  payload: Api.Transactions.GetSingleTransaction.Request,
  options?: UseQueryOptions<
    Api.Transactions.GetSingleTransaction.Response,
    AxiosError<Api.Responses.Error>
  >
) => {
  return useQuery<Api.Transactions.GetSingleTransaction.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['getSingleTransaction', payload.txRef],
    queryFn: () => getSingleTransactionService(payload),
    ...options
  });
};

export const useApproveTransaction = (
  options?: Omit<
    UseMutationOptions<
      Api.Transactions.ApproveTransaction.Response,
      AxiosError<Api.Responses.Error>,
      Api.Transactions.ApproveTransaction.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Transactions.ApproveTransaction.Response,
    AxiosError<Api.Responses.Error>,
    Api.Transactions.ApproveTransaction.Request
  >('approveTransaction', approveTransactionService, options);
};

export const useCancelTransaction = (
  options?: Omit<
    UseMutationOptions<
      Api.Transactions.CancelTransaction.Response,
      AxiosError<Api.Responses.Error>,
      Api.Transactions.CancelTransaction.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Transactions.CancelTransaction.Response,
    AxiosError<Api.Responses.Error>,
    Api.Transactions.CancelTransaction.Request
  >('cancelTransaction', cancelTransactionService, options);
};

export const useGetRecentExchangeOrders = (
  payload: Api.Transactions.RecentExchangeOrders.Request,
  options?: UseQueryOptions<
    Api.Transactions.RecentExchangeOrders.Response,
    AxiosError<Api.Responses.Error>
  >
) => {
  return useQuery<Api.Transactions.RecentExchangeOrders.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['recentExchangeOrders', payload.token],
    queryFn: () => getRecentExchangeOrdersService(payload),
    ...options
  });
};
