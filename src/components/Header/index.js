import React from 'react';
import {Link} from  'react-router-dom';
import {connect} from  'react-redux';

import { MdShoppingBasket } from 'react-icons/md'
import { Container, Carrinho } from './styles';
import {logo} from '../../assets/logo.svg'

function Header({ carrinhoSize }) {

  return (
    <Container>
        <Link to='/'>
         <img src="https://static.netshoes.com.br/0.0.395.8/netshoesbr/images/share.png"  alt="GS Shoes" style={{maxHeight: 50, maxWidth:50}} />  
        </Link>

        <Carrinho to='/carrinho'>
            <div>
                <MdShoppingBasket  size={36} color="#FFF"/>
                <strong>Meu Carrinho</strong>
                <span>{carrinhoSize} itens</span>
            </div>
        </Carrinho>
    </Container>
  );
}

export default connect(state =>({
  carrinhoSize: state.carrinho.length,
}))(Header);