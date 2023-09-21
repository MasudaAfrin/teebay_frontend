import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getDetails, postData } from '../../requests/httpServices';
import { Button, Modal, DatePicker } from 'antd';
import { toast } from 'react-toastify';

const Details = () => {
    const { id } = useParams();
    let { state } = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState<any>();
    const [timeStart, setTimeStart] = useState(null);
    const [timeEnd, setTimeEnd] = useState(null);
    const [open, setOpen] = useState(false);

    const handleStartDate = (date:any, dateString:any) => {
        setTimeStart(dateString);
    }

    const handleEndDate = (date:any, dateString:any) => {
        setTimeEnd(dateString);
    }

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
        const response = await postData('api/v1/products/line-items', params);
        if (response.status === 201) {
            setOpen(false);
            toast.success(response?.data?.message);
            navigate('/products/my-products', { replace: true });
        } else {
            console.log(response?.data?.message);
            toast.error(response?.data?.message);
        }
    }

    const handleOk = () => {
        buyOrRent();
    };

    const handleCancel = () => {
        setOpen(false);;
    };

    const handleBuyOrRent = () => {
        setOpen(true);
    }

    useEffect(() => {
        getProductDetails();
    }, [id])

    return (
        <div className='w-1/2 mx-auto p-4 my-8 border-2 border-[#c5ced6]'>
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
                            Price: <span>{state.productOption === 'rent' ? `$ ${data.rental_price} ${data.price_option.replace('_', ' ').toUpperCase()}` : data.price}</span>
                        </p>

                        <p className='mt-2'>
                            {data.description}
                        </p>

                        <div className='w-full flex justify-end mt-8'>
                            <Button onClick={handleBuyOrRent}
                                className='border-2 border-[#6558F5] bg-[#6558F5] 
              text-white hover:bg-[#9eadba] hover:border-[#9eadba] hover:cursor-pointer hover:text-black'>
                                {state.productOption === 'rent' ? 'Rent' : 'Buy'}
                            </Button>
                        </div>
                    </div>
                )
            }

            <div>
                <Modal
                    title={''}
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="cancel" onClick={handleCancel} className='px-4 rounded border-2 border-[#d3455b] bg-[#d3455b] text-white hover:bg-white'>
                           {
                                state.productOption === 'buy' ? 'No' : 'Cancel'
                            }
                        </Button>,
                        <Button key="ok" onClick={handleOk} className='px-4 rounded border-2 border-[#6969f5] bg-[#6969f5] text-white hover:bg-white'>
                            {
                                state.productOption === 'buy' ? 'Yes' : 'Confirm Rent'
                            }
                        </Button>
                    ]}
                >
                    {
                        state.productOption === 'buy' ? (
                            <p>Are you sure you want to buy this product?</p>
                        ) : (
                            <>
                             <p>Rental Period</p>
                             <DatePicker onChange={handleStartDate} />
                             <DatePicker onChange={handleEndDate} className='ml-2'/>
                            </>
                            
                        )
                    }
                </Modal>
            </div>
        </div>
    )
}

export default Details;
