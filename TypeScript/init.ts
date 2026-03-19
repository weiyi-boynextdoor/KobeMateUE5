console.log("init from ts begin");

import * as UE from "ue";
import { argv } from "puerts";

import { G } from "./G";
import "./JsUserWidgetMixin";
import "./JsComponentMixin";
import { WebsocketManager } from "./WebsocketManager";

const game_instance = argv.getByName("GameInstance") as UE.GameInstance;
G.game_instance = game_instance;

G.websocket_manager = new WebsocketManager();
G.websocket_manager.init();

globalThis.G = G;

console.log("init from ts end");
