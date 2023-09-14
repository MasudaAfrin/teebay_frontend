import { Row, Col } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postData } from '../requests/httpServices';
import { toast } from 'react-toastify';


function Registration() {
  const navigate = useNavigate();
  const { register, handleSubmit,
    formState: { errors } } = useForm({
      defaultValues: {
        first_name: '',
        last_name: '',
        address: '',
        email: '',
        password: '',
        phone_number: '',
        confirm_password: ''
      },
    });

    const submitForm = async (data:any) => {
      const params = {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number,
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password
      }
      const response = await postData('api/v1/users', params);
      if (response.status === 201){
        console.log('response', response?.data);
        navigate('/login', { replace: true });
      } else {
        console.log(response?.data?.message);
        toast.error(response?.data?.message);
      }
    }

  return (
    <div className='w-full'>
      <Row>
        <Col span={24}>
          <h2 className='text-xl font-normal text-center tracking-wide'>
            REGISTRATION
          </h2>
        </Col>
      </Row>

      <Row className='w-1/2 mx-auto border-4 border-[#c5ced6] px-6 py-6 mt-2 2xl:px-12 2xl:py-16 2xl:mt-4'>
        <Row justify={'center'} className='w-full'>
          <form onSubmit={handleSubmit(submitForm)}>
            <Row gutter={16}>
              <Col span={12}>
                <input {...register("first_name", { required: 'This is required' })}
                  type="text"
                  placeholder='First Name'
                  className="w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] focus:outline-sky-500" />
                <p className='text-red-500'>
                  {errors?.first_name?.message}
                </p>
              </Col>

              <Col span={12} >
                <input {...register("last_name", { required: 'This is required.' })}
                  type="text"
                  placeholder='Last Name'
                  className='w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] 
             focus:outline-sky-500'/>
                <p className='text-red-500'>
                  {errors?.last_name?.message}
                </p>
              </Col>
            </Row>

            <Row className='mt-6'>
              <Col span={24}>
                <input {...register("address")}
                  type="text"
                  placeholder='Address'
                  className="w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] focus:outline-sky-500" />
              </Col>
            </Row>

            <Row gutter={16} className='mt-6'>
              <Col span={12}>
                <input {...register("email", { required: 'This is required' })}
                  type="text"
                  placeholder='Email'
                  className="w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] focus:outline-sky-500" />
                <p className='text-red-500'>
                  {errors?.email?.message}
                </p>
              </Col>

              <Col span={12} >
                <input {...register("phone_number", { required: 'This is required.' })}
                  type="text"
                  placeholder='Phone Number'
                  className='w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] 
             focus:outline-sky-500'/>
                <p className='text-red-500'>
                  {errors?.phone_number?.message}
                </p>
              </Col>
            </Row>

            <Row className='mt-6'>
              <Col span={24}>
                <input {...register("password", { required: 'This is required' })}
                  type="password"
                  placeholder='Password'
                  className="w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] focus:outline-sky-500" />
                <p className='text-red-500'>
                  {errors?.password?.message}
                </p>
              </Col>
            </Row>

            <Row className='mt-6'>
              <Col span={24}>
                <input {...register("confirm_password", { required: 'This is required' })}
                  type="password"
                  placeholder='Confirm Password'
                  className="w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] focus:outline-sky-500" />
                <p className='text-red-500'>
                  {errors?.confirm_password?.message}
                </p>
              </Col>
            </Row>

            <Row justify={'center'} className='w-1/2 mx-auto mt-8'>
              <Col span={24}>
                <input
                  type='submit'
                  value='REGISTER'
                  className="w-full bg-[#6558F5] text-white rounded border-2 border-[#6558F5] lg:py-2 2xl:py-4
                  lg:text-lg font-normal hover:bg-[#9eadba] hover:border-[#9eadba] hover:cursor-pointer"/>
              </Col>
            </Row>
          </form>
        </Row>

        <Row className='w-full mt-8'>
          <Col span={24}>
            <p className='text-lg text-center font-medium tracking-wide'>
              Already have an account? <span className='text-[#2c88d9]'>Sign In</span>
            </p>
          </Col>
        </Row>
      </Row>
    </div>
  )
}

export default Registration;
