import React from 'react';
import {Link} from  'react-router-dom';
import {connect} from  'react-redux';

import { MdShoppingBasket } from 'react-icons/md'
import { Container, Carrinho } from './styles';
import {logo} from '../../assets/netshoes-logo.svg'

function Header({ carrinhoSize }) {

  return (
    <Container>
        <Link to='/'>
         <img src={logo} alt="GS  Shoes" />  
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