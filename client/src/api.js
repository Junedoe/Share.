import axios from 'axios';

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
    withCredentials: true
});

const errHandler = err => {
    console.error(err);
    throw err;
};

export default {
    service: service,

    getProducts() {
        return service
            .get('/products')
            .then(res => res.data)
            .catch(errHandler);
    },
    getProduct(id) {
        return service
            .get(`/products/${id}`)
            .then(res => res.data)
            .catch(errHandler);
    },
    postProducts(data) {
        return service
            .post('/products', data)
            .then(res => res.data)
            .catch(errHandler);
    },

    getUserProfile() {
        return service
            .get('/userProfile')
            .then(res => res.data)
            .catch(errHandler);
    },

    signup(userInfo) {
        return service
            .post('/signup', userInfo)
            .then(res => res.data)
            .catch(errHandler);
    },

    login(username, password) {
        return service
            .post('/login', {
                username,
                password
            })
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                return res.data;
            })
            .catch(errHandler);
    },

    logout() {
        return service.get('/logout').then(res => {
            localStorage.removeItem('user');
        });
    },

    // loadUser() {
    //   const userData = localStorage.getItem('user');
    //   if (!userData) return false;
    //   const user = JSON.parse(userData);
    //   if (user.token) {
    //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
    //     return user;
    //   }
    //   return false;
    // },

    isLoggedIn() {
        return localStorage.getItem('user') != null;
    },

    addPicture(file) {
        const formData = new FormData();
        formData.append('picture', file);
        return service
            .post('/users/first-user/pictures', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data)
            .catch(errHandler);
    }
};
