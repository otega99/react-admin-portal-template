import { addTokenHeader, AxiosConfig } from 'config/AxiosConfig';
import { AxiosResponse } from 'axios';
import Api from 'types/client';

export const getAdminUsersService = async (payload: Api.Admins.GetAllUsers.Request) => {
  const { PageNumber, PageSize = 15 } = payload;
  const configWithToken = addTokenHeader(payload.token);

  return AxiosConfig.get<
    Api.Admins.GetAllUsers.Response,
    AxiosResponse<Api.Admins.GetAllUsers.Response>
  >(`/api/Admins/GetAllAdmins?PageNumber=${PageNumber}&PageSize=${PageSize}`, configWithToken).then(
    (res) => res.data
  );
};

export const getSingleAdminService = async (payload: Api.Admins.GetSingleAdmin.Request) => {
  const configWithToken = addTokenHeader(payload.token);

  return AxiosConfig.get<
    Api.Admins.GetSingleAdmin.Response,
    AxiosResponse<Api.Admins.GetSingleAdmin.Response>
  >(`/api/Admins/GetAdminById/${payload.id}`, configWithToken).then((res) => res.data);
};

export const addAdminService = async (payload: Api.Admins.AddAdmin.Request) => {
  const configWithToken = addTokenHeader(payload.token, 'formData');
  const payload2: FormData = new FormData();

  payload2.append('ProfilePicture', payload.ProfilePicture);
  payload2.append('EmailAddress', payload.EmailAddress);
  payload2.append('PhoneNumber', payload.PhoneNumber);
  payload2.append('FirstName', payload.FirstName);
  payload2.append('LastName', payload.LastName);
  payload2.append('Address', payload.Address);
  payload2.append('Password', payload.Password);
  payload2.append('RoleId',payload.RoleId.toString())

  return AxiosConfig.post<
    Api.Admins.AddAdmin.Response,
    AxiosResponse<Api.Admins.AddAdmin.Response>
  >(`/api/Admins/AddAdmin`, payload2, configWithToken).then((res) => res.data);
};

export const blockAdminService = async (payload: Api.Admins.BlockAdmin.Request) => {
  const configWithToken = addTokenHeader(payload.token);

  return AxiosConfig.patch<
    Api.Admins.BlockAdmin.Response,
    AxiosResponse<Api.Admins.BlockAdmin.Response>
  >(`/api/Admins/BlockAdmin/${payload.id}`, {}, configWithToken).then((res) => res.data);
};

export const unBlockAdminService = async (payload: Api.Admins.UnBlockAdmin.Request) => {
  const configWithToken = addTokenHeader(payload.token);

  return AxiosConfig.patch<
    Api.Admins.UnBlockAdmin.Response,
    AxiosResponse<Api.Admins.UnBlockAdmin.Response>
  >(`/api/Admins/UnBlockAdmin/${payload.id}`, {}, configWithToken).then((res) => res.data);
};

export const deleteAdminService = async (payload: Api.Admins.DeleteAdmin.Request) => {
  const configWithToken = addTokenHeader(payload.token);

  return AxiosConfig.delete<
    Api.Admins.DeleteAdmin.Response,
    AxiosResponse<Api.Admins.DeleteAdmin.Response>
  >(`/api/Admins/DeleteAdmin/${payload.id}`, configWithToken).then((res) => res.data);
};
