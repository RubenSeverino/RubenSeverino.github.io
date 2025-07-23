---
title: Solartopia — Interacción, Historia y Diseño de Juego
image: /assets/images/ST_Level01.PNG
summary: A puzzle-adventure game where players manipulate interactive objects to restore light to a fractured universe, using touch-based gesture controls and hybrid pathfinding.
layout: project
---

# 🌞 Solartopia

**Genre**: Strategy / Simulation  
**Engine**: Unreal Engine 4  
**Platforms**: Mobile (Android/iPhone)  
**Status**: In Development  
**Team Size**: 4  

---

## 🧩 Overview

Solartopia is a puzzle-adventure game where players control Paige, the guardian of a shattered cosmic sun, using touch gestures to manipulate the environment and restore light to the universe. The core challenge revolves around spatial reasoning—players rotate platforms, extend bridges, and trigger mechanisms with swipes and taps, while navigating enemies like the bipolar Ghost or the chaotic Hombre Galleta.

What made this project unique was its hybrid input system: a marriage of touch-screen gestures (linear swipes, curved rotations) and Unreal’s Blueprint-based pathfinding, creating a tactile feel rarely seen in mobile 3D games. My role was to architect these systems, ensuring they felt intuitive while supporting complex interactions like chained object physics (e.g., rotators triggering pendulums) and morphing terrain (e.g., trees growing to form bridges).

---

## 🎬 Trailer

<video controls width="100%" poster="/assets/images/solartopia/video-thumbnail.jpg">
  <source src="/assets/videos/assets/videos/Solartopia_PC.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

---

## Core Systems & Design Thinking
1. Touch Gesture System: Precision in Simplicity
Early on, we realized mobile players needed immediate feedback—no virtual joysticks or cluttered UI. I designed a system where:

Single-Tap selects objects by projecting a collision volume from the touch point, using Unreal’s LineTraceByChannel to detect interactables.

Linear Swipes (N/S/E/W) calculate deltas between touch start/end positions, mapped to object movement. The trick was normalizing inputs across screen resolutions:

blueprint
// Sample Blueprint math for swipe direction  
FVector2D Delta = TouchEnd - TouchStart;  
if (Delta.Size() > DeadZone) {  
  FVector WorldDelta = ConvertScreenToWorld(Delta);  
  Interactable.Move(WorldDelta * Sensitivity);  
}  
Curved Swipes required more finesse. I treated the touch as a rotational pivot:

A fixed anchor point (Type B) stores the initial touch location.

A moving point (Type A) tracks the finger’s current position.

The angle between them (using FVector::DotProduct) drives object rotation.

Design Challenge: Players accidentally triggered multi-touch, breaking interactions. My solution was to discard all inputs if a second touch was detected, resetting the gesture state.

2. Hybrid Pathfinding: Rails Meet A*
Paige’s movement needed to feel grid-less but predictable. Traditional A* felt too rigid, so I blended it with a rail system:

On tap, the system runs A* (using Unreal’s NavMeshBounds) to find a path.

If valid, Paige follows the path via spline-based movement (UE4’s SplineComponent), with speed adjusted for curvature.

Iteration: Early playtests showed players frustrated by path recalculations mid-movement. I added a "commitment threshold"—once Paige moved 20% along a path, she’d complete it unless blocked. This reduced indecision.

3. Interactable Objects: A Chain Reaction
Every puzzle relied on physical interactables (rotators, extruders) that could trigger others. For example:

A Rotador Directo (player-controlled) could spin a Limón, whose Morph Targets altered Paige’s walkable surfaces.

A Botón Especial activated by Paige could call a mutadorController, chaining to a cbMutador that extruded a platform.

I built these in Blueprints using event dispatchers and interfaces, ensuring decoupled communication. For instance:

blueprint
// In Rotador_Directo blueprint:  
OnRotate.AddDynamic(Indirecto, &UpdateRotationBasedOnDelta);  
Design Insight: Players loved "aha!" moments when indirect interactions clicked. I leaned into this by staggering tutorials—early levels taught direct controls, while later ones required combining swipes (e.g., curving a rotator to align a bridge).

4. Enemy AI: Minimalist but Expressive
The Ghost enemy’s "bipolar" states were a technical highlight:

Normal State: Used UE4’s Behavior Trees to wander harmlessly.

Altered State: Switched to a PawnSensing-based chase, with material swaps (via Dynamic Material Instances) to signal danger.

Technical Quirk: The Ghost’s collision needed to toggle between Overlap (for phasing) and Block (for attacks). I used SetCollisionResponseToChannel in its state machine.

---

## Design Philosophy
Touch as Physics: Every gesture applied force-like feedback—swipes felt "weighty," taps had subtle screen shakes.

Progressive Complexity: Levels introduced mechanics implicitly (e.g., a crumbling platform taught players to avoid slow swipes).

Narrative Through Mechanics: Paige’s struggle to "rebuild" the world mirrored the player’s act of physically manipulating it.

---

## ⚙️ Features

 ☀️ Build and optimize solar grids  
 🏙️ Manage infrastructure and public morale  
 🌎 Global diplomacy on climate treaties  
 🎭 Dynamic narrative events  
 📈 Research and upgrade technologies

---

## 🧠 What I Did

 Designed the core gameplay loop and progression systems  
 Implemented UI logic in Blueprint for energy and morale  
 Built procedural terrain and solar placement systems  
 Wrote key narrative events using Unreal's dialogue system
