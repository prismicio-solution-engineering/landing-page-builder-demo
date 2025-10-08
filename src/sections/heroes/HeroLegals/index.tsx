import { Content } from '@prismicio/client'

import { SliceComponentProps } from '@prismicio/react'

import HeroLegalsDefault from './default'

export type HeroLegalsProps = SliceComponentProps<Content.HeroLegalsSlice>

const HeroLegals = ({ slice, ...otherProps }: HeroLegalsProps): JSX.Element => {
  switch (slice.variation) {
    case 'default':
      return <HeroLegalsDefault slice={slice} {...otherProps} />
    default:
      return <></>
  }
}
    
export default HeroLegals