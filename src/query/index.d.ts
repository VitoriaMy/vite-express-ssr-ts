enum responseCode {
    success = '0',
    fail = '500',
    undefined = '404',
    error = '400',
    nologin = '401',
}

interface resultType {
    code: responseCode;
    msg: string;
    data: any;
}

interface apiBaseType<S = undefined,T = undefined>{
    url: string;
    method: string;
    params?: S;
    data?: T;
}

// 用户信息

interface loginType extends apiBaseType {
    data?: {
        username: string;
        password: string;
        code: string;
    }
}


interface logonType extends apiBaseType {
    data?: {
        username: string;
        password: string;
    }
}

//  bookshelf 书架

interface bookshelfListType extends apiBaseType {
    params?: {
        page: number;
        page_size: number;
    }
}


interface bookshelfAddType extends apiBaseType {
    data?: {
        book_id: string;
    }
}

interface bookshelfDeleteType extends apiBaseType {
    data?: {
        book_id: string;
    }
}

// 书籍
interface bookInfoType extends apiBaseType {
    params?: {
        book_id: number;
        page?: number;
        page_size?: number;
        is_chapter?: number;
    }
}

interface bookChapterType extends apiBaseType {
    params?: {
        book_id: number;
        page?: number;
        page_size?: number;
    }
}

interface bookReadType extends apiBaseType {
    params?: {
        book_id: number;
        chapter_id: number;
    }
}

interface bookListType extends apiBaseType {
    params?: {
        category_id?: number;
        tag_id?: number;
        name?: string;
        author?: string;
        page?: number;
        page_size?: number;
    }
}

// category 分类

interface categoryType extends apiBaseType {
    params?: {
        category_id?: number;
    }
}