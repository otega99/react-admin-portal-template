import { addTokenHeader, AxiosConfig, RequestConfig } from 'config/AxiosConfig';
import { AxiosResponse } from 'axios';
import Api from 'types/client';

export const adminLoginService = async (
  payload: Api.Admin.Login.Request,
  config?: RequestConfig<Api.Admin.Login.Request>
) => {
  return AxiosConfig.post<
    Api.Admin.Login.Response,
    AxiosResponse<Api.Admin.Login.Response>,
    Api.Admin.Login.Request
  >('/api/Admins/Login', payload, config).then((res) => res.data);
};

export const adminForgotPwdService = async (
  payload: Api.Admin.ForgotPassword.Request,
  config?: RequestConfig<Api.Admin.ForgotPassword.Request>
) => {
  const encodedEmail = encodeURIComponent(payload.emailAddress);
  return AxiosConfig.post<
    Api.Admin.ForgotPassword.Response,
    AxiosResponse<Api.Admin.ForgotPassword.Response>
  >(`/api/Admins/ForgotPassword?emailAddress=${encodedEmail}`, {}, config).then((res) => res.data);
};

export const adminResetPwdService = async (
  payload: Api.Admin.ResetPassword.Request,
  config?: RequestConfig<Api.Admin.ResetPassword.Request>
) => {
  const payload2: FormData = new FormData();

  payload2.append('ConfirmPassword', payload.ConfirmPassword);
  payload2.append('Password', payload.Password);
  payload2.append('Token', payload.Token);

  return AxiosConfig.patch<
    Api.Admin.ResetPassword.Response,
    AxiosResponse<Api.Admin.ResetPassword.Response>
  >(`/api/Admins/ResetPassword`, payload2, config).then((res) => res.data);
};

export const adminCurrentUser = async (payload: Api.Admin.CurrentUser.Request) => {
  const configWithToken = addTokenHeader(payload.token);

  return AxiosConfig.get<
    Api.Admin.CurrentUser.Response,
    AxiosResponse<Api.Admin.CurrentUser.Response>
  >(`/api/Admin/GetCurrentUser`, configWithToken).then((res) => res.data);
};

export const adminChangePwdService = async (payload: Api.Admin.ChangePassword.Request) => {
  const configWithToken = addTokenHeader(payload.token);

  const payload2 = {
    emailAddress: payload.emailAddress,
    oldPassword: payload.oldPassword,
    password: payload.password,
    confirmPassword: payload.confirmPassword
  };
  return AxiosConfig.patch<
    Api.Admin.ChangePassword.Response,
    AxiosResponse<Api.Admin.ChangePassword.Response>
  >(`/api/Admins/ChangePassword`, payload2, configWithToken).then((res) => res.data);
};

export const adminUpdateAdminService = async (payload: Api.Admin.UpdateAdmin.Request) => {
  const configWithToken = addTokenHeader(payload.token);

  const payload2 = {
    emailAddress: payload.emailAddress,
    phoneNumber: payload.phoneNumber,
    address: payload.address
  };
  return AxiosConfig.patch<
    Api.Admin.ChangePassword.Response,
    AxiosResponse<Api.Admin.ChangePassword.Response>
  >(`/api/Admins/UpdateAdmin`, payload2, configWithToken).then((res) => res.data);
};
