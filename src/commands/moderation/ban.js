const { EmbedBuilder } = require('@discordjs/builders');
const { Command } = require('@sapphire/framework');
const { PermissionFlagsBits } = require('discord.js');
class BanCommand extends Command {
    constructor(context, options) {
        super(context, {... options});
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
        builder.setName('ban')
            .setDescription('Bans a member')
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
                .addUserOption(option => option
                    .setName('user')
                    .setDescription('Mention a user that you want to block')
                    .setRequired(true)
            )
            .addStringOption(option => option
                .setName('reason')
                .setDescription('Provide a reason to ban a user')
                .setRequired(false)
                .setMinLength(20)
                .setMaxLength(256)
            ));
    };

    async chatInputRun(interaction) {
        const member = interaction.guild.members.cache.get(interaction.options.getMember('user').id)
        const reason = interaction.options.getString('reason') ?? 'Not provided'

        const embed  = new EmbedBuilder()
            .setTitle('User is banned!')
            .setDescription(`User ${interaction.options.getMember('user')} has been banned.
Reason: ${reason}`)
    
        await member.ban({reason: reason})
        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
};
module.exports = {
    BanCommand
}   