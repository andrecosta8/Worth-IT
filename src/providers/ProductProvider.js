import React, {useState, useContext, createContext} from 'react'

const productContext = createContext();
const productChangeContext = createContext();

export const useProductContext = () => {
    return useContext(productContext)
}

export const useProductChangeContext = () => {
    return useContext(productChangeContext)
}

export const ProductProvider = (props) => {
    const [product, setProduct] = useState(null);

    const productChange= (selected) => {
        setProduct(selected);
    }

    return(
        <productContext.Provider value={product}>
            <productChangeContext.Provider value={productChange}>
                {props.children}
            </productChangeContext.Provider>
        </productContext.Provider>
    )
}