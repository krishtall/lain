const { InteractionHandler,
    InteractionHandlerTypes
} = require('@sapphire/framework');

const { ActionRowBuilder,
    ModalBuilder,
    TextInputStyle, 
    TextInputBuilder} = require('discord.js');

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
        const modal = new ModalBuilder()
            .setCustomId('reviewModal')
            .setTitle('Review Modal')

        const review = new TextInputBuilder()
            .setCustomId('approvement')
            .setLabel('Reason')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Remember to put words: Approved or Declined!')
            .setMaxLength(1024)
        
        const actionRow = new ActionRowBuilder().addComponents(review)
        modal.addComponents(actionRow)

        await interaction.showModal(modal)
    };
};
module.exports = {
    ButtonHandler
};