import Instance from '../axios/Instance'

export const getVoucherByCode = (code) =>{
    const url = `/api/admin/promotion/get?code=${code}`;
    return Instance.get(url);
}
