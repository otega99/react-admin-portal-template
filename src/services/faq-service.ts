import { addTokenHeader, AxiosConfig } from 'config/AxiosConfig';
import { AxiosResponse } from 'axios';
import Api from 'types/client';

export const getFaqsService = async (payload: Api.Faq.GetFaqs.Request) => {
  const configWithToken = addTokenHeader(payload.token);
  const { PageNumber, PageSize = 15 } = payload;
  return AxiosConfig.get<Api.Faq.GetFaqs.Response, AxiosResponse<Api.Faq.GetFaqs.Response>>(
    `/api/Faq?PageNumber=${PageNumber}&PageSize=${PageSize}`,
    configWithToken
  ).then((res) => res.data);
};

export const getSingleFaqService = async (payload: Api.Faq.GetSingleFaq.Request) => {
  const configWithToken = addTokenHeader(payload.token);
  const { id } = payload;
  return AxiosConfig.get<
    Api.Faq.GetSingleFaq.Response,
    AxiosResponse<Api.Faq.GetSingleFaq.Response>
  >(`/api/Faq/id?id=${id}`, configWithToken).then((res) => res.data);
};

export const addFaqService = async (payload: Api.Faq.PostFaq.Request) => {
  const configWithToken = addTokenHeader(payload.token, 'formData');

  const payload2: FormData = new FormData();

  payload2.append('CoverImage', payload.CoverImage);
  payload2.append('Title', payload.Title);
  payload2.append('Body', payload.Body);

  return AxiosConfig.post<Api.Faq.PostFaq.Response, AxiosResponse<Api.Faq.PostFaq.Response>>(
    '/api/Faq',
    payload2,
    configWithToken
  ).then((res) => res.data);
};

export const deleteFaqService = async (payload: Api.Faq.DeleteFaq.Request) => {
  const configWithToken = addTokenHeader(payload.token);
  const { id } = payload;
  return AxiosConfig.delete<Api.Faq.DeleteFaq.Response, AxiosResponse<Api.Faq.DeleteFaq.Response>>(
    `/api/Faq/${id}`,
    configWithToken
  ).then((res) => res.data);
};

export const updateFaqService = async (payload: Api.Faq.UpdateFaq.Request) => {
  const configWithToken = addTokenHeader(payload.token, 'formData');

  const payload2: FormData = new FormData();

  payload2.append('CoverImage', payload.CoverImage);
  payload2.append('Title', payload.Title);
  payload2.append('Body', payload.Body);

  return AxiosConfig.patch<Api.Faq.UpdateFaq.Response, AxiosResponse<Api.Faq.UpdateFaq.Response>>(
    `/api/Faq?id=${payload.id}`,
    payload2,
    configWithToken
  ).then((res) => res.data);
};
