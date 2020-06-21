import axios from 'axios';
import { BASE_URL } from 'config';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { log as SysLog } from 'utils/function';
import { Header, Response } from './model';

const headers = new Header();

export function request(param) {
    let url;
    if (param.method === 'POST' || param.method === 'GET') {
      url = `${BASE_URL}/${param.url}`;
    } else {
      url = `${BASE_URL}/${param.url}/${param.id}`;
    }
  
    const language = 'vi';
    const parameters = param.param;
    headers.setHeader({ 
      'Content-Type': 'application/json',
      'Accept-Language': language });
  
    return from(
      axios.request({
        url,
        timeout: 10000,
        headers: headers.getSnapshot(),
        method: param.method || 'POST',
        params: parameters,
        ...(param.option && param.option.format === 'json'
          ? { data: parameters, params: {} }
          : { params: parameters }),
      }),
    ).pipe(
      map((result) => {
        return result.data;
      }),
      tap((result) => log(url, parameters, result)),
    );
  }
  
  function log(url, parameters, result) {
    SysLog(
      '--------------------------\n',
      // '\x1b[34m',
      'Request data:',
      // '\x1b[37m',
      '\nURL:           ',
      // '\x1b[32m',
      url,
      // '\x1b[37m',
      '\nParam:         ',
      // '\x1b[32m',
      JSON.stringify(parameters, null, '\x1b[32m'),
      // '\x1b[37m',
      '\nResponse Data: ',
      // '\x1b[32m',
      JSON.stringify(result, null, '\x1b[32m') || true,
      // '\x1b[37m',
      '\n--------------------------',
    );
  }