/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState
} from 'react'
import PropTypes from 'prop-types'

interface props extends InputHTMLAttributes<DragEvent> {
  onDragMove: any
}

const DragMove: React.FC<props> = props => {
  const {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onDragMove,
    children,
    style,
    className
  }: typeof props = props

  const [isDragging, setIsDragging] = useState(false)

  const handlePointerDown = (e: React.PointerEvent<DragEvent>) => {
    setIsDragging(true)

    onPointerDown(e)
  }

  const handlePointerUp = (e: React.PointerEvent<DragEvent>) => {
    setIsDragging(false)

    onPointerUp(e)
  }

  const handlePointerMove = (e: React.PointerEvent<DragEvent>) => {
    if (isDragging) onDragMove(e)

    onPointerMove(e)
  }

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      style={style}
      className={className}
    >
      {children}
    </div>
  )
}

const { func, element, shape, bool, string } = PropTypes

DragMove.propTypes = {
  onDragMove: func.isRequired,
  onPointerDown: func,
  onPointerUp: func,
  onPointerMove: func,
  children: element,
  style: shape({}),
  className: string
}

DragMove.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {}
}
