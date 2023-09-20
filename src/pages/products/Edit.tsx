import { useState, useEffect } from 'react';
import { getDetails, updateData, getAllData } from '../../requests/httpServices';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Row, Col, Select } from 'antd';
import { toast } from 'react-toastify';

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      price: 0.0,
      product_categories: [],
      price_option: '',
      rental_price: 0.0
    },
  });

  const [data, setData] = useState<any>();
  const [categories, setCategories] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);

  const getProductDetails = async () => {
    const response = await getDetails('api/v1/products', id);
    if (response.status === 200) {
      setData(response.data?.data)
    } else {
      console.log(response?.data?.message);
    }
  }

  const submitForm = async (data: any) => {
    const params = {
      title: data.title,
      product_categories: data.product_categories,
      description: data.description,
      price: data.price,
      price_option: data.price_option,
      rental_price: data.rental_price
    }
    const response = await updateData('api/v1/products', params, id);
    if (response.status === 200) {
      toast.success(response?.data?.message);
      navigate('/', { replace: true });
    } else {
      console.log(response?.data?.message);
      toast.error(response?.data?.message);
    }

  }

  const getCategories = async () => {
    const response = await getAllData('api/v1/products/category-options');
    if (response.status === 200) {
      setCategories(response.data?.data)

    } else {
      console.log(response?.data?.message);
    }
  }

  const getPriceOptions = async () => {
    const response = await getAllData('api/v1/products/price-options');
    if (response.status === 200) {
      setPriceOptions(response.data?.data)

    } else {
      console.log(response?.data?.message);
    }
  }

  useEffect(() => {
    getCategories();
    getPriceOptions();
  }, []);

  useEffect(() => {
    getProductDetails();
  }, [id])

  useEffect(() => {
    reset({
      title: data?.title,
      description: data?.description,
      product_categories: data?.product_categories,
      price: data?.price,
      rental_price: data?.rental_price,
      price_option: data?.price_option,
    })
  }, [data])

  return (
    <div className='w-1/2 mx-auto my-8'>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit(submitForm)} className='w-full mt-4'>
        <Row className='w-full'>
          <Col span={24}>
            <label>Title</label>
          </Col>
          <Col span={24}>
            <input {...register("title", { required: 'This is required' })}
              type="text"
              placeholder=''
              className="w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] focus:outline-sky-500" />
            <p className='text-red-500'>
              {errors?.title?.message}
            </p>
          </Col>
        </Row>

        <Row className='w-full mt-4'>
          <Col span={24}>
            <label>Categories</label>
          </Col>
          <Col span={24}>
            <Controller
              control={control}
              name='product_categories'
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please select"
                  options={categories}
                />
              )}
            />
            <p className='text-red-500'>
              {errors?.product_categories?.message}
            </p>
          </Col>
        </Row>

        <Row className='w-full mt-4'>
          <Col span={24}>
            <label>Description</label>
          </Col>
          <Col span={24}>
            <textarea {...register("description", { required: 'This is required.' })}
              placeholder=''
              className='w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] 
                            focus:outline-sky-500'/>
            <p className='text-red-500'>
              {errors?.description?.message}
            </p>
          </Col>
        </Row>

        <Row justify={'space-between'} align='bottom' gutter={8} className='w-full mt-4'>
          <Col span={8}>
            <div>
              <label>Price</label>
            </div>
            <div>
              <input {...register("price", { required: 'This is required.' })}
                type="number"
                placeholder=''
                className='w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] 
                                focus:outline-sky-500'/>
              <p className='text-red-500'>
                {errors?.price?.message}
              </p>
            </div>
          </Col>
          <Col span={8}>
            <div>
              <label>Rent</label>
            </div>
            <div>
              <input {...register("rental_price", { required: 'This is required.' })}
                type="number"
                placeholder=''
                className='w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] 
                                    focus:outline-sky-500'/>
              <p className='text-red-500'>
                {errors?.rental_price?.message}
              </p>
            </div>
          </Col>
          <Col span={8}>
            <div>
              <Controller
                control={control}
                name='price_option'
                render={({ field }) => (
                  <Select
                    {...field}
                    allowClear
                    size={'large'}
                    style={{
                      width: '100%',
                    }}
                    placeholder="Please select"
                    options={priceOptions}
                  />
                )}
              />
            </div>
          </Col>
        </Row>

        <Row align='bottom' justify='space-evenly' className='w-full mt-8'>
          <Col span={12}>
            <Link to='/' className='px-4 py-2 rounded border-2 border-[#6558F5]'>
              Cancel
            </Link>
          </Col>
          <Col span={12} className='flex justify-end'>
            <input
              type='submit'
              value='Edit Product'
              className="p-2 rounded border-2 border-[#6558F5] bg-[#6558F5] 
              text-white hover:bg-[#9eadba] hover:border-[#9eadba] hover:cursor-pointer hover:text-black" />
          </Col>
        </Row>
      </form>
    </div>
  )
}

export default Edit;
