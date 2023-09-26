import { addTokenHeader, AxiosConfig } from 'config/AxiosConfig';
import { AxiosResponse } from 'axios';
import Api from 'types/client';

export const getAllRoles = async (  token: string) => {
  
  const configWithToken = addTokenHeader(token);

  return AxiosConfig.get<
    AxiosResponse< Api.RolesAndPermissions.Permission[], Api.RolesAndPermissions.Response>
  >(`/api/Role/GetRoles`, configWithToken).then(
    (res) => res.data
  );
};
