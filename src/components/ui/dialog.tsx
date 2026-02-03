"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const DraggingContext = React.createContext(false)

function useDragging() {
  return React.useContext(DraggingContext)
}

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/45 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogContentDraggable({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  const reduceMotion = useReducedMotion()
  const [surfaceEl, setSurfaceEl] = React.useState<HTMLDivElement | null>(null)
  const [canHoverFine, setCanHoverFine] = React.useState(false)
  const [viewport, setViewport] = React.useState({ w: 0, h: 0 })
  const [surfaceSize, setSurfaceSize] = React.useState({ w: 0, h: 0 })
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const offsetRef = React.useRef(offset)
  const dragRef = React.useRef<{
    pointerId: number
    startX: number
    startY: number
    startOffsetX: number
    startOffsetY: number
  } | null>(null)

  React.useEffect(() => {
    // Desktop-like input: mouse/trackpad (fine pointer + hover).
    const media = window.matchMedia("(hover: hover) and (pointer: fine)")
    const sync = () => setCanHoverFine(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  React.useEffect(() => {
    const sync = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    sync()
    window.addEventListener("resize", sync)
    return () => window.removeEventListener("resize", sync)
  }, [])

  React.useEffect(() => {
    const el = surfaceEl
    if (!el) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      setSurfaceSize({ w: rect.width, h: rect.height })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [surfaceEl])

  const canDrag = !reduceMotion && (canHoverFine || viewport.w >= 768)

  React.useEffect(() => {
    offsetRef.current = offset
  }, [offset])

  const clampOffset = React.useCallback(
    (next: { x: number; y: number }) => {
      // Keep the dialog within viewport bounds with some margin
      const margin = 32
      const maxX = Math.max(0, (viewport.w - surfaceSize.w) / 2 - margin)
      const maxY = Math.max(0, (viewport.h - surfaceSize.h) / 2 - margin)
      return {
        x: Math.min(maxX, Math.max(-maxX, next.x)),
        y: Math.min(maxY, Math.max(-maxY, next.y)),
      }
    },
    [surfaceSize.h, surfaceSize.w, viewport.h, viewport.w]
  )

  const clampOffsetRef = React.useRef(clampOffset)
  React.useEffect(() => {
    clampOffsetRef.current = clampOffset
  }, [clampOffset])

  React.useEffect(() => {
    // Keep the dialog within bounds when viewport/content size changes.
    setOffset((prev) => clampOffset(prev))
  }, [clampOffset])

  React.useEffect(() => {
    if (!canDrag) return
    const surface = surfaceEl
    if (!surface) return

    // Wait a frame so children (including [data-drag-handle]) are mounted.
    const raf = requestAnimationFrame(() => {
      const handle = surface.querySelector<HTMLElement>("[data-drag-handle]")
      if (!handle) return

      attachDragListeners(handle)
    })

    let cleanup: (() => void) | undefined

    function attachDragListeners(handle: HTMLElement) {
      // Improve drag behavior on touch/pen and prevent text selection.
      const prevTouchAction = handle.style.touchAction
      const prevUserSelect = handle.style.userSelect
      const prevCursor = handle.style.cursor
      handle.style.touchAction = "none"
      handle.style.userSelect = "none"
      handle.style.cursor = "grab"

      const onPointerDown = (event: PointerEvent) => {
        if (event.button !== 0) return
        // If the user is selecting text or interacting with inputs, don't start drag.
        const target = event.target as HTMLElement | null
        if (target?.closest("input, textarea, select, button, a, [role='button']")) return

        event.preventDefault()

        dragRef.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          startOffsetX: offsetRef.current.x,
          startOffsetY: offsetRef.current.y,
        }

        setIsDragging(true)

        try {
          handle.setPointerCapture(event.pointerId)
        } catch {
          // ignore (some browsers can throw)
        }

        handle.style.cursor = "grabbing"

        const onMove = (moveEvent: PointerEvent) => {
          if (!dragRef.current) return
          if (moveEvent.pointerId !== dragRef.current.pointerId) return

          const dx = moveEvent.clientX - dragRef.current.startX
          const dy = moveEvent.clientY - dragRef.current.startY

          setOffset(
            clampOffsetRef.current({
              x: dragRef.current.startOffsetX + dx,
              y: dragRef.current.startOffsetY + dy,
            })
          )
        }

        const end = (endEvent: PointerEvent) => {
          if (!dragRef.current) return
          if (endEvent.pointerId !== dragRef.current.pointerId) return
          dragRef.current = null
          setIsDragging(false)
          window.removeEventListener("pointermove", onMove)
          window.removeEventListener("pointerup", end)
          window.removeEventListener("pointercancel", end)

          handle.style.cursor = "grab"
        }

        window.addEventListener("pointermove", onMove)
        window.addEventListener("pointerup", end)
        window.addEventListener("pointercancel", end)
      }

      handle.addEventListener("pointerdown", onPointerDown)

      cleanup = () => {
        handle.removeEventListener("pointerdown", onPointerDown)
        handle.style.touchAction = prevTouchAction
        handle.style.userSelect = prevUserSelect
        handle.style.cursor = prevCursor
      }
    }

    return () => {
      cancelAnimationFrame(raf)
      cleanup?.()
    }
  }, [canDrag, surfaceEl])

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content data-slot="dialog-content" asChild {...props}>
        <div className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed inset-0 z-50 grid place-items-center p-4 duration-200 outline-none sm:p-6 pointer-events-none">
          <div
            ref={setSurfaceEl}
            style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
            className={cn(
              "bg-background pointer-events-auto relative grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg outline-none sm:max-w-lg",
              className
            )}
          >
            <DraggingContext.Provider value={isDragging}>
              {children}
            </DraggingContext.Provider>
            {showCloseButton && (
              <DialogPrimitive.Close
                data-slot="dialog-close"
                className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              >
                <XIcon />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            )}
          </div>
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogContentDraggable,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  useDragging,
}
