import useSWR from 'swr';
import axiosInstance from '../api/axiosConfig';
import useSWRMutation from 'swr/mutation';

export const useGetListRequest = (endpoint) => {
  const getAllFetcher = async (endpoint) => {
    return axiosInstance.get(endpoint);
  };

  const { data, error, isLoading } = useSWR(`${endpoint}`, getAllFetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export const useGetDetailRequest = (endpoint, options) => {
  const fetcher = async () => {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  };

  return useSWRMutation(endpoint, fetcher, options);
};

export const useSendPostRequest = (endpoint) => {
  console.log(endpoint);
  const mutationFetcher = async (endpoint, { arg }) => {
    return axiosInstance.post(endpoint, arg);
  };

  const { trigger, isMutating, data, error } = useSWRMutation(endpoint, mutationFetcher);

  return {
    trigger,
    data,
    error,
    isMutating,
  };
};

export const useSendUpdateRequest = (endpoint, dataId) => {
  const mutationFetcher = async (endpoint, { arg }) => {
    const response = await axiosInstance.put(`${endpoint}/${dataId}`, arg);
    return response;
  };
  const { trigger, isMutating, data, error } = useSWRMutation(endpoint, mutationFetcher);
  return {
    trigger,
    data,
    error,
    isMutating,
  };
};

export const useSendDeleteRequest = (endpoint, dataIds, filter) => {
  const mutationFetcher = async (endpoint) => {
    const url = dataIds.length > 1 ? `${endpoint}?${filter}=${dataIds.join(',')}` : `${endpoint}/${dataIds}`;

    return axiosInstance.delete(url);
  };

  const { trigger, isMutating, data, error } = useSWRMutation(endpoint, mutationFetcher);

  return {
    trigger,
    data,
    error,
    isMutating,
  };
};
