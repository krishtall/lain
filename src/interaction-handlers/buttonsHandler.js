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
            .setTitle('Review Modal');
    
        const userId = new TextInputBuilder()
            .setCustomId('userId')
            .setLabel('A user\'s id, that reported a message')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('310848622642069504');
    
        const review = new TextInputBuilder()
            .setCustomId('approvement')
            .setLabel('Reason')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Remember to put words: Approved or Declined!')
            .setMaxLength(1024);
    
        const userIdRow = new ActionRowBuilder().addComponents(userId);
        const reviewRow = new ActionRowBuilder().addComponents(review);
    
        modal.addComponents(userIdRow, reviewRow);
    
        await interaction.showModal(modal);
    };
};
module.exports = {
    ButtonHandler
};