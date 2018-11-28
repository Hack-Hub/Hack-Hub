import styled from 'styled-components'

export const CommentStyle = styled.div`
  ${({ lastChild }) =>
    lastChild &&
    `
// background: blue;
// padding-bottom: 100px;
`}
`
