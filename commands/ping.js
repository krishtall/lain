const { Command } = require('@sapphire/framework');

class PingCommand extends Command {
  constructor(context, options) {
    super(context, { ...options });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('ping').setDescription('Ping bot to see if it is alive')
    );
  }

  async chatInputRun(interaction) {
    const ping = Math.round(this.container.client.ws.ping)
    await interaction.reply({content: `The ping is: ${ping} ms! :ping_pong:`, ephemeral: true})
  }
}
module.exports = {
  PingCommand
};