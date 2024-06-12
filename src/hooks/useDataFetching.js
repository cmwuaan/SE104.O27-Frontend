import useSWR from 'swr';
import axiosInstance from '../api/axiosConfig';

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const useGetData = (url) => {
  const { data, error, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading: !error && !data,
    mutate,
  };
};

const usePostData = () => {
  const postData = async (url, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return postData;
};

const usePutData = () => {
  const putData = async (url, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return putData;
};

const useDeleteData = () => {
  const deleteData = async (url) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return deleteData;
};

export { useGetData, usePostData, usePutData, useDeleteData };
