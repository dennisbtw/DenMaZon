const LOAD_PRODUCTS = 'product/loadProducts';
const LOAD_ONE_PRODUCT ='product/loadOneProduct';
const CREATE_PRODUCT = 'product/CREATE_PRODUCT';


const loadProducts = (products) => ({
    type: LOAD_PRODUCTS,
    products
})

const loadOneProduct = (product) => ({
    type: LOAD_ONE_PRODUCT,
    product
})

const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
})

export const loadProductsThunk = () => async (dispatch) => {
    const response = await fetch('/api/products')

    if (response.ok) {
        const data = await response.json();
        dispatch(loadProducts(data))
        return data
    }
}

export const loadOneProductThunk = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(loadOneProduct(data))
        return data
    }
}

export const createProductThunk = (product) => async (dispatch) => {
    const response = await fetch('/api/products/new-product', {
        method: "POST",
        body: product
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createProduct(data))
        return data
    }
}

const initialState = {}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_PRODUCTS: {
            const newState = {};
            action.products.products.forEach(product => {
                newState[product.id] = product;
            });
            return newState;
        }
        case LOAD_ONE_PRODUCT: {
            return {
                ...state,
                [action.product.id]: action.product
            };
        }
        case CREATE_PRODUCT:{
            return {
                ...state,
                [action.product.id]: action.product
            };
        }       
        default:
            return state;
    }
}



export default productReducer;