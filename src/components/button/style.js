import styled, { css } from 'styled-components'
import { h1Bold } from '../../styles/common'

const variantCSS = {
  main : css`
    background-color: ${({theme}) => theme.PALLETE.primary["main"]};
  `,
  sub : css`
    background-color: ${({theme}) => theme.PALLETE.primary["sub"]};
  `,
  white : css`
    background-color: ${({theme}) => theme.PALLETE["white"]};
  `,
}

const fontCSS = {
  h1 : h1Bold
}

const colorCSS = {
  primary : css`
    color : ${({theme}) => theme.PALLETE.primary["main"]};
  `,
  sub : css`
    color : ${({theme}) => theme.PALLETE.primary["sub"]};
  `,
  white : css`
    color : ${({theme}) => theme.PALLETE["white"]};
  `,
  black : css`
    color : ${({theme}) => theme.PALLETE["black"]};
  `,
  gray100 : css`
    color : ${({theme}) => theme.PALLETE.gary["gray100"]};
  `,
  gray200 : css`
    color : ${({theme}) => theme.PALLETE.gary["gray200"]};
  `,
  gray300 : css`
    color : ${({theme}) => theme.PALLETE.gary["gray300"]};
  `,
}

const sizeCSS = {
  small : css`
    width: 64px;
    height: 32px;
    padding: 16px 0;
  `,
  meduim : css`
    width: 96px;
    height: 48px;
    padding: 16px 0;
  `,
  large : css`
    width: 128px;
    height: 64px;
    padding: 16px 0;
  `,
  full : css`
    width: 100%;
    aspect-ratio: 8 / 1;
    padding: 16px 0;
  `
}

const shapeCSS = {
  default : css``,
  small : css`
    border-radius: 10px;
  `,
  large : css`
    border-radius: 20px;
  `,
  big : css`
    border-radius: 30px;
  `,
  round : css`
    border-radius: 50%;
  `
}


const Button = styled.button`
  ${({variant}) => variantCSS[variant]}
  ${({font}) => fontCSS[font]}
  ${({color}) => colorCSS[color]}
  ${({size}) => sizeCSS[size]}
  ${({shape}) => shapeCSS[shape]}
`

export default Button;