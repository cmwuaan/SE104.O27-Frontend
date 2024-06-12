import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  useGetDetailRequest,
  useSendDeleteRequest,
  useSendPostRequest,
  useSendUpdateRequest,
} from '../../../common/action';
import { useDeviceData } from '../../../hooks/useDeviceData';
import { HttpStatusCode } from 'axios';

function DeviceDetailPage({ action }) {
  const { id } = useParams();
  const endpoint = 'iot-devices';
  const detailEndpoint = useMemo(() => (id ? `${endpoint}/${id}` : null), [id]);
  const {
    error: fetchError,
    isMutating: isFetching,
    trigger: fetchDetailData,
  } = useGetDetailRequest(detailEndpoint, {
    revalidate: false,
  });
  const { trigger: createTrigger, isMutating } = useSendPostRequest(detailEndpoint);
  const { trigger: updateTrigger } = useSendUpdateRequest(detailEndpoint, id);
  const { trigger: deleteTrigger, isMutating: isDeleting } = useSendDeleteRequest(endpoint, [id]);
  const { deviceData, handleDeviceChange, setDeviceData } = useDeviceData();

  const onInitForm = async () => {
    try {
      const fetchedData = await fetchDetailData();

      if (!fetchedData) {
        throw new Error('No data found');
      }
      console.log();

      setDeviceData({
        ip: fetchedData.data?.ip,
        ait_val: fetchedData.data?.air_val,
        left_status: fetchedData.data?.left_status,
        right_status: fetchedData.data?.right_status,
        status: fetchedData.data?.status,
      });
    } catch (error) {
      console.error(`[FetchDetailError_${detailEndpoint?.toLocaleUpperCase()}]`, error);
    }
  };

  const onResetForm = () => {
    setDeviceData({
      ip: '',
      air_val: '',
      left_status: '',
      right_status: '',
      status: '',
    });
  };

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
      ip: deviceData.ip,
      ait_val: deviceData.air_val,
      left_status: deviceData.left_status,
      right_status: deviceData.right_status,
      status: deviceData.status,
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
  console.log(deviceData);

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-medium">Device management</h2>
          <div className="flex gap-2 mb-2">
            <Link to="/device">
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
          <label htmlFor="ip" className="text-xl font-medium">
            IP device
          </label>
          <input
            label="ip"
            value={deviceData.ip || ''}
            onChange={(e) => handleDeviceChange(e)}
            name="ip"
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

export default DeviceDetailPage;
