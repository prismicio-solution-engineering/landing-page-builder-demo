import { Content } from '@prismicio/client'

import { SliceComponentProps } from '@prismicio/react'

import HeroErrorDefault from './default'

export type HeroErrorProps = SliceComponentProps<Content.HeroErrorSlice>

const HeroError = ({ slice, ...otherProps }: HeroErrorProps): JSX.Element => {
  switch (slice.variation) {
    case 'default':
      return <HeroErrorDefault slice={slice} {...otherProps} />
    default:
      return <></>
  }
}
    
export default HeroError