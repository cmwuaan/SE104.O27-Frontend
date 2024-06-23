import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  useGetDetailRequest,
  useSendDeleteRequest,
  useSendPostRequest,
  useSendUpdateRequest,
} from '../../../common/action';
import { usePostData } from '../../../hooks/usePostData';
import { HttpStatusCode } from 'axios';

function PostDetailPage({ action }) {
  const { id } = useParams();
  const endpoint = 'posts';
  const detailEndpoint = useMemo(() => (id ? `${endpoint}/${id}` : null), [id]);
  const {
    error: fetchError,
    isMutating: isFetching,
    trigger: fetchDetailData,
  } = useGetDetailRequest(detailEndpoint, {
    revalidate: false,
  });
  const { trigger: createTrigger, isMutating } = useSendPostRequest(detailEndpoint);
  const { trigger: updateTrigger } = useSendUpdateRequest(endpoint, id);
  const { trigger: deleteTrigger, isMutating: isDeleting } = useSendDeleteRequest(endpoint, [id]);
  const { userData, handleUserChange, setUserData } = usePostData();

  const onInitForm = async () => {
    try {
      const fetchedUserData = await fetchDetailData();

      if (!fetchedUserData) {
        throw new Error('No data found');
      }
      console.log();

      setUserData({
        title: fetchedUserData.data?.title,
        content: fetchedUserData.data?.content,
        image_url: fetchedUserData.data?.image_url,
      });
    } catch (error) {
      console.error(`[FetchDetailError_${detailEndpoint?.toLocaleUpperCase()}]`, error);
    }
  };

  const onResetForm = () => {
    setUserData({
      title: '',
      content: '',
      image_url: '',
    });
  };

  const checkImage = (url) => {
    if (url) {
      if (isFetching) {
        return true;
      }

      if (url.trim().length === 0) {
        return false;
      }

      const regex = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i;
      return regex.test(url);
    }
    return;
  };

  const onImageError = (e) => {
    const target = e.target;
    target.onerror = null;
  };

  const isValidImage = checkImage(userData.avatar_url);

  const handleError = (error) => {
    console.error('[RequestError]', error);
  };

  const onSendCreateRequest = async (payload) => {
    try {
      const createResponse = await createTrigger(payload);
      //   handleResponse(createResponse, 'Banner created successfully');
      console.log(createResponse);
      if (createResponse?.status === HttpStatusCode.Ok) {
        navigator('/users');
      }
    } catch (error) {
      handleError(error);
    }
  };

  const onSendUpdateRequest = async (payload) => {
    try {
      const updateResponse = await updateTrigger(payload);
      //   handleResponse(updateResponse, 'Banner updated successfully');
      console.log(updateResponse);
    } catch (error) {
      handleError(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: userData.title,
      content: userData.content,
      image_url: userData.image_url,
    };

    console.log(payload);

    if (action === 'create') {
      onSendCreateRequest(payload);
    } else if (action === 'edit') {
      onSendUpdateRequest(payload);
    }
  };

  useEffect(() => {
    if (action === 'edit') {
      onInitForm();
    } else if (action === 'create') {
      onResetForm();
    }
  }, [action]);

  const disabled = isMutating || isDeleting || isFetching || !!fetchError;
  console.log(userData);

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-medium">Post management</h2>
          <div className="flex gap-2 mb-2">
            <Link to="/user">
              <button
                type="button"
                onClick={() => {}}
                className="flex justify-center items-center gap-2 border border-neutral-400 rounded h-fit py-2 px-4 text-sm hover:bg-neutral-200"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="flex justify-center items-center gap-2 bg-primary border border-base-outline rounded h-fit py-2 px-4 text-sm hover:bg-secondary"
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-xl font-medium">
            Title
          </label>
          <input
            label="title"
            value={userData.title || ''}
            onChange={(e) => handleUserChange(e)}
            name="title"
            disabled={disabled}
            className="form-input h-10 w-[500px] p-2 border-gray-300 rounded focus:ring ring-1 ring-neutral-200 focus:ring-secondary focus:ring-opacity-50 outline-neutral-200 bg-neutral-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-xl font-medium">
            Description
          </label>
          <textarea
            label="content"
            value={userData.content || ''}
            onChange={(e) => handleUserChange(e)}
            name="content"
            disabled={disabled}
            className="form-input h-40 w-[500px] p-2 border-gray-300 rounded focus:ring ring-1 ring-neutral-200 focus:ring-secondary focus:ring-opacity-50 outline-neutral-200 bg-neutral-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="avatar_url" className="text-xl font-medium">
            Banner
          </label>
          <input
            label="image_url"
            value={userData.image_url == null ? '' : userData.image_url}
            onChange={(e) => handleUserChange(e)}
            name="image_url"
            disabled={disabled}
            className="form-input h-10 w-[500px] p-2 border-gray-300 rounded focus:ring ring-1 ring-neutral-200 focus:ring-secondary focus:ring-opacity-50 outline-neutral-200 bg-neutral-100"
          />
          <div className=" h-48 w-full outline-2 outline-dashed outline-neutral-200 border rounded-lg flex items-center justify-center relative p-2">
            {isValidImage && (
              <img
                src={userData.image_url}
                alt={userData.title}
                onError={(e) => onImageError(e)}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default PostDetailPage;
