import { Content } from '@prismicio/client'

import { SliceComponentProps } from '@prismicio/react'
        
export type SpacerProps = SliceComponentProps<Content.SpacerSlice>
        
import styles from './styles.module.scss'

const SpacerDefault = ({ slice }: SpacerProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.section_spacer_default}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          SPACER DEFAULT
        </div>
      </div>
    </section>
  )
}

export default SpacerDefault