import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUser: any = createAsyncThunk(
    "user/getAllUser",
    async () => {
        let URL = import.meta.env.VITE_BASE_URL
        const response = await axios.get(`${URL}/user`);
        return response.data;
    }
)

// API thêm user khi đăng ký
export const addUser: any = createAsyncThunk(
    "user/addUser",
    async (data: any) => {
        let URL = import.meta.env.VITE_BASE_URL
        const response = await axios.post(`${URL}/user`, data);
        return response.data;
    }
)

// API cập nhật trạng thái user
export const updateUserStatus: any = createAsyncThunk(
    "user/updateUserStatus",
    async (data: any) => {
        let URL = import.meta.env.VITE_BASE_URL
        const response = await axios.patch(`${URL}/user/${data.id}`, data);
        return response.data;
    }
)

// API tìm kiếm user
export const searchUser: any = createAsyncThunk(
    "user/searchUser",
    async (searchUser: string) => {
        let URL = import.meta.env.VITE_BASE_URL
        const response = await axios.get(`${URL}/user?name_like=${searchUser}`);
        return response.data;
    }
)

// API cập nhật thông tin user
export const updateUser: any = createAsyncThunk(
    "user/updateUser",
    async (data: any) => {
        let URL = import.meta.env.VITE_BASE_URL
        const response = await axios.patch(`${URL}/user/${data.id}`, data);
        return response.data;
    }
)

// API sắp xếp user từ A-Z và Z-A
export const sortUser: any = createAsyncThunk(
    "user/sortUser",
    async (order: string) => {
        let URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${URL}/user?_sort=name&_order=${order}`);
        return response.data;
    }
);

// API phân trang user
export const paginateUser: any = createAsyncThunk(
    "user/paginateUser",
    async (page: number) => {
        let URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${URL}/user?_page=${page}&_limit=10`);
        return response.data
    }
)