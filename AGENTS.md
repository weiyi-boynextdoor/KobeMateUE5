# KobeMate Agent Guide

## Project Overview
- This repository is an Unreal Engine 5 (UE5) project.
- Gameplay and runtime scripting logic are implemented with **puerts**.
- Script code is written in **TypeScript**.

## Source Layout
- `TypeScript/`
  - Main TypeScript source directory.
  - Primary script entry file: `TypeScript/init.ts`.
- `Typing/`
  - Engine and integration type definitions used by TypeScript.
  - Treat this folder as the source of engine-facing typings.
- `Source/`
  - Native UE5 C++ modules and engine-side integration code.
- `Content/`
  - UE5 assets (Blueprints, maps, materials, etc.).

## Script Runtime Conventions
- All new script features should be implemented under `TypeScript/`.
- Application bootstrap logic should begin from `TypeScript/init.ts`.
- Import engine API types from `Typing/` definitions when available.
- Keep runtime-safe TypeScript style: avoid browser-only globals and Node-only assumptions unless explicitly supported by puerts runtime.

## Development Guidelines
- Prefer small, modular TypeScript files and explicit exports.
- Keep game logic deterministic and avoid hidden side effects in module top-level code.
- Place shared utilities in clearly named subfolders under `TypeScript/` (for example: `TypeScript/core/`, `TypeScript/gameplay/`, `TypeScript/ui/`).
- When adding new engine bindings, update or extend typings in `Typing/` to keep editor IntelliSense accurate.

## Change Policy for Agents
- Do not remove or overwrite existing declarations in `Typing/`. They are auto generated.
- Prefer additive, backward-compatible changes in scripting APIs.
- When changing initialization flow, document the reason and impact in the related commit or PR description.

## Plugin Boundaries
- `Plugins/Puerts` is a third-party plugin.
- Do not modify or rely on deep understanding of `Plugins/Puerts` source code.
- `Plugins/PuertsWrapper` is a project-owned plugin that wraps puerts integration.
- It is allowed to modify C++ files under `Plugins/PuertsWrapper` when implementing project features or fixes.

## TypeScript Naming Convention
- In TypeScript code that overrides Unreal Engine functions or variables, follow UE-style naming: **PascalCase / UpperCamelCase** (starting with an uppercase letter).
- In engine-agnostic, pure TypeScript code, use **snake_case** naming (lowercase words joined by underscores).
