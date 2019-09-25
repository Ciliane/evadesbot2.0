'use strict';

var colors = {
    error: 0xFC3D3D,
    success: 0x6EFC3D,
    default: 0x2477AB
};
module.exports.generateEmbed = function generateEmbed(data) {
    var generatedEmbed = {
        author: {
            name: data.name,
            icon_url: data.icon
        },
        color: colors[data.type],
        title: data.title,
        description: data.description,
        fields: data.fields,
        thumbnail: {
            url: data.picture
        },
        footer: {
            text: 'Evades.io bot - Epic evades.io API bot.',
            icon_url: 'https://cdn.discordapp.com/attachments/594629786639532032/622544203934728222/evades-logo.png'
        }
    };
    return { embed: generatedEmbed };
};