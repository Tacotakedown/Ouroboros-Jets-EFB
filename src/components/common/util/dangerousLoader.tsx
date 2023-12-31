import React from 'react'
import DOMPurify from 'dompurify'

type T_RenderSvgFromStringProps = {
  element: string
}

export const RenderSvgFromString: React.FC<T_RenderSvgFromStringProps> = (
  props: T_RenderSvgFromStringProps
): JSX.Element => {
  const sanitizedString = DOMPurify.sanitize(props.element)
  return <div dangerouslySetInnerHTML={{ __html: sanitizedString }} />
}
