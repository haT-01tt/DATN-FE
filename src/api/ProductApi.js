import Instance from '../axios/Instance'

export const getAllProducts = (page, size, status) =>{
    const url = `/api/site/product/get-all?page=${page}&size=${size}&active=${status}`;
    return Instance.get(url);
}

export const getProductById = (id) =>{
    const url = `/api/site/product-detail/${id}`;
    return Instance.get(url);
}

export const getProductDetail = (data) =>{
    const url = `/api/site/product-detail/get`;
    return Instance.post(url, data);
}
