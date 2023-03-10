import React from 'react';
import '../static/css/style.css';
import logo from '../static/images/logo.png';
import { Link, NavLink } from 'react-router-dom';
import user_image from '../static/images/default.png';
import Dropdown from '../admin/dropdown/Dropdown';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const user_menu = [
  {
    icon: 'bx bx-user',
    content: 'Tài khoản',
    url: '/profile',
  },
  {
    icon: 'bx bx-log-out-circle bx-rotate-180',
    content: 'Đăng xuất',
    url: '/',
  },
];

const not_menu = [
  {
    icon: 'bx bx-user',
    content: 'Đăng nhập',
    url: '/sign-in',
  },
  {
    icon: 'bx bx-cog',
    content: 'Đăng kí',
    url: '/register',
  },
];

const Header = (props) => {
  let history = useHistory();
  const curr_user = {
    display_name: props.user ? props.user.fullName : 'Tài khoản',
    image: user_image,
  };

  const renderUserToggle = (user) => (
    <div className='topnav__right-user'>
      <div className='topnav__right-user__image'>
        <img src={user.image} alt='' />
      </div>
      <div className='topnav__right-user__name'>{user.display_name}</div>
    </div>
  );

  const renderUserMenu = (item, index) => (
    <Link
      to={item.url}
      key={index}
      onClick={item.url === '/' ? signOutHandler : ''}
    >
      <div className='notification-item'>
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
    </Link>
  );

  const signOutHandler = () => {
    props.refresh(false);
    toast.success('Tài khoản đã được đăng xuất.');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    props.userHandler(null);
  };

  return (
    <div className='mini-card'>
      {/* Navigation */}
      <nav className='navbar navbar-expand-md col-12'>
        <div className='navbar-brand ml-1 col'>
          <img src={logo} width={75} height={75} alt='' />
        </div>
        <div className='collapse navbar-collapse col'>
          <ul className='navbar-nav mini-ul' style={{ marginLeft: '30%' }}>
            <li
              className={
                props.header === 1
                  ? 'nav-item mr-2  mini-item active'
                  : 'nav-item mr-2  mini-item'
              }
            >
              <NavLink className='nav-link' to='/' exact>
                Trang chủ
              </NavLink>
            </li>
            <li
              className={
                props.header === 2
                  ? 'nav-item mr-2  mini-item active'
                  : 'nav-item mr-2  mini-item'
              }
            >
              <NavLink className='nav-link' to='/cart' exact>
                Giỏ hàng
              </NavLink>
            </li>
            <li
              className={
                props.header === 3
                  ? 'nav-item mr-2  mini-item active'
                  : 'nav-item mr-2  mini-item'
              }
            >
              <NavLink className='nav-link' to='/order' exact>
                Đơn hàng
              </NavLink>
            </li>
            <li
              className={
                props.header === 4
                  ? 'nav-item mr-2  mini-item active'
                  : 'nav-item mr-2  mini-item'
              }
            >
              <NavLink className='nav-link' to='/blog' exact>
                Chính sách
              </NavLink>
            </li>
            {props.user ? (
              <Dropdown
                customToggle={() => renderUserToggle(curr_user)}
                contentData={user_menu}
                renderItems={(item, index) => renderUserMenu(item, index)}
              />
            ) : (
              <Dropdown
                customToggle={() => renderUserToggle(curr_user)}
                contentData={not_menu}
                renderItems={(item, index) => renderUserMenu(item, index)}
              />
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
