export function addToCart(product){
    return  {
        type:'@carrinho/ADD_TO_CART',
        product,
      };
}

export function removeFromCarrinho(id){
    return {
        type: '@carrinho/REMOVE_FROM_CART', id: id
    };

}

export function updateAmount(id, ammount){
    return{
        type:'@cart/UPDATE_AMMOUNT',
        id,
        ammount,
    }
}