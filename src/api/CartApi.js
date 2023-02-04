import Instance from '../axios/Instance'

export const getCartItemByAccountId = (id) =>{
    const url = `/api/site/cart/${id}/`;
    return Instance.get(url);
}

export const addCartItem = (id) =>{
    const url = `/api/site/cart/plus/${id}/`;
    return Instance.get(url);
}
export const minusCartItem = (id) =>{
    const url = `/api/site/cart/minus/${id}/`;
    return Instance.get(url);
}

export const saveCartItem = (data) =>{
    const url = `/api/site/cart/save`;
    return Instance.post(url, data);
}
export const removeCartItem = (id) =>{
    const url = `/api/site/cart/remove/${id}/`;
    return Instance.get(url);
}
