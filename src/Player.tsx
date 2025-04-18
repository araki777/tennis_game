import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { CapsuleCollider, RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier"

const SPEED = 5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

const Player = () => {
  const ref = useRef<RapierRigidBody | null>(null!)
  const { world } = useRapier()
  const [, get] = useKeyboardControls()

  const getNumericState = () => {
    const { forward, backward, left, right, jump, shift } = get();
    return {
      forward: forward ? 1 : 0,
      backward: backward ? 1 : 0,
      left: left ? 1 : 0,
      right: right ? 1 : 0,
      jump: jump ? 1 : 0,
      shift: shift ? 5 : 1,
    }
  }

  useFrame((state) => {
    if (ref.current) {
      const { forward, backward, left, right, jump, shift } = getNumericState();
      const velocity = ref.current.linvel()

      // カメラの回転を取得
      const { x, y, z } = ref.current.translation();
      state.camera.position.set(x, y, z);

      // movement
      frontVector.set(0, 0, backward - forward)
      sideVector.set(left - right, 0, 0)
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED * shift).applyEuler(state.camera.rotation)
      ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true)

      // jumping
      const rayOrigin = ref.current.translation();
      const rayDirection = { x: 0, y: -1, z: 0 };
      const ray = world.castRay(new RAPIER.Ray(rayOrigin, rayDirection), 0, true);
      const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75
      if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 }, true)
    }
  })

  return (
    <>
      <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 10, 0]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>
    </>
  )
}

export default Player
