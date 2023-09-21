import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { getAllData } from '../../requests/httpServices';
import ProductCard from './components/ProductCard';

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

const tabList = [
    {
      key: 'bought',
      label: 'Bought',
    },
    {
      key: 'sold',
      label: 'Sold',
    },
    {
      key: 'borrowed',
      label: 'Borrowed',
    },
    {
        key: 'lent',
        label: 'Lent',
      },
  ];

  const productOptions = ['bought', 'sold'];

function MyProducts() {
    const [data, setData] = useState([]);
    const [currentTab, setCurrentTab] = useState('bought');

    const allProducts = async () => {
        const params = {
            current_tab: currentTab
        }
        const response = await getAllData('api/v1/products/my-products', params);
        if (response.status === 200) {
            setData(response.data?.data)

        } else {
            console.log(response?.data?.message);
        }
    }

    const onTabChange = (key:any) => {
        setCurrentTab(key);
    }

    useEffect(() => {
        allProducts();
    }, [currentTab])

    return (
        <div className='w-full p-8'>
            <Row align='middle' className='w-full'>
                <Col span={24}>
                    <Card style={{
                        width: '100%',
                        minHeight: '450px'
                    }}
                    tabList={tabList}
                    activeTabKey={currentTab}
                    onTabChange={onTabChange}
                    >
                        <div className='w-1/2 mx-auto min-h-full'>
                            {
                                data && data.length > 0 ? (
                                    data.map((product: Iproduct) => (
                                        <ProductCard
                                            product={product}
                                            productOption={productOptions.includes(currentTab) ? 'buy' : 'rent'}
                                        />
                                    )
                                    )) : (
                                    <p className='text-center'>NO PRODUCTS TO DISPLAY</p>
                                )
                            }
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MyProducts;
