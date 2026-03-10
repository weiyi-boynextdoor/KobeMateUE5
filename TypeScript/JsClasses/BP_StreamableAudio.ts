import * as UE from "ue";
import { JsClass } from "../JsClass";
import { G } from "../G";

export class BP_StreamableAudio extends JsClass {
    actor: UE.Game.Blueprints.BP_StreamableAudio.BP_StreamableAudio_C;

    initialize(Object: UE.Object): void {
        const comp = Object as UE.ActorComponent;
        const actor = comp.GetOwner();
        const type = UE.Class.Load("/Game/Blueprints/BP_StreamableAudio.BP_StreamableAudio_C");
        if (!actor.GetClass().IsChildOf(type)) {
            console.error("Initialized with incorrect actor type");
            return;
        }
        this.actor = actor as UE.Game.Blueprints.BP_StreamableAudio.BP_StreamableAudio_C;
        this.actor.StreamableAudio = UE.NewObject(
            UE.KobeSoundWaveProcedural.StaticClass()
        ) as UE.KobeSoundWaveProcedural;
        G.websocket_manager.add_message_listener(this.on_websocket_message);
    }

    deinitialize(): void {
        this.actor = null;
        G.websocket_manager.remove_message_listener(this.on_websocket_message);
    }

    on_websocket_message = (json: JSON) => {
        if (json["event"] === "audio_start") {
            UE.GameplayStatics.PlaySound2D(this.actor, this.actor.StreamableAudio);
        } else if (json["event"] === "audio_chunk") {
            this.actor.StreamableAudio.QueueAudioHexData(json["data"]);
        }
    };
}
