import React from 'react';

export default function Profile() {
  const user = localStorage.getItem('user');
  return (
    <>
      {user ? (
        <div className='mini-card'>
          <p className='font-weight-bold'>
            Họ và tên : <span>{user.full_name}</span>
          </p>
          <p className='font-weight-bold'>
            Giới tính :{' '}
            <span>
              {user.gender == 0 ? 'Nam' : user.gender == 1 ? 'Nữ' : ''}
            </span>
          </p>
          <p className='font-weight-bold'>
            Email : <span>{user.email}</span>
          </p>
          <p className='font-weight-bold'>
            Địa chỉ : <span></span>
            {user.address}
          </p>
        </div>
      ) : (
        <h1 className='text-center'>Không có dữ liệu</h1>
      )}
    </>
  );
}
