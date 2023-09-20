import { useState, useEffect } from 'react';
import { getDetails, updateData } from '../../requests/httpServices';
import { useForm } from 'react-hook-form';
import { Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const getProductDetails = async () => {
    setLoading(true);
    const response = await getDetails('api/v1/products', id);
    if (response.status === 200) {
      setData(response.data?.data)
      setLoading(false);
    } else {
      setLoading(false);
      console.log(response?.data?.message);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id])

  return (
    <div className='w-full'>
        <Spin spinning={loading}>
          <div>
            {id}
          </div>
        </Spin>
    </div>
  )
}

export default Edit;
