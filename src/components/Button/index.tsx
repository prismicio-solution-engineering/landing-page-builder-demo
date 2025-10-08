'use client'

import { PrismicNextLink } from '@prismicio/next'
import { ReactNode } from 'react'
import { KeyTextField, LinkField } from '@prismicio/client'

import styles from './styles.module.scss'

import ArrowCTA from '@/assets/icons/ArrowCTA'
import Load from '@/assets/icons/Load'

const Encapsulation = ({
  clssNm,
  nClck,
  lnk,
  children,
}: {
  clssNm: string
  nClck: () => void
  lnk: LinkField | false | undefined
  children: ReactNode
}) => {
  return (
    <>
      {!lnk && (
        <div className={clssNm} onClick={() => nClck()}>
          {children}
        </div>
      )}
      {lnk && (
        <PrismicNextLink className={clssNm} field={lnk}>
          {children}
        </PrismicNextLink>
      )}
    </>
  )
}

export default function Button({
  text,
  link,
  size = 'big',
  style = 1,
  check = false,
  arrow = true,
  anim = null,
  fullwidth = false,
  functionClick,
  status = null,
}: {
  text: KeyTextField | string
  link?: LinkField | false | undefined
  size?: string
  style?: number
  check?: boolean
  arrow?: boolean
  anim?: number | null
  fullwidth?: boolean
  functionClick?: () => void
  status?: string | null
}) {
  if (!text) return null

  link = link && link.link_type === 'Any' ? false : link

  const handleClick = () => {
    if (functionClick) functionClick()
  }

  const arwB = anim === 4 || anim === 5 ? true : false

  return (
    <Encapsulation
      clssNm={`${styles.btn} ${styles[`size_${size}`]} ${
        styles[`style_${style}`]
      } ${fullwidth ? styles.fullwidth : ''} ${
        anim ? styles[`anim_${anim}`] : ''
      } ${status ? styles[`style_${status}`] : ''}`}
      nClck={handleClick}
      lnk={link}
    >
      <div className={styles.container}>
        {arwB && (
          <span className={styles.btnicn}>
            <ArrowCTA content={styles.content} />
          </span>
        )}
        <span className={styles.btntxt}>{text}</span>
        {arrow && (
          <span className={styles.btnicn}>
            <ArrowCTA content={styles.content} />
          </span>
        )}
      </div>
      {anim && anim === 1 && (
        <div className={styles.btnanm} aria-hidden="true">
          <div className={`${styles.btntxt} ${styles.btnanm_el}`}>
            {[...Array(4)].map((_, i) => (
              <span key={i}>{text}</span>
            ))}
          </div>
        </div>
      )}
      {status === 'load' && (
        <div className={styles.container_load}>
          <Load />
        </div>
      )}
    </Encapsulation>
  )
}
