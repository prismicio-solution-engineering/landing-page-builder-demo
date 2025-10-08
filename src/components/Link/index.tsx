import { PrismicNextLink } from '@prismicio/next'
import { ReactNode } from 'react'
import { KeyTextField, LinkField } from '@prismicio/client'

import styles from './styles.module.scss'

const Encapsulation = ({
  clssNm,
  nClck,
  fClck,
  lnk,
  children,
}: {
  clssNm: string
  nClck: () => void
  fClck: () => void | boolean
  lnk: LinkField | false | undefined
  children: ReactNode
}) => {
  return (
    <>
      {!lnk && (
        <>
          {!fClck() ? (
            <div className={clssNm}>{children}</div>
          ) : (
            <div className={clssNm} onClick={() => nClck()}>
              {children}
            </div>
          )}
        </>
      )}
      {lnk && (
        <PrismicNextLink className={clssNm} field={lnk}>
          {children}
        </PrismicNextLink>
      )}
    </>
  )
}

export default function Link({
  text,
  link,
  size = 'big',
  style = 1,
  arrow = true,
  functionClick = () => false,
}: {
  text: KeyTextField | string
  link?: LinkField | false | undefined
  size?: string
  style?: number
  arrow?: boolean
  functionClick?: () => void | boolean
}) {
  if (!text) return null

  link = link && link.link_type === 'Any' ? false : link

  const handleClick = () => {
    if (functionClick) functionClick()
  }

  return (
    <div className={styles.lnk_anim}>
      <Encapsulation
        clssNm={`${styles.lnk} ${styles[`size_${size}`]} ${styles[`style_${style}`]}  `}
        nClck={handleClick}
        fClck={functionClick}
        lnk={link}
      >
        <span className={styles.lnktxt}>{text}</span>
        {arrow && (
          <svg viewBox="0 0 24 24" className={styles.lnkicn}>
            <path d="M15.443 12.3197L9.93797 17.8697C9.76172 18.0459 9.47672 18.0459 9.30047 17.8697L8.55797 17.1272C8.38172 16.9509 8.38172 16.6659 8.55797 16.4897L13.0017 12.0009L8.55797 7.51219C8.38172 7.33594 8.38172 7.05094 8.55797 6.87469L9.30047 6.13219C9.47672 5.95594 9.76172 5.95594 9.93797 6.13219L15.443 11.6822C15.6192 11.8584 15.6192 12.1434 15.443 12.3197Z" />
          </svg>
        )}
      </Encapsulation>
    </div>
  )
}
