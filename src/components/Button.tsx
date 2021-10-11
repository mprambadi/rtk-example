import tw, { css, styled, theme } from 'twin.macro'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  isSmall?: boolean
  isLoading?: boolean
}

const Button = styled.button(
  ({ variant = 'primary', isSmall, isLoading = false }: ButtonProps) => [
    // The common button styles
    tw`px-8 py-2 rounded focus:outline-none transform duration-75 shadow-sm items-center m-2 text-center flex justify-center`,

    // Use the variant grouping feature to add variants to multiple classes
    tw`hocus:(scale-105 text-yellow-400)`,

    // Use props to conditionally style your components
    variant === 'primary' && tw`text-white border-black bg-gray-500`,

    // Combine regular css with tailwind classes within backticks
    variant === 'secondary' && [
      css`
        box-shadow: 0 0.1em 0 0 rgba(0, 0, 0, 0.25);
      `,
      tw`border-2 border-yellow-600 text-black`,
    ],

    // Conditional props can be added
    isSmall ? tw`text-sm` : tw`text-lg`,
    isLoading && tw`cursor-not-allowed bg-gray-300`,

    isLoading
      ? css`
          & > :nth-child(1) {
            display: block;
          }
        `
      : css`
          & > :nth-child(1) {
            display: none;
          }
        `,
  ],
)

export default Button
