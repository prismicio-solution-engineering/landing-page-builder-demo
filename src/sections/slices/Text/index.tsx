import { Content } from '@prismicio/client'

import { SliceComponentProps } from '@prismicio/react'

import TextDefault from './default'

export type TextProps = SliceComponentProps<Content.TextSlice>

const Text = ({ slice, ...otherProps }: TextProps): JSX.Element => {
  switch (slice.variation) {
    case 'default':
      return <TextDefault slice={slice} {...otherProps} />
    default:
      return <></>
  }
}
    
export default Text