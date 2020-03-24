import React from 'react';
import { connect } from  'react-redux';
import * as CarrinhoActions from '../../store/modules/carrinho/actions' 

import {formatPrice} from '../../util/format';
import {MdRemoveCircleOutline,MdAddCircleOutline, MdDelete} from 'react-icons/md'
 import { Container, ProductTable, Total } from './styles';

 function Carrinho({carrinho, total,  dispatch}) {
    function incrementa(product){
        dispatch(CarrinhoActions.updateAmount(product.id, product.ammount +1));
    }
    function decrementa(product){
      dispatch(CarrinhoActions.updateAmount(product.id, product.ammount -1));
    }


  return (
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th  />
            </tr>
          </thead>
          <tbody>
              {carrinho.map(product =>(
                 <tr key={product.id}>
                 <td>
                      <img src={product.image} alt={product.title} />
                 </td>
                 <td>
                     <strong>{product.title}</strong>
                     <span> {product.priceFormatted}</span>
                 </td>
                 <td>
                     <div>
                         <button onClick={() => decrementa(product)}>
                           <MdRemoveCircleOutline size={20} color="#7159c1"/>
                         </button>
                         <input type="number" readOnly value={product.ammount}/>
                         <button onClick={() => incrementa(product)}>
                           <MdAddCircleOutline size={20}  color="#7159c1" />
                         </button>
                     </div>
                 </td>
                 <td>
              <strong>{product.subTotal}</strong>
                 </td>
                 <td>
                   <button type="button" onClick={() => dispatch(CarrinhoActions.removeFromCarrinho(product.id))}>
                     <MdDelete size={20} color="#7159c1" />
                   </button>
                 </td>
               </tr>
              ))}
          </tbody>
        </ProductTable>

        <footer>
          <button  type="button"> Finalizar Pedido</button>
          <Total>
            <span>TOTAL</span>
              <strong>{total}</strong>
          </Total>
        </footer>
      </Container>
  );
}

const  mapStateToProps = state => ({
  carrinho: state.carrinho.map(product =>({
    ...product,
    subTotal: formatPrice(product.price * product.ammount),
  })),
  total: formatPrice(state.carrinho.reduce((total, product) =>{
      return total + product.price * product.ammount;
  }, 0)
  ),
});
export default connect(mapStateToProps)(Carrinho);