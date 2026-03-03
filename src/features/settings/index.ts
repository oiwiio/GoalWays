import { actions, name, reducer } from "./settings.slice";
import { init } from "./settings.saga";
import { selectors } from "./settings.selectors";
import { SettingsItem } from "./ui/settings-item";
import { SettingsSection } from "./ui/settings-section";

export const Settings = {
    actions,
    sagas: {
        init
    },
    reducer: { [name]: reducer },
    selectors,
    ui: {
        SettingsItem,
        SettingsSection
    }
} 