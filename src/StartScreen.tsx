import { useAnimations, useGLTF, Text } from "@react-three/drei";
import { useEffect, useState } from "react";

const StartScreen = ({ onClick }: any) => {
  const { scene, animations } = useGLTF('/scene.gltf');
  const { actions } = useAnimations(animations, scene);
  const [wallAttackHovered, setWallAttackHovered] = useState(false);
  const [gameHovered, setGameHovered] = useState(false);

  useEffect(() => {
    if (actions["Take 001"]) {
      actions["Take 001"].setEffectiveTimeScale(0.5); // アニメーションの再生速度を指定
      actions["Take 001"].play(); // アニメーションの再生
    }
  }, []);

  const handleWallAttackHover = (hover: boolean) => {
    setWallAttackHovered(hover);
  }

  const handleGameHover = (hover: boolean) => {
    setGameHovered(hover);
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={0.5} />
      <mesh position={[0, 1.2, 0]}>
        <Text fontSize={0.8} lineHeight={1} color="royalblue">Tennis</Text>
      </mesh>
      <mesh position={[-1.8, 0.5, 0]} onClick={() => onClick()}>
        <Text fontSize={0.3} lineHeight={1} color={ wallAttackHovered ? "red" : "royalblue" } onPointerOver={() => handleWallAttackHover(true)} onPointerOut={() => handleWallAttackHover(false)}>Wall Attack</Text>
      </mesh>
      <mesh position={[1.9, 0.5, 0]}>
        <Text fontSize={0.3} lineHeight={1} color={ gameHovered ? "red" : "royalblue" } onPointerOver={() => handleGameHover(true)} onPointerOut={() => handleGameHover(false)}>Game</Text>
      </mesh>
      <primitive object={scene} position={[0, -150, -600]} rotation-y={91} />
    </>
  )
}

export default StartScreen