import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  useGetDetailRequest,
  useSendDeleteRequest,
  useSendPostRequest,
  useSendUpdateRequest,
} from '../../../common/action';
import { useUserData } from '../../../hooks/useUserData';
import { HttpStatusCode } from 'axios';

function CustomerDetailPage({ action }) {
  const { id } = useParams();
  const endpoint = 'users';
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
  const { userData, handleUserChange, setUserData } = useUserData();

  const onInitForm = async () => {
    try {
      const fetchedUserData = await fetchDetailData();

      if (!fetchedUserData) {
        throw new Error('No data found');
      }
      console.log();

      setUserData({
        name: fetchedUserData.data?.name,
        email: fetchedUserData.data?.email,
        role: fetchedUserData.data?.role,
        phone_number: fetchedUserData.data?.phone_number,
        avatar_url: fetchedUserData.data?.avatar_url,
        status: fetchedUserData.data?.status,
      });
    } catch (error) {
      console.error(`[FetchDetailError_${detailEndpoint?.toLocaleUpperCase()}]`, error);
    }
  };

  const onResetForm = () => {
    setUserData({
      name: '',
      email: '',
      role: [],
      phone_number: '',
      avatar_url: '',
      status: false,
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
      name: userData.name,
      role: userData.role,
      phone_number: userData.phone_number,
      avatar_url: userData.avatar_url,
      status: userData.status,
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
          <h2 className="text-2xl font-medium">User management</h2>
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
          <label htmlFor="role" className="text-xl font-medium">
            Role
          </label>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="role"
                name="role"
                value={['admin']}
                checked={userData.role[0] === 'admin'}
                onChange={(e) => handleUserChange(e)}
                className="form-radio hover:cursor-pointer h-5 w-5 text-secondary border-gray-300 rounded-full focus:ring focus:ring-secondary focus:ring-opacity-50"
              />
              <label htmlFor="admin">Admin</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="role"
                name="role"
                value={['staff']}
                checked={userData.role[0] === 'staff'}
                onChange={(e) => handleUserChange(e)}
                className="form-radio hover:cursor-pointer h-5 w-5 text-secondary border-gray-300 rounded-full focus:ring focus:ring-secondary focus:ring-opacity-50"
              />
              <label htmlFor="staff">Staff</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="role"
                name="role"
                value={['customer']}
                checked={userData.role[0] === 'customer'}
                onChange={(e) => handleUserChange(e)}
                className="form-radio hover:cursor-pointer h-5 w-5 text-secondary border-gray-300 rounded-full focus:ring focus:ring-secondary focus:ring-opacity-50"
              />
              <label htmlFor="customer">Customer</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="text-xl font-medium">
            Status
          </label>
          <input
            type="checkbox"
            label="status"
            checked={userData.status || false}
            onChange={(e) => handleUserChange(e)}
            name="status"
            disabled={disabled}
            className="form-checkbox hover:cursor-pointer h-5 w-5 text-secondary border-gray-300 rounded focus:ring focus:ring-secondary focus:ring-opacity-50"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xl font-medium">
            Name
          </label>
          <input
            label="name"
            value={userData.name || ''}
            onChange={(e) => handleUserChange(e)}
            name="name"
            disabled={disabled}
            className="form-input h-10 w-[500px] p-2 border-gray-300 rounded focus:ring ring-1 ring-neutral-200 focus:ring-secondary focus:ring-opacity-50 outline-neutral-200 bg-neutral-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xl font-medium">
            Email
          </label>
          <input
            label="email"
            value={userData.email || ''}
            onChange={(e) => handleUserChange(e)}
            name="email"
            disabled={action === 'edit'}
            className="form-input text-neutral-400 h-10 w-[500px] p-2 border-gray-300 rounded focus:ring ring-1 ring-neutral-200 focus:ring-secondary focus:ring-opacity-50 outline-neutral-200 bg-neutral-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone_number" className="text-xl font-medium">
            Phone number
          </label>
          <input
            label="phone_number"
            value={userData.phone_number == null ? '' : userData.phone_number}
            onChange={(e) => handleUserChange(e)}
            name="phone_number"
            disabled={disabled}
            className="form-input h-10 w-[500px] p-2 border-gray-300 rounded focus:ring ring-1 ring-neutral-200 focus:ring-secondary focus:ring-opacity-50 outline-neutral-200 bg-neutral-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="avatar_url" className="text-xl font-medium">
            Avatar
          </label>
          <input
            label="avatar_url"
            value={userData.avatar_url == null ? '' : userData.avatar_url}
            onChange={(e) => handleUserChange(e)}
            name="avatar_url"
            disabled={disabled}
            className="form-input h-10 w-[500px] p-2 border-gray-300 rounded focus:ring ring-1 ring-neutral-200 focus:ring-secondary focus:ring-opacity-50 outline-neutral-200 bg-neutral-100"
          />
          <div className=" h-48 w-48 outline-2 outline-dashed outline-neutral-200 border rounded-lg flex items-center justify-center relative p-2">
            {isValidImage && (
              <img
                src={userData.avatar_url}
                alt={userData.name}
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

export default CustomerDetailPage;
