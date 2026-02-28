// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useGLTF, useTexture } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { BallCollider, CuboidCollider, RapierRigidBody, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three'

extend({ MeshLineGeometry, MeshLineMaterial })

const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 }

// preload textures
useGLTF.preload('/jobs/alfabank/alfa-badge.gltf')
useTexture.preload('/jobs/alfabank/band.jpg')

type BandProps = {
  maxSpeed?: number
  minSpeed?: number
  onClick?: (e: MouseEvent) => void
}

export const Band = ({ maxSpeed = 50, minSpeed = 10, onClick }: BandProps) => {
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();


  const { nodes, materials } = useGLTF('/jobs/alfabank/alfa-badge.gltf')

  const texture = useTexture('/jobs/alfabank/band.jpg', (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    return texture
  })

  const { width, height } = useThree((state) => state.size)

  const [curve] = useState(() => {
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
    curve.curveType = 'chordal'
    return curve

  })
  const [dragged, drag] = useState(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])
  

  useLayoutEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
        ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current?.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      const points = curve.getPoints(32)
      
      band.current.geometry.setPoints(points)

      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  return (
    <>
      <group position={[0, 4.5, 0]} onClick={onClick}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" colliders={false} />
        <RigidBody position={[0, 0, 0]} ref={j1} {...segmentProps} colliders={false} type='dynamic'>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} colliders={false} type='dynamic'>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} colliders={false} type='dynamic'>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, 0, 0]} ref={card} {...segmentProps} colliders={false} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.192, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={materials.base.map} map-anisotropy={16} clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.6} />
            </mesh>
            <mesh position={[0, 1.192, -0.01]} renderOrder={0}>
              <boxGeometry args={[0.1, 0.06, 0.0]} />
              <meshBasicMaterial color="#EF3224" />
            </mesh>
            <mesh geometry={nodes.clip.geometry} renderOrder={2} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} renderOrder={3} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
          renderOrder={1}
        />
      </mesh>
    </>
  )
}