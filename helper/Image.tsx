import React from 'react'

const ImageHelper = ({
  url,
  className,
  pictureClasses,
  alt,
}: {
  url: string
  className?: string
  pictureClasses?: string
  alt?: string
}) => {
  return (
    <picture className={`block ${pictureClasses}`}>
      <source srcSet="" type="image/webp" />
      <source srcSet={url} type="image/jpeg" />
      <img
        src={url}
        className={`d-block w-100 object-fill vertical-center box-border ${className}`}
        loading="lazy"
        width="100%"
        height="100%"
        alt={alt || 'Image'}
      />
    </picture>
  )
}

export default ImageHelper
