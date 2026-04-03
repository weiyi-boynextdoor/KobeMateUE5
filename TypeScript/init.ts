console.log("init from ts begin");

import * as UE from "ue";
import { argv } from "puerts";

import { G } from "./G";
import "./JsUserWidgetMixin";
import "./JsComponentMixin";
import { WebsocketManager } from "./WebsocketManager";

import * as utils from "./utils";

const game_instance = argv.getByName("GameInstance") as UE.GameInstance;
G.game_instance = game_instance;
G.config = utils.get_game_config();

G.websocket_manager = new WebsocketManager();
G.websocket_manager.init();

globalThis.G = G;

console.log("init from ts end");
