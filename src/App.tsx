import { useEffect, useState } from 'react';
import './App.css'
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations, Text } from '@react-three/drei';

function App() {
  const [startGame, setStartGame] = useState(false); // ゲーム開始状態の管理ステート

  const handleStartGame = () => {
    setStartGame(true);
  }

  return (
    <Canvas>
      {startGame ? (
        <></>
      ): (
        <StartScreen onClick={handleStartGame} />
      )}
    </Canvas>
  )
}

const StartScreen = (onClick: any) => {
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
      <mesh position={[0, 2.3, 0]}>
        <Text fontSize={1} lineHeight={1} color="royalblue">Tennis</Text>
      </mesh>
      <mesh position={[-1.8, 1, 0]}>
        <Text fontSize={0.4} lineHeight={1} color={ wallAttackHovered ? "red" : "royalblue" } onPointerOver={() => handleWallAttackHover(true)} onPointerOut={() => handleWallAttackHover(false)}>Wall Attack</Text>
      </mesh>
      <mesh position={[1.9, 1, 0]}>
        <Text fontSize={0.4} lineHeight={1} color={ gameHovered ? "red" : "royalblue" } onPointerOver={() => handleGameHover(true)} onPointerOut={() => handleGameHover(false)}>Game</Text>
      </mesh>
      <primitive object={scene} onClick={onClick} position={[0, -150, -600]} rotation-y={91} />
    </>
  )
}

export default App
