import { useEffect, useState } from 'react';
import { getAllData } from '../../requests/httpServices';
import { Card, Pagination } from "antd";
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';

const defaultPagination = {
    page: 1,
    per_page: 3,
};

const defaultProductData = {
    products: [],
    total: 0,
};

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
    const [pagination, setPagination] = useState(defaultPagination);
    const [data, setData] = useState(defaultProductData);
    const [loading, setLoading] = useState(false);

    const allProducts = async () => {
        setLoading(true);
        const params = {
            page: pagination.page || 1,
            per_page: pagination.per_page || 5
        }
        const response = await getAllData('api/v1/products', params);
        if (response.status === 200) {
            setData(response.data?.data)
            setLoading(false);

        } else {
            setLoading(false);
            console.log(response?.data?.message);
        }
    }

    const onPageChange = (page: any) => {
        setPagination({ ...pagination, page: page })
    };

    useEffect(() => {
        allProducts()
    }, [pagination, data.total])


    return (
        <div className='w-full p-2 '>
            <div className='w-1/2 mx-auto'>
                <h4 className='text-center'>MY PRODUCTS</h4>
                <div className='w-full mt-4'>
                    {
                        data.products && data.products.length > 0 ? (
                            data.products.map((product: Iproduct, index) => (
                                <ProductCard
                                    key={index}
                                    product={product}
                                    getProducts={allProducts}
                                />
                            ))
                        ) : (
                            <Card>
                                <p>No data found</p>
                            </Card>
                        )
                    }
                </div>
                <div className='w-full flex justify-end'>
                    {
                        data.total > 0 && (
                            <Pagination
                                current={pagination.page}
                                pageSize={pagination.per_page}
                                total={data.total || 50}
                                showTotal={(total) => `Total ${data.total} items`}
                                onChange={onPageChange}
                            />
                        )
                    }
                </div>

                <div className='w-full flex justify-end mt-4'>
                    <Link to='/products/create' 
                    className='p-2 rounded border-2 border-[#6558F5] 
                    bg-[#6558F5] text-white hover:bg-[#9eadba] 
                    hover:border-[#9eadba] hover:cursor-pointer hover:text-black'>
                        Add Product
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default List;
