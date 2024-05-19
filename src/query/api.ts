/// <reference path="./index.d.ts" />


// 用户信息
export const login:loginType = {
    url: "/user/register",
    method: "POST",
}
export const logon:logonType = {
    url: "/user/login",
    method: "POST",
}
export const userInfo:apiBaseType = {
    url: "/user/info2",
    method: "GET",
}

// 验证码
export const captcha:apiBaseType = {
    url: "/user/captcha",
    method: "GET",
}

// 书籍

export const bookInfo:bookInfoType = {
    url: "/book/info",
    method: "GET",
}

export const bookList:bookListType = {
    url: "/book/list",
    method: "GET",
}
export const bookRead:bookReadType = {
    url: "/book/read",
    method: "GET",
}
export const bookChapter :bookChapterType = {
    url: "/book/chapter",
    method: "GET",
}

//分类
export const category :categoryType = {
    url: "/category/list",
    method: "GET",
}

// 书架
export const bookshelf :bookshelfListType = {
    url: "/bookshelf/list",
    method: "GET",
}

export const bookshelfAdd :bookshelfAddType = {
    url: "/bookshelf/add",
    method: "POST",
}

export const bookshelfDelete :bookshelfDeleteType = {
    url: "/bookshelf/del",
    method: "DELETE",
}