import * as UE from "ue";
import { argv } from "puerts";

import { G } from "./G";
import "./JsUserWidgetMixin";
import "./JsComponentMixin";

const game_instance = argv.getByName("GameInstance") as UE.GameInstance;
G.game_instance = game_instance;

globalThis.G = G;
