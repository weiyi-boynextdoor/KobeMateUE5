// Global variables

import * as UE from "ue";
import { JsClass } from "./JsClass";

class Global {
    registered_classes: Map<string, typeof JsClass>;
    game_instance: UE.GameInstance;

    constructor() {
        this.registered_classes = new Map<string, typeof JsClass>();
    }
}

export const G = new Global();

export function get_registered_class(name: string, file_path: string): typeof JsClass {
    console.log(`Getting registered class: ${name} from ${file_path}`);
    if (G.registered_classes.has(name)) {
        return G.registered_classes.get(name)!;
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const js_class = require(file_path)[name] as typeof JsClass;
    G.registered_classes.set(name, js_class);
    return js_class;
}
