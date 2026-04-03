import * as UE from "ue";
import * as fs from "fs";
import * as path from "path";
import { G } from "./G";

const BP_SaveGame = UE.Class.Load("/Game/Blueprints/BP_KobeSaveGame.BP_KobeSaveGame_C");

export function get_game_config(): UE.Game.Blueprints.BP_KobeSaveGame.BP_KobeSaveGame_C {
    if (UE.GameplayStatics.DoesSaveGameExist("config", 0)) {
        return UE.GameplayStatics.LoadGameFromSlot(
            "config",
            0
        ) as UE.Game.Blueprints.BP_KobeSaveGame.BP_KobeSaveGame_C;
    } else {
        return UE.GameplayStatics.CreateSaveGameObject(
            BP_SaveGame
        ) as UE.Game.Blueprints.BP_KobeSaveGame.BP_KobeSaveGame_C;
    }
}

export function save_game_config(): void {
    if (G.config) {
        UE.GameplayStatics.SaveGameToSlot(G.config, "config", 0);
    }
}
