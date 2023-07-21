// 'use client' must be placed on the top where you define CSS with styled components

'use client';

import { Button } from '@/components/atomic-design/atoms/Button-SC';
import styled from 'styled-components';

const Wrapper = styled.div`
  * {
    margin-top: 10px;
  }
`;

const Text = styled.p<{ $warning?: boolean; $title?: boolean }>`
  color: ${(props) => (props.$warning ? 'red' : 'black')};
  font-weight: ${(props) => (props.$title ? '700' : '400')};
`;

export default function Page() {
  return (
    <Wrapper>
      <Text $title>CSS-in-JS</Text>
      <Text $warning>
        CSS-in-JS libraries that require runtime JavaScript are not currently
        supported in Server Components. This demo will showcase
        styled-components.
      </Text>
      <Text>This is a styled Component button</Text>

      <Button label="some button" size="small" />
    </Wrapper>
  );
}
