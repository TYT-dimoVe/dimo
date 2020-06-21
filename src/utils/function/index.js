import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';

export const IS_DEV = true;

export function formatCurrency(num) {
    const values = num.toString().replace(/\D/g, '');
    return values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  
  const formatter = new Intl.NumberFormat('vi-VI', {
    style: 'currency',
    currency: 'VND',
  });
  
  export const convertMoney = (x) => {
    return formatter.format(Number(x));
  };
  
  export const convertNumber = (x) => {
    const values = x.toString().replace(/\D/g, '');
    return values;
  };
  
  export const reConvertMoney = (x) => {
    let s;
    s = x.split('.');
    s = s.join('');
    return s;
  };

  export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  export function validatePersonName(fullName) {
    var re = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g // regex here
    return re.test(removeAscent(string))
  }

  function removeAscent (str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }

  export function log(...arg) {
    if (__DEV__) {
      console.info(
        arg
          .map((i) =>
            ['string', 'number'].indexOf(typeof i) === -1 ? JSON.stringify(i, null, ' ') : i,
          )
          .join(' '),
      );
    }
  }

  export const getCurrentRouteName = (state) => {
    const route = state.routes[state.index];
    return typeof route.index === 'undefined' ? route.routeName : getCurrentRouteName(route);
  };

