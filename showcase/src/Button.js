import React from 'react'
import styled from 'styled-components'
import { LIGHT_PURPLE, DARK_GREY } from './utils/constants'
import { media } from './content/StyledContent'

export const StyledButton = styled.button`
  background: ${({ primary }) => (primary ? LIGHT_PURPLE : DARK_GREY)};
  width: 100%;
  fontSize: 0.85rem;
  border-radius: 10px;
  padding: 9px 0;
  fontFamily: Avenir, Nunito, sans-serif;
  fontWeight: 300;
  cursor: pointer;
  text-align: center;
  border: 0;
  outline: 0;
  color: #fff;

  &:active {
    border: 1px solid #fff;
  }

  > span {
    padding-left: 6px;
  }

  > svg {
    position: relative;
    top: 3px;
  }

  ${media.md`
    width: 24vw;
    fontSize: 1rem;
    border-radius: 30px;
    padding: 18px 5px;
  `}
`

const Button = ({ Icon, text, primary, onClick }) => (
  <StyledButton primary={primary} onClick={onClick}>
    {Icon || null}
    <span>{text}</span>
  </StyledButton>
)

export default Button
