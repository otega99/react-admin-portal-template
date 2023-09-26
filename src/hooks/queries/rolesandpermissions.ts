import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import {
    getAllRoles
} from 'services';
import Api from 'types/client';

export const useGetAllRoles = (
  payload: string,
  options?: UseQueryOptions< Api.RolesAndPermissions.Permission[], AxiosError<Api.Responses.Error>>
) => {
  return useQuery<any, AxiosError<Api.Responses.Error>>({
    queryKey: ['getRoles'],
    queryFn: () => getAllRoles(payload) ,
    ...options
  });
};
