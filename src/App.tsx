import { Suspense, useMemo, useState } from 'react';
import './App.css'
import { Canvas } from '@react-three/fiber';
import { Cloud, KeyboardControls, OrbitControls, PointerLockControls, Sky } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Ground from './Ground';
import StartScreen from './StartScreen';
import Player from './Player';

function App() {
  const [startGame, setStartGame] = useState(false); // ゲーム開始状態の管理ステート

  const handleStartGame = () => {
    setStartGame(true);
  }

  return (
    <Canvas shadows camera={{fov: 45}}>
      {startGame ? (
        <>
          <KeyboardControls map={[
            { name: "forward", keys: ["ArrowUp", "w", "W"] },
            { name: "backward", keys: ["ArrowDown", "s", "S"] },
            { name: "left", keys: ["ArrowLeft", "a", "A"] },
            { name: "right", keys: ["ArrowRight", "d", "D"] },
            { name: "jump", keys: ["Space"] },
            { name: "shift", keys: ["Shift"] }
          ]}>
            <Sky turbidity={10} rayleigh={3} mieCoefficient={0.005} mieDirectionalG={0.7} azimuth={180} distance={10000} sunPosition={[1000, 40, 1000]} />
            <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
              <Physics gravity={[0, -30, 0]}>
                <Ground />
                <Player />
                <mesh position={[0, 0, 0]}>
                <boxGeometry />
                <meshStandardMaterial />
                </mesh>
              </Physics>
              <PointerLockControls />
          </KeyboardControls>
        </>
      ): (
        <StartScreen onClick={handleStartGame} />
      )}
    </Canvas>
  )
}

export default App
