import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MdAddShoppingCart} from  'react-icons/md';
import  { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CarrinhoActions from '../../store/modules/carrinho/actions' 

import { ProductList } from './styles';



 class Home extends Component{
  state  = {
    products: []
  };

  async componentDidMount() {
    const response  = await api.get('products');
    const data= response.data.map(p => ({
        ...p,
        priceFormatted: formatPrice(p.price),
    }));
    this.setState({products: data});  
  }

  handleAddProduct = product =>{
   const { dispatch } = this.props;
      dispatch(CarrinhoActions.addToCart(product));
  };
    render(){
      const {products} =  this.state;
      const {ammount} =this.props
      return (
        <ProductList>
          {products.map(product => (

                    <li key={product.id}>
                      <img src={product.image} alt={product.title} />
                      <strong>{product.title}</strong>
                      <span> {product.priceFormatted}</span>
                      <button  type="button" onClick= {() => this.handleAddProduct(product)}>     
                          <div>
                              <MdAddShoppingCart  size={16}  color="#FFF" /> {' '}
                              {ammount[product.id] || 0}
                          </div>
                          <span>ADICIONAR AO  CARRINHO</span>
                      </button>
                  </li>
          ))}
                 
      
        </ProductList>
        );
    }
}

 const mapStateToProps = state => ({
  ammount: state.carrinho.reduce((ammount, product) => {
    ammount[product.id]  = product.ammount ;
    return ammount;
  }, {}),
});
export default connect(mapStateToProps)(Home);