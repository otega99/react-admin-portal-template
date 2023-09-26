import { addTokenHeader, AxiosConfig } from 'config/AxiosConfig';
import { AxiosResponse } from 'axios';
import Api from 'types/client';

export const getCurrenciesService = async (payload: Api.Currencies.GetCurrencies.Request) => {
  const { PageNumber, PageSize = 15 } = payload;
  const configWithToken = addTokenHeader(payload.token);

  return AxiosConfig.get<
    Api.Currencies.GetCurrencies.Response,
    AxiosResponse<Api.Currencies.GetCurrencies.Response>
  >(
    `/api/Currencies/GetAllCurrencies?PageNumber=${PageNumber}&PageSize=${PageSize}`,
    configWithToken
  ).then((res) => res.data);
};

export const getSingleCurrencyService = async (
  payload: Api.Currencies.GetSingleCurrency.Request
) => {
  const configWithToken = addTokenHeader(payload.token);

  return AxiosConfig.get<
    Api.Currencies.GetSingleCurrency.Response,
    AxiosResponse<Api.Currencies.GetSingleCurrency.Response>
  >(`/api/Currencies/GetCurrencyById/${payload.id}`, configWithToken).then((res) => res.data);
};

export const updateCurrencyService = async (payload: Api.Currencies.UpdateCurrency.Request) => {
  const configWithToken = addTokenHeader(payload.token);

  const payload2 = {
    type: payload.type,
    currency: payload.currency,
    buyRate: payload.buyRate,
    sellRate: payload.sellRate,
    processingFee: payload.processingFee,
    bankFeePercent: payload.bankFeePercent,
    status: payload.status
  };
  return AxiosConfig.patch<
    Api.Admin.ForgotPassword.Response,
    AxiosResponse<Api.Admin.ForgotPassword.Response>
  >(`api/Currencies/UpdateCurrency?id=${payload.id}`, payload2, configWithToken).then(
    (res) => res.data
  );
};

export const getDashboardCurrenciesService = async (
  payload: Api.Currencies.GetDashboardCurrencies.Request
) => {
  const configWithToken = addTokenHeader(payload.token);

  return AxiosConfig.get<
    Api.Currencies.GetDashboardCurrencies.Response,
    AxiosResponse<Api.Currencies.GetDashboardCurrencies.Response>
  >(`/api/Currencies/GetDashBoardCurrencies`, configWithToken).then((res) => res.data);
};
