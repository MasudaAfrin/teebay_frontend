import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDetails } from '../../requests/httpServices';


const Details = () => {
    const { id } = useParams();
    let { state } = useLocation();

    const [data, setData] = useState<any>();

    const getProductDetails = async () => {
        const response = await getDetails('api/v1/products', id);
        if (response.status === 200) {
            setData(response.data?.data)
        } else {
            console.log(response?.data?.message);
        }
    }

    useEffect(() => {
        getProductDetails();
    }, [id])

    return (
        <div>{state?.productOption}</div>
    )
}

export default Details;
