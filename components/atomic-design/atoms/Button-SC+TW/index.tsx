'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

const getVariantStyles = ({ primary = false }) =>
  primary ? ['text-white', 'bg-blue-950'] : ['text-white', 'bg-red-950'];

const getSizeStyles = ({ size = 'medium' }) => {
  switch (size) {
    case 'small':
      return ['text-sm', 'p-2'];
    case 'large':
      return ['text-l', 'p-4'];
    default:
      return ['text-base', 'p-3'];
  }
};

const StyledButton = styled.button.attrs(
  ({ primary, size }: Omit<ButtonProps, 'label'>) => ({
    className: classNames([
      'font-bold',
      'border-0',
      'rounded-full',
      'cursor-pointer',
      'inline-block',
      'line-height-1',
      ...getVariantStyles({ primary }),
      ...getSizeStyles({ size }),
    ]),
  }),
)`
  ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
    `}
`;

export const Button: React.FC<ButtonProps> = ({ label, ...rest }) => (
  <StyledButton {...rest}>{label}</StyledButton>
);
