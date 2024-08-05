const { InteractionHandler,
    InteractionHandlerTypes
} = require('@sapphire/framework');

class ModalHandler extends InteractionHandler {
    constructor(ctx, options) {
        super(ctx, {
            ... options,
            interactionHandlerType: InteractionHandlerTypes.ModalSubmit
        });
    };

    parse(interaction) {
        if (interaction.customId !== 'reviewModal') return this.none();

        return this.some();
    };

    async run(interaction) {
        await interaction.reply({
            content: 'test',
            ephemeral: true
        });
    };
};
module.exports = {
    ModalHandler
};