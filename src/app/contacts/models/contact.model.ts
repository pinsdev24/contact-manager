export interface Contact {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  photo?: string;
  role?: string;
  user_id?: number;
}

export interface ContactsResponse {
  data: Contact[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface ContactResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  photo?: string;
}

export interface ContactCreateResponse {
  message: string;
}

export interface ContactUpdateResponse {
  message: string;
}

export interface ContactDeleteResponse {
  message: string;
}

export interface ContactError {
  errorCode: number;
  errorType: string;
  errorMessage: string;
}