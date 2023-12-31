import { type ReactSketchCanvasRef } from 'react-sketch-canvas'

export const getSvg = async (canvas: React.RefObject<ReactSketchCanvasRef>): Promise<string | undefined> => {
  try {
    if (canvas.current) {
      const svg = await canvas.current.exportSvg()
      return svg
    }
  } catch (e) {
    console.error(e)
  }

  return undefined
}
