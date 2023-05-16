'use client';

import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

const getVariantStyles = ({ primary = false }) =>
  primary
    ? css`
        color: ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.primary};
      `
    : css`
        color: ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.secondary};
      `;

const getSizeStyles = ({ size = 'medium' }) => {
  switch (size) {
    case 'small': {
      return css`
        font-size: ${({ theme }) => theme.fontSizes.small};
        line-height: ${({ theme }) => theme.lineHeights.small};
        padding: ${({ theme }) => `${theme.space.small} ${theme.space.small}`};
      `;
    }
    case 'large': {
      return css`
        font-size: ${({ theme }) => theme.fontSizes.large};
        line-height: ${({ theme }) => theme.lineHeights.large};
        padding: ${({ theme }) => `${theme.space.large} ${theme.space.large}`};
      `;
    }
    default: {
      return css`
        font-size: ${({ theme }) => theme.fontSizes.medium};
        line-height: ${({ theme }) => theme.lineHeights.medium};
        padding: ${({ theme }) =>
          `${theme.space.medium} ${theme.space.medium}`};
      `;
    }
  }
};

const StyledButton = styled.button<ButtonProps>`
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;

  ${(props) => getVariantStyles(props)}
  ${(props) => getSizeStyles(props)}
  ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
    `}
`;

export const Button: React.FC<ButtonProps> = ({ label, ...rest }) => (
  <StyledButton {...rest}>{label}</StyledButton>
);
