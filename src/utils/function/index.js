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
    return /^[a-zA-Z ]+$/.test(fullName);
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