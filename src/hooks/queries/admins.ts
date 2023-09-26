import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import Api from 'types/client';
import {
  addAdminService,
  blockAdminService,
  deleteAdminService,
  getAdminUsersService,
  getSingleAdminService,
  unBlockAdminService
} from 'services';

export const useGetAdminUsers = (
  payload: Api.Admins.GetAllUsers.Request,
  options?: UseQueryOptions<Api.Admins.GetAllUsers.Response, AxiosError<Api.Responses.Error>>
) => {
  return useQuery<Api.Admins.GetAllUsers.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['getAdminUsers', payload.PageNumber, payload.PageSize],
    queryFn: () => getAdminUsersService(payload),
    ...options
  });
};

export const useGetSingleAdmin = (
  payload: Api.Admins.GetSingleAdmin.Request,
  options?: UseQueryOptions<Api.Admins.GetSingleAdmin.Response, AxiosError<Api.Responses.Error>>
) => {
  return useQuery<Api.Admins.GetSingleAdmin.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['getSingleAdmin', payload.id],
    queryFn: () => getSingleAdminService(payload),
    ...options
  });
};

export const useAddAdmin = (
  options?: Omit<
    UseMutationOptions<
      Api.Admins.AddAdmin.Response,
      AxiosError<Api.Responses.Error>,
      Api.Admins.AddAdmin.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Admins.AddAdmin.Response,
    AxiosError<Api.Responses.Error>,
    Api.Admins.AddAdmin.Request
  >('addAdmin', addAdminService, options);
};

export const useBlockAdmin = (
  options?: Omit<
    UseMutationOptions<
      Api.Admins.BlockAdmin.Response,
      AxiosError<Api.Responses.Error>,
      Api.Admins.BlockAdmin.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Admins.BlockAdmin.Response,
    AxiosError<Api.Responses.Error>,
    Api.Admins.BlockAdmin.Request
  >('blockAdmin', blockAdminService, options);
};

export const useUnBlockAdmin = (
  options?: Omit<
    UseMutationOptions<
      Api.Admins.UnBlockAdmin.Response,
      AxiosError<Api.Responses.Error>,
      Api.Admins.UnBlockAdmin.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Admins.UnBlockAdmin.Response,
    AxiosError<Api.Responses.Error>,
    Api.Admins.UnBlockAdmin.Request
  >('unBlockAdmin', unBlockAdminService, options);
};

export const useDeleteAdmin = (
  options?: Omit<
    UseMutationOptions<
      Api.Admins.DeleteAdmin.Response,
      AxiosError<Api.Responses.Error>,
      Api.Admins.DeleteAdmin.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Admins.DeleteAdmin.Response,
    AxiosError<Api.Responses.Error>,
    Api.Admins.DeleteAdmin.Request
  >('deleteAdmin', deleteAdminService, options);
};
