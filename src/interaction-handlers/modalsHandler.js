const { InteractionHandler,
    InteractionHandlerTypes,
    err
} = require('@sapphire/framework');
const { EmbedBuilder } = require('@discordjs/builders');

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
        try {
        const moderatorReview = interaction.fields.getTextInputValue('approvement');
        const dmUserId = interaction.fields.getTextInputValue('userId')
        const embed = new EmbedBuilder()
            .setTitle('Your report has been reviewed by moderator!')
            .setColor(0x69ff7f)
            .addFields({
                name: 'Result:',
                value: moderatorReview
            });

        const user = await interaction.client.users.fetch(dmUserId);

        await interaction.user.send({
            embeds: [embed]
        });

        await interaction.reply({
            content: 'Successfully reviewed and replied! Remember to do the actions if so!',
            ephemeral: true
        })
        } catch (error) {
            console.error(error)
            await interaction.reply({
                content: 'DM\'s are probably locked. Failed to send',
                ephemeral: true
            });
        };
    };
};
module.exports = {
    ModalHandler
};