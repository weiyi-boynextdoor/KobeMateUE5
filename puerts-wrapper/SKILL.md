---
name: puerts-wrapper
description: Initialize and write TypeScript gameplay scripts for Unreal Engine 5 projects that use PuertsWrapper. Use when the workspace is a UE5 project and `Plugins/PuertsWrapper` exists, especially for TypeScript work under `TypeScript/` that attaches behavior to wrapper widgets or components.
---

# Puerts Wrapper

Use this skill for KobeMate-style UE5 TypeScript scripting through `PuertsWrapper`.

## Workflow

1. Before scaffolding, require both wrapper Blueprint assets:
   - `Plugins/PuertsWrapper/Content/JsComponent.uasset`
   - `Plugins/PuertsWrapper/Content/JsUserWidget.uasset`
   Stop and report an error if either asset is missing.
2. If any base TypeScript bridge file is missing, create it from `assets/TypeScript/`:
   - `TypeScript/init.ts`
   - `TypeScript/G.ts`
   - `TypeScript/JsClass.ts`
   - `TypeScript/JsComponentMixin.ts`
   - `TypeScript/JsUserWidgetMixin.ts`
3. Read `TypeScript/init.ts`, `TypeScript/G.ts`, `TypeScript/JsClass.ts`, and the relevant mixin before editing.
4. Keep project-specific runtime services in `G.ts` only when the project needs them.
5. Prefer TypeScript changes under `TypeScript/`. Use generated types from `Typing/` to identify UE Blueprint and engine APIs.
6. Do not edit generated declarations in `Typing/`.
7. Do not add per-business-Blueprint Puerts mixins by default. Reuse the shared `JsUserWidgetMixin` and `JsComponentMixin` flow.
8. Add behavior as a `JsClass` subclass:
   - Widget scripts live under `TypeScript/JsClasses/UI/`.
   - Component-hosted scripts live under `TypeScript/JsClasses/`.
9. In `initialize(Object: UE.Object)`, narrow the UE object to the expected widget, component, or owner type before using it.
10. Keep JS lifetime closed: remove listeners, delegates, and retained UE references in `deinitialize()`.

## Conventions

- Treat Blueprint assets as UE-side structure and TypeScript classes as behavior.
- Keep wrapper lifecycle ownership centralized so JS instances are released with their wrapper host.
- Use UE-style `PascalCase` for Unreal overrides and engine-facing members; use `snake_case` for pure TypeScript helpers.
- Avoid browser-only globals and Node-only assumptions unless the Puerts runtime path already supports them.
- Modify `Plugins/PuertsWrapper` only when the shared widget or component host flow cannot express the required bridge.
