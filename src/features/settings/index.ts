import * as settingsSlice from "./settings.slice";  
import { init } from "./settings.saga";
import * as settingsSelectors from "./settings.selectors";
import { SettingsItem } from "./ui/settings-item";
import { SettingsSection } from "./ui/settings-section";

export const Settings = {
    actions: settingsSlice,  
    sagas: { init },
    reducer: { settings: settingsSlice.default },  
    selectors: settingsSelectors,
    ui: {
        SettingsItem,
        SettingsSection
    }
}