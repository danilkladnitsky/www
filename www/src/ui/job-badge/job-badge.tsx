"use client"

import { Environment, Lightformer } from '@react-three/drei'
import { Canvas, extend } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { Band } from '../band/band'

extend({ MeshLineGeometry, MeshLineMaterial })

type JobBadgeProps = {
  onClick?: (e: MouseEvent) => void
}
export const JobBadge = ({ onClick }: JobBadgeProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 25 }}>
      <ambientLight intensity={Math.PI} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 30}>
        <Band onClick={onClick} />
      </Physics>
      <Environment background blur={0.6}>
        <color attach="background" args={['#111111']} />
        <Lightformer intensity={9} color="white" position={[-5, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 7, 1]} />
      </Environment>
    </Canvas>
  )
}
