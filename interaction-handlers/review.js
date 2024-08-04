const { InteractionHandler,
    InteractionHandlerTypes
} = require('@sapphire/framework');

class ButtonHandler extends InteractionHandler {
    constructor(ctx, options) {
        super(ctx, { ... options,
            interactionHandlerType: InteractionHandlerTypes.Button
        });
    };

    parse(interaction) {
        if (interaction.customId !== 'reviewButton') return this.none();

        return this.some();
    };

    async run(interaction) {
        await interaction.reply({}); /* gonna be adding modal that submits/declines the report. */
    };
};
module.exports = {
    ButtonHandler
};