"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface WeatherAnimationProps {
  weatherCode: number
}

export function WeatherAnimation({ weatherCode }: WeatherAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 200
    canvas.height = 200

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Determine animation based on weather code
    if (weatherCode < 300) {
      // Thunderstorm
      drawThunderstorm(ctx, canvas.width, canvas.height)
    } else if (weatherCode < 500) {
      // Drizzle
      drawDrizzle(ctx, canvas.width, canvas.height)
    } else if (weatherCode < 600) {
      // Rain
      drawRain(ctx, canvas.width, canvas.height)
    } else if (weatherCode < 700) {
      // Snow
      drawSnow(ctx, canvas.width, canvas.height)
    } else if (weatherCode < 800) {
      // Atmosphere (fog, mist, etc.)
      drawFog(ctx, canvas.width, canvas.height)
    } else if (weatherCode === 800) {
      // Clear sky
      drawSun(ctx, canvas.width, canvas.height)
    } else {
      // Clouds
      drawClouds(ctx, canvas.width, canvas.height)
    }

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      // Animation logic here
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [weatherCode])

  // Drawing functions
  const drawSun = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2
    const centerY = height / 2
    const radius = 40

    // Draw sun
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fillStyle = "#FFD700"
    ctx.fill()

    // Draw rays
    ctx.strokeStyle = "#FFD700"
    ctx.lineWidth = 3
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6
      const x1 = centerX + Math.cos(angle) * (radius + 10)
      const y1 = centerY + Math.sin(angle) * (radius + 10)
      const x2 = centerX + Math.cos(angle) * (radius + 25)
      const y2 = centerY + Math.sin(angle) * (radius + 25)

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
  }

  const drawClouds = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = "#E0E0E0"

    // Draw main cloud
    drawCloud(ctx, width / 2, height / 2, 1)

    // Draw smaller clouds
    drawCloud(ctx, width / 4, height / 3, 0.7)
    drawCloud(ctx, (width / 4) * 3, height / 4, 0.6)
  }

  const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
    ctx.beginPath()
    ctx.arc(x, y, 25 * scale, Math.PI * 0.5, Math.PI * 1.5)
    ctx.arc(x + 25 * scale, y - 25 * scale, 25 * scale, Math.PI * 1, Math.PI * 2)
    ctx.arc(x + 50 * scale, y, 25 * scale, Math.PI * 1.5, Math.PI * 0.5)
    ctx.moveTo(x + 50 * scale, y + 25 * scale)
    ctx.lineTo(x, y + 25 * scale)
    ctx.fill()
  }

  const drawRain = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw cloud
    ctx.fillStyle = "#708090"
    drawCloud(ctx, width / 2, height / 3, 1)

    // Draw raindrops
    ctx.fillStyle = "#4682B4"
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * width
      const y = height / 2 + Math.random() * (height / 2)

      ctx.beginPath()
      ctx.ellipse(x, y, 2, 7, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const drawDrizzle = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw cloud
    ctx.fillStyle = "#A9A9A9"
    drawCloud(ctx, width / 2, height / 3, 1)

    // Draw drizzle (smaller, fewer raindrops)
    ctx.fillStyle = "#87CEEB"
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * width
      const y = height / 2 + Math.random() * (height / 2)

      ctx.beginPath()
      ctx.ellipse(x, y, 1, 5, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const drawSnow = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw cloud
    ctx.fillStyle = "#A9A9A9"
    drawCloud(ctx, width / 2, height / 3, 1)

    // Draw snowflakes
    ctx.fillStyle = "#FFFFFF"
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width
      const y = height / 2 + Math.random() * (height / 2)

      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const drawThunderstorm = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw dark cloud
    ctx.fillStyle = "#4A4A4A"
    drawCloud(ctx, width / 2, height / 3, 1)

    // Draw lightning bolt
    ctx.fillStyle = "#FFD700"
    ctx.beginPath()
    ctx.moveTo(width / 2, height / 2)
    ctx.lineTo(width / 2 + 15, height / 2 + 20)
    ctx.lineTo(width / 2 - 5, height / 2 + 25)
    ctx.lineTo(width / 2, height / 2 + 50)
    ctx.lineTo(width / 2 + 5, height / 2 + 30)
    ctx.lineTo(width / 2 - 10, height / 2 + 20)
    ctx.closePath()
    ctx.fill()

    // Draw raindrops
    ctx.fillStyle = "#4682B4"
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * width
      const y = height / 2 + Math.random() * (height / 2)

      ctx.beginPath()
      ctx.ellipse(x, y, 2, 7, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const drawFog = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = "#D3D3D3"

    // Draw fog layers
    for (let i = 0; i < 5; i++) {
      const y = height / 4 + i * 20

      ctx.beginPath()
      ctx.moveTo(0, y)

      for (let x = 0; x < width; x += 50) {
        const amplitude = 10
        const frequency = 0.02
        ctx.quadraticCurveTo(x + 25, y + Math.sin(x * frequency) * amplitude, x + 50, y)
      }

      ctx.lineTo(width, y + 10)
      ctx.lineTo(0, y + 10)
      ctx.closePath()
      ctx.fill()
    }
  }

  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
      <canvas ref={canvasRef} width={200} height={200} className="mx-auto" />
    </motion.div>
  )
}

