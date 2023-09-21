import { FC } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

interface IProductProps {
    id: string | number;
    title: string;
    description: string;
    product_categories: Array<string>;
    price: number | string;
    rental_price: number | string;
    created_at: string;
    price_option: string;
}

interface productProps {
    product: IProductProps;
    productOption?: string;
    source?: string | any;
}

const ProductCard: FC<productProps> = ({
    product,
    productOption
}) => {
    const { id, title, description, product_categories, price, rental_price, price_option, created_at } = product;

    return (
        <div className='w-full mb-4'>
            <Card className='border-4' style={{ width: '100%' }}>
                <p>{title}</p>
                <p>Categories: {product_categories.toString().replace(',', ', ')}</p>
                {
                    productOption ? (
                        productOption === 'buy' ? (<p>Price: ${price} </p>) : (<p>Rent: ${rental_price} {price_option.replace('_', ' ').toUpperCase()}</p>)
                    ) : (
                        <p>Price: ${price} | Rent: ${rental_price} {price_option.replace('_', ' ').toUpperCase()}</p>
                    )
                }
                <p>{description} 
                <span className='ml-2'><Link to={`/products/edit/${id}`}>More Details</Link>
                </span></p>
                <p>Date Posted: {created_at}</p>
            </Card>
        </div>
    )
}

export default ProductCard;
