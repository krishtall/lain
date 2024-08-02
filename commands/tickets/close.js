const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js');

class CloseCommand extends Command {
    constructor (context, options) {
        super(context, { ... options });
    };

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
        builder.setName('close')
            .setDescription('Closes a ticket'));
    };

    async chatInputRun(interaction) {
        const ticketChannel = interaction.channel;
        const moderator = await interaction.guild.members.fetch(interaction.user.id)

        if (moderator.roles.cache.has('1243857353942761491')) {
            const logChannel = await interaction.guild.channels.fetch('1243860780063920178')

            const embed = new EmbedBuilder()
                .setTitle('Ticket closed!')
                .setDescription(`Moderator **${moderator.user.username} (${moderator.user.id})** closed the ticket \`${ticketChannel.name}\` `)
                .setColor(0xff9a4d)

            await console.log(`[TICKET CLOSED] Channel ${ticketChannel.name} was closed by ${moderator.user.username}.`);
            await logChannel.send({embeds: [embed]});
            await ticketChannel.delete('Closed by moderator');

        } else return;
    };
};
module.exports = {
    CloseCommand
};