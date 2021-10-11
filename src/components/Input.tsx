import tw, { css, styled, theme } from 'twin.macro'

interface InputProps {
  variant?: 'primary' | 'secondary'
  isSmall?: boolean
}

const Input = styled.input(({ variant="primary", isSmall }: InputProps) => [
  // The common Input styles
  tw`px-4 py-2 rounded m-2`,

  // Use props to conditionally style your components
  variant === 'primary' && tw`border-black border-2`,

  // Combine regular css with tailwind classes within backticks
  variant === 'secondary' && [
    css`
      box-shadow: 0 0.1em 0 0 rgba(0, 0, 0, 0.25);
    `,
    tw`border-2 border-yellow-600`,
  ],

  // Conditional props can be added
  isSmall ? tw`text-sm` : tw`text-lg`,

  // The theme import can supply values from your tailwind.config.js
  css`
    color: ${theme`colors.black`};
  `,
])

export default Input
