import React, { PropTypes } from 'react'

const Icon = ({ callback, css, imgSrc }) => {
  return (
      <img
        className={css}
        onClick={callback}
        src={imgSrc}
      />
  )
}

Icon.propTypes = {
  callback: React.PropTypes.func.isRequired,
  css: React.PropTypes.string.isRequired,
  imgSrc: React.PropTypes.string.isRequired
}

export default Icon
