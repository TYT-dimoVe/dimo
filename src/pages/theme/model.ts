export interface TestState {
  test: boolean;
}

export interface Response {
  test: string;
}

export interface ResponseSuccess {
  errorCode: number;
  errorDesc: string;
  data: any;
}

export interface ResponseFailed {
  message: string;
  status: number;
}
