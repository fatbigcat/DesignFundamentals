/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 fish.glb --transform 
Files: fish.glb [4.86MB] > D:\Documents\faks\OO\DesignFundamentals\DesignFundamentals\src\assets\3d\fish-transformed.glb [305.76KB] (94%)
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/fish-transformed.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[0.017, -0.029, 0.474]} rotation={[1.521, 0.161, 3.119]}>
          <group name="defaultMaterial" position={[-0.002, 0.472, -0.055]} rotation={[1.521, 0.031, 2.982]} />
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone002} />
        </group>
        <skinnedMesh name="defaultMaterial001" geometry={nodes.defaultMaterial001.geometry} material={materials.initialShadingGroup} skeleton={nodes.defaultMaterial001.skeleton} position={[0.017, -0.029, 0.474]} rotation={[1.521, 0.161, 3.119]} />
      </group>
    </group>
  )
}

useGLTF.preload('/fish-transformed.glb')
