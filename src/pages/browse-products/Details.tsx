import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDetails, postData } from '../../requests/httpServices';
import { Button } from 'antd';
import { toast } from 'react-toastify';

const Details = () => {
    const { id } = useParams();
    let { state } = useLocation();

    const [data, setData] = useState<any>();
    const [timeStart, setTimeStart] = useState(null);
    const [timeEnd, setTimeEnd] = useState(null);

    const getProductDetails = async () => {
        const response = await getDetails('api/v1/products', id);
        if (response.status === 200) {
            setData(response.data?.data)
        } else {
            console.log(response?.data?.message);
        }
    }

    const buyOrRent = async () => {
        const params = {
            product_id: id,
            item_type: state.productOption,
            rental_time_start: timeStart,
            rental_time_end: timeEnd,
        }
        const response = await postData('api/v1/products/line-iems', params);
        if (response.status === 200) {
            toast.success(response?.data?.message);
        } else {
            console.log(response?.data?.message);
        }
    }

    useEffect(() => {
        getProductDetails();
    }, [id])

    return (
        <div className='w-1/2 mx-auto p-4 border-2 border-[#c5ced6]'>
            {
                data && (
                    <div className='w-full'>
                        <p>
                            {data.title}
                        </p>
                        <p className='mt-2'>
                            Categories: <span>{data.product_categories.toString().replace(',', ', ')}</span>
                        </p>

                        <p className='mt-2'>
                            Price: <span>{state.productOption === 'rent' ? `$ ${data.rental_price} ${data.price_option.replace('_', ' ').toUpperCase()}`: data.price}</span>
                        </p>

                        <p className='mt-2'>
                            {data.description}
                        </p>

                        <div className='w-full flex justify-end mt-8'>
                            <Button className='border-2 border-[#6558F5] bg-[#6558F5] 
              text-white hover:bg-[#9eadba] hover:border-[#9eadba] hover:cursor-pointer hover:text-black'>
                                {state.productOption === 'rent' ? 'Rent' : 'Buy'}
                            </Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Details;
