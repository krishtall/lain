const { EmbedBuilder } = require('@discordjs/builders');
const { Command } = require('@sapphire/framework');

class ClearCommand extends Command {
    constructor(context, options) {
        super(context, {... options});
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
        builder.setName('clear')
            .setDescription('Clears up to 100 messages')
            .addIntegerOption(option => option
                .setName('amount')
                .setDescription('Enter a integer between a 1 message to 100 messages.')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
            ));
    };

    async chatInputRun(interaction) {
        const amount = interaction.options.getInteger('amount');

        const messages = await interaction.channel.messages.fetch({
            limit: amount + 1,
            cache: false
    });

    const embed = new EmbedBuilder()
        .setTitle('Messages have been purged!')
        .setDescription(`${amount} messages have been purged from this channel.\nModerator: ${interaction.user.username}.
**This message will be deleted after 10 seconds.**`)
        .setColor(0xff9a4d);

    await interaction.channel.bulkDelete(messages, true)

    await interaction.reply({embeds: [embed], ephemeral: false});

    setTimeout(async () => {
        if (interaction.replied) { 
            await interaction.deleteReply();
        }
    }, 10000);
}
};
module.exports = {
    ClearCommand
}