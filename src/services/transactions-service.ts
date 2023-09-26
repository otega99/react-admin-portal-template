import { addTokenHeader, AxiosConfig } from 'config/AxiosConfig';
import { AxiosResponse } from 'axios';
import Api from 'types/client';

export const getTransactionsService = async (payload: Api.Transactions.GetTransactions.Request) => {
  const configWithToken = addTokenHeader(payload.token);
  return AxiosConfig.get<
    Api.Transactions.GetTransactions.Response,
    AxiosResponse<Api.Transactions.GetTransactions.Response>
  >(
    `/api/Transactions/GetAllTransactions?PageNumber=${payload.PageNumber}&PageSize=${payload.PageSize}`,
    configWithToken
  ).then((res) => res.data);
};

export const getTransactionsByOwnerIdService = async (
  payload: Api.Transactions.GetTransactionsByOwnerId.Request
) => {
  const configWithToken = addTokenHeader(payload.token);
  return AxiosConfig.get<
    Api.Transactions.GetTransactionsByOwnerId.Response,
    AxiosResponse<Api.Transactions.GetTransactionsByOwnerId.Response>
  >(
    `/api/Transactions/GetUserTransactions?PageNumber=${payload.PageNumber}&PageSize=${payload.PageSize}&ownerId=${payload.id}`,
    configWithToken
  ).then((res) => res.data);
};

export const getSingleTransactionService = async (
  payload: Api.Transactions.GetSingleTransaction.Request
) => {
  const configWithToken = addTokenHeader(payload.token);
  return AxiosConfig.get<
    Api.Transactions.GetSingleTransaction.Response,
    AxiosResponse<Api.Transactions.GetSingleTransaction.Response>
  >(
    `/api/Transactions/GetTransactionByReference?txRef=${payload.txRef}
    `,
    configWithToken
  ).then((res) => res.data);
};

export const approveTransactionService = async (
  payload: Api.Transactions.ApproveTransaction.Request
) => {
  const configWithToken = addTokenHeader(payload.token);
  return AxiosConfig.post<
    Api.Transactions.ApproveTransaction.Response,
    AxiosResponse<Api.Transactions.ApproveTransaction.Response>
  >(`/api/Transactions/ApproveTransaction?txRef=${payload.txRef}`, {}, configWithToken).then(
    (res) => res.data
  );
};

export const cancelTransactionService = async (
  payload: Api.Transactions.CancelTransaction.Request
) => {
  const configWithToken = addTokenHeader(payload.token);

  const payload2 = {
    reason: payload.reason
  };
  return AxiosConfig.post<
    Api.Transactions.CancelTransaction.Response,
    AxiosResponse<Api.Transactions.CancelTransaction.Response>
  >(`/api/Transactions/CancelTransaction?txRef=${payload.txRef}`, payload2, configWithToken).then(
    (res) => res.data
  );
};

export const getRecentExchangeOrdersService = async (
  payload: Api.Transactions.RecentExchangeOrders.Request
) => {
  const configWithToken = addTokenHeader(payload.token);
  return AxiosConfig.get<
    Api.Transactions.RecentExchangeOrders.Response,
    AxiosResponse<Api.Transactions.RecentExchangeOrders.Response>
  >(`/api/Transactions/RecentExchangeOrders`, configWithToken).then((res) => res.data);
};
