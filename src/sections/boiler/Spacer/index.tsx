import { Content } from '@prismicio/client'

import { SliceComponentProps } from '@prismicio/react'

import SpacerDefault from './default'
import SpacerLine from './line'

export type SpacerProps = SliceComponentProps<Content.SpacerSlice>

const Spacer = ({ slice, ...otherProps }: SpacerProps): JSX.Element => {
  switch (slice.variation) {
    case 'default':
      return <SpacerDefault slice={slice} {...otherProps} />
    case 'line':
      return <SpacerLine slice={slice} {...otherProps} />
    default:
      return <></>
  }
}
    
export default Spacer