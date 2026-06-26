import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

const VERTEX_SHADER = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

const FRAGMENT_SHADER = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 a0 = x - floor(x + 0.5);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = v_texCoord;
    vec3 color = vec3(0.043, 0.043, 0.059);

    float n1 = snoise(uv * 2.0 + u_time * 0.1);
    float n2 = snoise(uv * 4.0 - u_time * 0.05);

    float smoke = smoothstep(0.4, 0.6, n1 * n2 + 0.5);

    vec3 lightColor = vec3(0.7, 0.7, 0.8);
    color = mix(color, color + lightColor * 0.05, smoke);

    float g = snoise(uv * 0.5 + u_time * 0.02);
    color += vec3(0.05, 0.06, 0.08) * g;

    float d = distance(uv, vec2(0.5));
    color *= smoothstep(1.2, 0.5, d);

    gl_FragColor = vec4(color, 1.0);
}`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export interface ShaderBackgroundProps {
  className?: string
  opacity?: number
}

export function ShaderBackground({ className, opacity = 0.4 }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return
    const ctx = gl as WebGLRenderingContext

    function syncSize() {
      const w = canvas!.clientWidth || 1280
      const h = canvas!.clientHeight || 720
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w
        canvas!.height = h
      }
    }

    const resizeObserver = new ResizeObserver(syncSize)
    resizeObserver.observe(canvas)
    syncSize()

    const program = ctx.createProgram()!
    ctx.attachShader(program, compileShader(ctx, ctx.VERTEX_SHADER, VERTEX_SHADER))
    ctx.attachShader(program, compileShader(ctx, ctx.FRAGMENT_SHADER, FRAGMENT_SHADER))
    ctx.linkProgram(program)
    ctx.useProgram(program)

    const buffer = ctx.createBuffer()
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer)
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), ctx.STATIC_DRAW)
    const positionLoc = ctx.getAttribLocation(program, 'a_position')
    ctx.enableVertexAttribArray(positionLoc)
    ctx.vertexAttribPointer(positionLoc, 2, ctx.FLOAT, false, 0, 0)

    const timeLoc = ctx.getUniformLocation(program, 'u_time')
    const resLoc = ctx.getUniformLocation(program, 'u_resolution')

    let rafId = 0
    function render(t: number) {
      ctx.viewport(0, 0, canvas!.width, canvas!.height)
      if (timeLoc) ctx.uniform1f(timeLoc, t * 0.001)
      if (resLoc) ctx.uniform2f(resLoc, canvas!.width, canvas!.height)
      ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, 4)
      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      className={cn('pointer-events-none fixed inset-0 z-0 h-full w-full', className)}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
