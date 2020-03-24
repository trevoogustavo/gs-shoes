import produce  from 'immer';
export default function carrinho(state = [], action){    
  switch (action.type){
      case  '@carrinho/ADD_TO_CART':
          return produce(state, draft => {
            const productIndex  = draft.findIndex(p => p.id === action.product.id);
            if (productIndex >= 0){
              draft[productIndex].ammount += 1;
            }else {
              draft.push({
                ...action.product,
                ammount: 1,
              });
            }
          });
      case '@carrinho/REMOVE_FROM_CART':
           return produce(state, draft =>{
            const productIndex  = draft.findIndex(p => p.id === action.id);
            if (productIndex >=0 ){
              draft.splice(productIndex, 1);
            }
           }); 
      case'@cart/UPDATE_AMMOUNT': {
        if (action.ammount <= 0){
          return state;
        }
      return produce(state, draft => {
        const productIndex  = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0){
          draft[productIndex].ammount = Number(action.ammount);
        }
      });
    }
      default:
          return state;    
  }
}