const { Command } = require('@sapphire/framework');
const { PermissionsBitField, ChannelType, EmbedBuilder } = require('discord.js');

class ticketCommand extends Command {
    constructor (context, options) {
        super(context, { ...options });
    };

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => 
        builder.setName('ticket')
            .setDescription('Create a ticket if you need help!')
            .addStringOption(option => 
            option
                .setName('reason')
                .setDescription('Provide a reason to open a ticket')
                .setRequired(true))
    );
    };

    async chatInputRun(interaction) {
        if (interaction.options.getString('reason').length >= 1024) {
            await interaction.reply({content: 'Your reason is too long! Limit: 1024 symbols.', ephemeral: true})
            return;
        }

        const interactionUser = await interaction.guild.members.fetch(interaction.user.id)

        let channel = await interaction.guild.channels.create({
            name: `Ticket ${interactionUser.user.username}}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: interactionUser.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel]
                }
            ]
        });
        
        const reason = interaction.options.getString('reason')
        const embed = new EmbedBuilder()
            .setAuthor({name: `Welcome ${interactionUser.user.username}`})
            .addFields({
                name: 'Reason of opening a ticket',
                value: `${reason}`
            })
            .setDescription(`This is a support ticket. Please provide as much detail as possible about your issue so we can help you resolve it as quickly as possible.`)
            .setColor(0xffd085)

        await interaction.reply({content: `You have created a new ticket <#${channel.id}>`, ephemeral: true});
        await channel.send({embeds: [embed]})
    };
};
module.exports = {
    ticketCommand
};