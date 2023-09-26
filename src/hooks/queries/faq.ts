import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import {
  addFaqService,
  deleteFaqService,
  getFaqsService,
  getSingleFaqService,
  updateFaqService
} from 'services';
import Api from 'types/client';

export const useGetFaqs = (
  payload: Api.Faq.GetFaqs.Request,
  options?: UseQueryOptions<Api.Faq.GetFaqs.Response, AxiosError<Api.Responses.Error>>
) => {
  return useQuery<Api.Faq.GetFaqs.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['getFaqs', payload.PageNumber, payload.PageSize],
    queryFn: () => getFaqsService(payload),
    ...options
  });
};

export const useGetSingleFaq = (
  payload: Api.Faq.GetSingleFaq.Request,
  options?: UseQueryOptions<Api.Faq.GetSingleFaq.Response, AxiosError<Api.Responses.Error>>
) => {
  return useQuery<Api.Faq.GetSingleFaq.Response, AxiosError<Api.Responses.Error>>({
    queryKey: ['getSingleFaq', payload.id],
    queryFn: () => getSingleFaqService(payload),
    ...options
  });
};

export const useAddFaq = (
  options?: Omit<
    UseMutationOptions<
      Api.Faq.PostFaq.Response,
      AxiosError<Api.Responses.Error>,
      Api.Faq.PostFaq.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Faq.PostFaq.Response,
    AxiosError<Api.Responses.Error>,
    Api.Faq.PostFaq.Request
  >('addFaq', addFaqService, options);
};

export const useDeleteFaq = (
  options?: Omit<
    UseMutationOptions<
      Api.Faq.DeleteFaq.Response,
      AxiosError<Api.Responses.Error>,
      Api.Faq.DeleteFaq.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Faq.DeleteFaq.Response,
    AxiosError<Api.Responses.Error>,
    Api.Faq.DeleteFaq.Request
  >('deleteFaq', deleteFaqService, options);
};

export const useUpdateFaq = (
  options?: Omit<
    UseMutationOptions<
      Api.Faq.UpdateFaq.Response,
      AxiosError<Api.Responses.Error>,
      Api.Faq.UpdateFaq.Request
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<
    Api.Faq.UpdateFaq.Response,
    AxiosError<Api.Responses.Error>,
    Api.Faq.UpdateFaq.Request
  >('updateFaq', updateFaqService, options);
};
