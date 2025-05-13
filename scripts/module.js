Hooks.once('init', async function() {
    game.settings.register('gambitsIdentificationInhibitor', 'identifyRestrictionMessage', {
        name: "Identify Restriction Message",
        hint: "This is the message that will display to users if they attempt to identify.",
        scope: 'world',
        config: true,
        type: String,
        default: "Nice try, DENIED ;)"
    });
});

Hooks.once('ready', async function() {
    Hooks.on("preUpdateItem", (item, update, options) => {
        if (!game.user.isGM && !item.system?.identified && "identified" in (update.system ?? {}) && !options?.isAdvancement) {
            ui.notifications.error(`${game.settings.get("gambitsIdentificationInhibitor", "identifyRestrictionMessage")}`);
            return false;
        }
    });
});