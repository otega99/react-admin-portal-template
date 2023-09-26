import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import {
  adminChangePwdService,
  adminCurrentUser,
  adminForgotPwdService,
  adminLoginService,
  adminResetPwdService,
  adminUpdateAdminService
} from 'services';
import Api from 'types/client';

export const useAdminLogin = (
  options?: Omit<
    UseMutationOptions<
      Api.Admin.Login.Response,
      AxiosError<Api.Responses.Error>,
      Api.Admin.Login.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Admin.Login.Response,
    AxiosError<Api.Responses.Error>,
    Api.Admin.Login.Request
  >('adminLogin', adminLoginService, options);
};

export const useAdminForgotPwd = (
  options?: Omit<
    UseMutationOptions<
      Api.Admin.ForgotPassword.Response,
      AxiosError<Api.Responses.Error>,
      Api.Admin.ForgotPassword.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Admin.ForgotPassword.Response,
    AxiosError<Api.Responses.Error>,
    Api.Admin.ForgotPassword.Request
  >('adminForgotPwd', adminForgotPwdService, options);
};

export const useAdminResetPwd = (
  options?: Omit<
    UseMutationOptions<
      Api.Admin.ResetPassword.Response,
      AxiosError<Api.Responses.Error>,
      Api.Admin.ResetPassword.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Admin.ResetPassword.Response,
    AxiosError<Api.Responses.Error>,
    Api.Admin.ResetPassword.Request
  >('adminResetPwd', adminResetPwdService, options);
};

export const useGetCurrentUser = (
  payload: Api.Admin.CurrentUser.Request,
  options?: UseQueryOptions<Api.Admin.CurrentUser.Response, AxiosError<Api.Responses.Error>>
) => {
  return useQuery<Api.Admin.CurrentUser.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['getAdminUsers', payload.token],
    queryFn: () => adminCurrentUser(payload),
    ...options
  });
};

export const useAdminChangePwd = (
  options?: Omit<
    UseMutationOptions<
      Api.Admin.ChangePassword.Response,
      AxiosError<Api.Responses.Error>,
      Api.Admin.ChangePassword.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Admin.ChangePassword.Response,
    AxiosError<Api.Responses.Error>,
    Api.Admin.ChangePassword.Request
  >('adminChangePwd', adminChangePwdService, options);
};

export const useAdminUpdate = (
  options?: Omit<
    UseMutationOptions<
      Api.Admin.UpdateAdmin.Response,
      AxiosError<Api.Responses.Error>,
      Api.Admin.UpdateAdmin.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Admin.UpdateAdmin.Response,
    AxiosError<Api.Responses.Error>,
    Api.Admin.UpdateAdmin.Request
  >('adminUpdate', adminUpdateAdminService, options);
};
