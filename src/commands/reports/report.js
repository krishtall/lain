const { Command } = require('@sapphire/framework');
const { EmbedBuilder,
    ApplicationCommandType,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder} = require('discord.js');

class ReportCommand extends Command{
    constructor(context, options) {
        super(context, { ... options,
            name: 'Report'
         });
    };

    registerApplicationCommands(registy) {
        registy.registerContextMenuCommand(builder =>
            builder.setName(this.name)
                .setType(ApplicationCommandType.Message)
        )
    };

    async contextMenuRun(interaction) {
        const reportChannel = interaction.guild.channels.cache.get('1269305830856069233');
        const messageURL = `https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${interaction.targetId}`;

        const review = new ButtonBuilder()
            .setCustomId('reviewButton')
            .setLabel('Review')
            .setStyle(ButtonStyle.Success)
        
        const row = new ActionRowBuilder()
			.addComponents(review);

        await interaction.reply({content: 'You have successfully reported a message!', ephemeral: true})

        const embed = new EmbedBuilder() 
            .setTitle('New report!')
            .setDescription(`Message link: ${messageURL}`)
            .addFields({
                name: 'Message content',
                value: interaction.targetMessage.content
            }, {
                name: 'Report\'s author',
                value: `${interaction.user.username} (ID: ${interaction.user.id})`
            })
            .setColor(0xff9a4d);

        await reportChannel.send({embeds: [embed], components: [row]})
    };
};
module.exports = {
    ReportCommand
};