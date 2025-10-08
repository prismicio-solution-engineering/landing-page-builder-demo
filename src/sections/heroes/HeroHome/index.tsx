import { Content } from '@prismicio/client'

import { SliceComponentProps } from '@prismicio/react'

import HeroHomeDefault from './default'

export type HeroHomeProps = SliceComponentProps<Content.HeroHomeSlice>

const HeroHome = ({ slice, ...otherProps }: HeroHomeProps): JSX.Element => {
  switch (slice.variation) {
    case 'default':
      return <HeroHomeDefault slice={slice} {...otherProps} />
    default:
      return <></>
  }
}
    
export default HeroHome