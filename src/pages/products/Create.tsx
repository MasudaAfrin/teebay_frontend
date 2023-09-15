import { useState, useEffect } from 'react';
import { Row, Col, Button, Select, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { postData, getAllData } from '../../requests/httpServices';
import { toast } from 'react-toastify';

const formDefault = {
    title: '',
    description: '',
    price: 0.0,
    product_categories: [],
    price_option: '',
    rental_price: ''
}

const Create = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, control,
        formState: { errors } } = useForm({
            defaultValues: {
                title: '',
                description: '',
                price: 0.0,
                product_categories: [],
                price_option: '',
                rental_price: 0.0
            },
        });

    const [formStep, setFormStep] = useState(1);
    const [categories, setCategories] = useState([]);
    const [priceOptions, setPriceOptions] = useState([]);
    const [formValues, setFormValues] = useState(formDefault);

    const navigateNextStep = () => {
        setFormStep(curr => curr + 1);
    }

    const navigatePrevStep = () => {
        setFormStep(curr => curr - 1);
    }

    const renderStepButton = () => {
        if (formStep === 1) {
            return (
                <Row className='w-full mx-auto mt-8'>
                    <Col span={24} className='flex justify-end'>
                        <Button onClick={navigateNextStep}>Next</Button>
                    </Col>
                </Row>
            )
        } else if (formStep > 1 && formStep < 5) {
            return (
                <Row className='w-full mx-auto mt-8'>
                    <Col span={12}>
                        <Button onClick={navigatePrevStep}>Back</Button>
                    </Col>

                    <Col span={12} className='flex justify-end'>
                        {
                            formStep === 4 ? (<input
                                type='submit'
                                value='Next'
                                className="px-2 rounded border-2 border-[#6558F5] hover:bg-[#9eadba] hover:border-[#9eadba] hover:cursor-pointer" />) 
                            : (<Button onClick={navigateNextStep}>Next</Button>)
                        }
                    </Col>
                </Row>
            )
        } else if (formStep === 5) {
            return (
                <Row className='w-full mx-auto mt-8'>
                    <Col span={12}>
                        <Button onClick={navigatePrevStep}>Back</Button>
                    </Col>

                    <Col span={12} className='flex justify-end'>
                        <input
                            type='submit'
                            value='Submit'
                            className="px-2 rounded border-2 border-[#6558F5] hover:bg-[#9eadba] hover:border-[#9eadba] hover:cursor-pointer" />
                    </Col>
                </Row>
            )
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
        if(formStep === 4){
            setFormValues(params);
            navigateNextStep();
        } else {
            const response = await postData('api/v1/products', params);
            if (response.status === 201) {
                console.log('response', response?.data);
                toast.success(response?.data?.message);
                navigate('/', { replace: true });
            } else {
                console.log(response?.data?.message);
                toast.error(response?.data?.message);
            }
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
    }, [])

    return (
        <div className='w-full'>
            <Row className='w-1/2 mx-auto'>
                <form onSubmit={handleSubmit(submitForm)} className='w-full'>
                    <Row>
                        {
                            formStep === 1 &&
                            <Col span={24}>
                                <p className='text-center'>Select a title for your product</p>
                                <input {...register("title", { required: 'This is required' })}
                                    type="text"
                                    placeholder=''
                                    className="w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] focus:outline-sky-500" />
                                <p className='text-red-500'>
                                    {errors?.title?.message}
                                </p>
                            </Col>
                        }

                        {
                            formStep === 2 &&
                            <Col span={24} className='mt-8'>
                                <p className='text-center'>Select category</p>
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
                                            defaultValue={[]}
                                            options={categories}
                                        />
                                    )}
                                />
                            </Col>
                        }

                        {
                            formStep === 3 &&
                            <Col span={24} className='mt-8'>
                                <p className='text-center'>Select description</p>
                                <textarea {...register("description", { required: 'This is required.' })}
                                    placeholder=''
                                    className='w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] 
                            focus:outline-sky-500'/>
                                <p className='text-red-500'>
                                    {errors?.description?.message}
                                </p>
                            </Col>
                        }

                        {
                            formStep === 4 &&
                            <Col span={24} className='mt-8'>
                                <p className='text-center'>Select Price</p>
                                <input {...register("price", { required: 'This is required.' })}
                                    type="number"
                                    placeholder=''
                                    className='w-full p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] 
                                focus:outline-sky-500'/>
                                <p className='text-red-500'>
                                    {errors?.price?.message}
                                </p>

                                <div className='w-full flex justify-between items-end'>
                                    <div className='w-1/2'>
                                        <p>Rent</p>
                                        <input {...register("rental_price", { required: 'This is required.' })}
                                            type="number"
                                            placeholder=''
                                            className='w-3/4 p-3 border-2 border-[#c5ced6] rounded hover:border-2 hover:border-[#2c88d9] 
                                    focus:outline-sky-500'/>
                                    </div>

                                    <div className='w-1/2'>
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
                                </div>
                            </Col>
                        }

                        {
                            formStep === 5 &&
                            <Col span={24} className='mt-8'>
                                <p className='text-center'>Summary</p>
                                <Card style={{ width: '100%' }}>
                                    <p>Title: <span>{formValues.title}</span> </p>
                                    <p>Category: <span>{formValues.product_categories.toString()}</span> </p>
                                    <p>Description: <span>{formValues.description}</span> </p>
                                    <p>Price: <span>{formValues.price}</span> </p>
                                    <p>Rent: <span>{formValues.rental_price}</span> </p>
                                    <p>Price Option: <span>{formValues.price_option.replace('_', ' ').toUpperCase()}</span> </p>
                                </Card>
                            </Col>
                        }
                    </Row>

                    {
                        renderStepButton()
                    }
                </form>
            </Row>
        </div>
    )
}

export default Create;
