module.exports = {
  name: "say",
  aliases: [],
  description: "",
  ownerOnly: true,
  guildOnly: false,
  DMOnly: false,
  cooldown: 0,

  execute(message, args, client) {
    message.channel.send(args.join(" "));
  }
};
