import { Row, Col } from 'antd';
import { useForm } from 'react-hook-form';

function Login() {
  const { register,
    formState: { errors } } = useForm({
      defaultValues: {
        email: '',
        password: '',
      },
    });

  return (
    <div className='w-full'>
      <Row>
        <Col span={24}>
          <h2 className='text-xl font-normal text-center tracking-wide'>SIGN IN</h2>
        </Col>
      </Row>

      <Row className='w-1/3 mx-auto border-4 border-[#c5ced6] px-6 py-6 mt-2 2xl:px-12 2xl:py-24 2xl:mt-6'>
        <Row justify={'center'} className='w-full'>
          <form>
            <Row >
              <Col span={24}>
                <input {...register("email", { required: 'This is required' })}
                  type="email"
                  placeholder='Email'
                  className="w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] focus:outline-sky-500" />
                <p className='text-red-500'>
                  {errors?.password?.message}
                </p>
              </Col>

              <Col span={24} className='mt-8'>
                <input {...register("password", { required: 'This is required.' })}
                  type="password"
                  placeholder='Password'
                  className='w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] 
             focus:outline-sky-500'/>
                <p className='text-red-500'>
                  {errors?.password?.message}
                </p>
              </Col>
            </Row>

            <Row justify={'center'} className='w-1/2 mx-auto mt-8'>
              <Col span={24}>
                <input
                  type='submit'
                  value='LOGIN'
                  className="w-full bg-[#6558F5] text-white rounded border-2 border-[#6558F5] lg:py-2 2xl:py-4
                  lg:text-lg 2xl:text-xl font-normal hover:bg-[#9eadba] hover:border-[#9eadba] hover:cursor-pointer"/>
              </Col>
            </Row>
          </form>
        </Row>

        <Row className='w-full mt-8'>
          <Col span={24}>
            <p className='text-lg text-center font-medium tracking-wide'>
              Don't have an account? <span className='text-[#2c88d9]'>SignUp</span>
            </p>
          </Col>
        </Row>
      </Row>
    </div>
  )
}

export default Login;
