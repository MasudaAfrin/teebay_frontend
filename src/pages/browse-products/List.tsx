import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Select, Divider, Button } from 'antd';
import { getAllData } from '../../requests/httpServices';
import ProductCard from './components/ProductCard';

const defaultPagination = {
    page: 1,
    per_page: 1
}

const defaultData = {
    products: [],
    total: 0
}

interface Iproduct {
    id: string | number;
    title: string;
    description: string;
    product_categories: Array<string>;
    price: number | string;
    rental_price: number | string;
    created_at: string;
    price_option: string;
}

function List() {
    const {
        handleSubmit,
        control,
        register,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: '',
            category: '',
            product_option: '',
            price_minimum: '',
            price_maximum: '',
            price_option: ''
        },
    });

    const [pagination, setPagination] = useState(defaultPagination);
    const [data, setData] = useState(defaultData);
    const [categories, setCategories] = useState([]);
    const [priceOptions, setPriceOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState();

    const allProducts = async () => {
        const params = {
            page: pagination.page || 1,
            per_page: pagination.per_page || 5
        }
        const response = await getAllData('api/v1/products/list', params);
        if (response.status === 200) {
            setData(response.data?.data)

        } else {
            console.log(response?.data?.message);
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

    const submitForm = async (data: any) => {
        const params = {
            ...data,
            page: pagination.page,
            per_page: pagination.per_page
        }
        const response = await getAllData('api/v1/products/list', params);
        if (response.status === 200) {
            setData(response.data?.data)

        } else {
            console.log(response?.data?.message);
        }

    }

    const onChange = (e: any) => {
        setSelectedOption(e.target.value);
    }

    useEffect(() => {
        getCategories();
        getPriceOptions();
    }, []);

    useEffect(() => {
        allProducts();
    }, [pagination])

    return (
        <div className='w-full p-8'>
            <Row align='middle' className='w-full'>
                <Col span={6}>
                    <h1 className='text-center'>Search</h1>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <Row>
                            <Col span={24}>
                                <label>Title</label>
                            </Col>
                            <Col span={24}>
                                <input {...register("title")}
                                    type="text"
                                    placeholder=''
                                    className="w-full p-3 border-2 border-[#c5ced6] 
                            rounded hover:border-2 hover:border-[#2c88d9] focus:outline-sky-500" />
                            </Col>
                        </Row>

                        <Row className='mt-4'>
                            <Col span={24}>
                                <label>Category</label>
                            </Col>
                            <Col span={24}>
                                <Controller
                                    control={control}
                                    name='category'
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="Please select"
                                            options={categories}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        <Row className='mt-4'>
                            <Col span={24} className='flex items-center	'>
                                <input type="radio"
                                    value="buy"
                                    {...register("product_option")}
                                    onChange={onChange} />
                                <span className='ml-2'>Buy</span>
                            </Col>
                            {
                                selectedOption && selectedOption === 'buy' && (
                                    <Col span={24}>
                                        <div>
                                            <label>Price</label>
                                        </div>
                                        <input {...register("price_minimum", { required: 'This is required.' })}
                                            type="number"
                                            placeholder=''
                                            className='w-1/4 p-3 border-2 border-[#c5ced6] 
                                    rounded hover:border-2 hover:border-[#2c88d9] focus:outline-sky-500'
                                        />
                                        <span className='px-1'>-</span>
                                        <input {...register("price_maximum", { required: 'This is required.' })}
                                            type="number"
                                            placeholder=''
                                            className='w-1/4 p-3 border-2 border-[#c5ced6] 
                                    rounded hover:border-2 hover:border-[#2c88d9] focus:outline-sky-500'
                                        />
                                        <p className='text-red-500'> {errors?.price_maximum?.message || errors?.price_minimum?.message}</p>
                                    </Col>
                                )
                            }
                        </Row>

                        <Row className='mt-2 flex items-center'>
                            <Col span={24}>
                                <input type="radio" value="rent" {...register("product_option")}
                                    onChange={onChange}
                                />
                                <span className='ml-2'>Rent</span>
                            </Col>

                            {
                                selectedOption && selectedOption === 'rent' && (
                                    <Col span={24}>
                                        <div>
                                            <label>Price</label>
                                        </div>
                                        <input {...register("price_minimum", { required: 'This is required.' })}
                                            type="number"
                                            placeholder=''
                                            className='w-1/4 p-3 border-2 border-[#c5ced6] 
                                    rounded hover:border-2 hover:border-[#2c88d9] focus:outline-sky-500'
                                        />
                                        <span className='px-1'>-</span>
                                        <input {...register("price_maximum", { required: 'This is required.' })}
                                            type="number"
                                            placeholder=''
                                            className='w-1/4 p-3 border-2 border-[#c5ced6] 
                                    rounded hover:border-2 hover:border-[#2c88d9] focus:outline-sky-500'
                                        />

                                        <Controller
                                            control={control}
                                            name='price_option'
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    allowClear
                                                    style={{
                                                        width: '33%',
                                                        marginLeft: '.5rem'
                                                    }}
                                                    placeholder="Please select"
                                                    options={priceOptions}
                                                />
                                            )}
                                        />
                                        <p className='text-red-500'> {errors?.price_maximum?.message || errors?.price_minimum?.message}</p>
                                    </Col>
                                )
                            }
                        </Row>

                        <Row className='mt-4'>
                            <Col span={24} className='flex justify-center'>
                                <input
                                    type='submit'
                                    value='Search'
                                    className="px-4 py-2 rounded border-2 border-[#6558F5] bg-[#6558F5] 
              text-white hover:bg-[#9eadba] hover:border-[#9eadba] hover:cursor-pointer hover:text-black" />
                            </Col>
                        </Row>
                    </form>
                </Col>
                <Col span={4} className='flex justify-center'>
                    <Divider type="vertical" style={{ height: "50vh", borderLeft: '3px solid #c5ced6' }} />
                </Col>
                <Col span={14}>
                    <div className='w-full'>
                        {
                            data.products && data.products.length > 0 ? (
                                data.products.map((product: Iproduct) => (
                                    <ProductCard
                                        product={product}
                                        productOption={selectedOption} />
                                )
                                )) : (
                                <p className='text-center'>NO PRODUCTS TO DISPLAY</p>
                            )
                        }
                    </div>

                    <div className='flex justify-center'>
                        {
                            data.total && data.total > data.products.length && (
                                <Button onClick={() => setPagination({ ...pagination, per_page: pagination.per_page + 1 })}>
                                    Learn More
                                </Button>
                            )
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default List;
