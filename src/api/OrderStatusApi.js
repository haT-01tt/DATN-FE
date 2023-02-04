import Instance from '../axios/Instance'

export const getAllOrderStatus = () =>{
    const url = `/api/site/status/gets`;
    return Instance.get(url);
}
