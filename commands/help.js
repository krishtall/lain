const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js');

class HelpCommand extends Command {
    constructor (context, options) {
        super(context, { ... options });
    };

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => 
        builder.setName('help')
            .setDescription('Help command to show all of the bot\'s commands'),
        { idHints: ['1269234801324589181']});
    };

    async chatInputRun(interaction) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);

        const embed = new EmbedBuilder()
            .setTitle(`Lain's commands list`)
            .setDescription(interactionUser.roles.cache.has('1243857353942761491') ? `Commands list: \n</ticket:1267847457400815636>, </close:1268856771439759443>, </help:1269234801324589181>` : `Commands list: \n</ticket:1267847457400815636>, </help:1269234801324589181>`)
            .setColor(0xffd085)
            
        await interaction.reply({embeds: [embed], ephemeral: true})
    };
};
module.exports = {
    HelpCommand
};