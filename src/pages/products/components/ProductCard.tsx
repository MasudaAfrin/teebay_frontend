import {  useState, FC } from 'react';
import { Card, Modal, Button } from 'antd';
import { MdDelete } from 'react-icons/md';
import { deleteData } from '../../../requests/httpServices';
import { toast } from 'react-toastify';
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
  getProducts: () => void;
}

const ProductCard: FC<productProps> = ({
  product,
  getProducts,
})=> {
  const { id, title, description, product_categories, price, rental_price, price_option, created_at } = product;
  const [modalOpen, setModalOpen] = useState(false);

  const deleteProduct = async() => {
  const response = await deleteData('api/v1/products', id);
  if (response.status === 200) {
    toast.success(response?.data?.message);
    setModalOpen(false);
    getProducts();
  } else {
      toast.error(response?.data?.message);
      console.log(response?.data?.message);
   }
  }

  const handleOk = () => {
    deleteProduct();
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const showModal = () => {
    setModalOpen(true);
  };
 
  return (
    <div className='w-full mb-4'>
      <Card className='border-4' style={{ width: '100%' }}>
        <div className='w-full flex justify-between'>
          <Link to={`/products/edit/${id}`} className='underline decoration-indigo-500'>{title}</Link>
          <div className='text-red-500 cursor-auto' onClick={showModal}><MdDelete size={'24'}/></div>
        </div>
        <p>Categories: {product_categories.toString().replace(',', ', ')}</p>
        <p>Price: ${price} | Rent: ${rental_price} {price_option.replace('_', ' ').toUpperCase()}</p>
        <p>{description}</p>
        <p>Date Posted: {created_at}</p>
      </Card>

      <Modal
      title={title}
      open={modalOpen}
      onOk={handleOk} 
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel} className='px-4 rounded border-2 border-[#d3455b] bg-[#d3455b] text-white hover:bg-white'>
          No
        </Button>,
        <Button key="ok" onClick={handleOk} className='px-4 rounded border-2 border-[#6969f5] bg-[#6969f5] text-white hover:bg-white'>
          Yes
        </Button>
      ]}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </div>
  )
}

export default ProductCard;
