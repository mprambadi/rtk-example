import tw, { css, styled, theme } from 'twin.macro'

interface ErrorFormProps {
    error: boolean
}

const ErrorForm = styled.span(({ error }: ErrorFormProps) => [
  // The common ErrorForm styles
  error && tw`px-4 py-2 rounded m-2 text-red-500`,

  error && css`
    display: block
  `
])

export default ErrorForm
