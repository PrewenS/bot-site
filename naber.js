module.exports = [{
  name: "öneri",
  $if: "v4",
  code:`
$if[$message[1]==kapat]
**Öneri Sistemi Başarıyla Kapatıldı**
$resetServerVar[öneril]
$onlyIf[$getServerVar[öneril]!=kapalı;**Sistem Zaten Kapalı**]
$endif
$if[$message[1]==aç]
**Öneri Sistemi Açıldı:**
\`Öneri Kanalı: [ $channelName[$mentionedChannels[1;yes]] ]\`
$setServerVar[öneril;$mentionedChannels[1;yes]]
$endif
$onlyIf[$checkContains[$message[1];aç;kapat]!=false;**Bir Tür Belirle: \`[ !öneri aç|kapat {abonelog}]\`**]
$onlyPerms[admin;**Yetersiz Yetki \`[ Yönetici ]\`**]
  `
},{
  name: "$alwaysExecute",
  code:`
$deleteCommand
$setMessageVar[kişi;$authorID;$get[id]]
$setMessageVar[tavsiye;$message;$get[id]]
$let[id;$sendMessage[{"embeds": "{newEmbed:{author:Tavsiye:$userAvatar}{thumbnail:$userAvatar}{field:__**Tavsiyeyi Veren**__:<@$authorID> | \`$userTag\`:no}{field:__**Tavsiye**__:\`$message\`:no}{color:ORANGE}{footer:0 - ✅ | 0 - ❌}}", "components": "{actionRow:{button:Katılıyorum:3:kabul:no:✅}{button:Katılmıyorum:4:red:no:✖}}"};yes]]
$onlyForChannels[$getServerVar[öneril];]
$onlyIf[$getServerVar[öneril]!=kapalı;]
`
},{
  type: "interaction",
  prototype: "button",
  code:`
$djsEval[
  const discord = require("discord.js");
  const { Database } = require("ervel.db")
  const db = new Database("./öneri.json") 

  db.set("$messageID$authorID","ayn aras kargo")

  ;no]
$setMessageVar[kabul;$sum[$getMessageVar[kabul];1]]
$interactionUpdate[;{newEmbed:{author:Tavsiye:$userAvatar[$get[kişi]]}{thumbnail:$userAvatar[$get[kişi]]}{field:__**Tavsiyeyi Veren**__:<@$get[kişi]> | \`$userTag[$get[kişi]]\`:no}{field:__**Tavsiye**__:\`$get[tavsiye]\`:no}{color:ORANGE}{footer:$sum[$getMessageVar[kabul];1] - ✅ | $getMessageVar[red] - ❌}};{actionRow:{button:Katılıyorum:3:kabul:no:✅}{button:Katılmıyorum:4:red:no:✖}}]
$let[kişi;$getMessageVar[kişi]]
$let[tavsiye;$getMessageVar[tavsiye]]
$onlyIf[$get[a]!=true;{"content": "**Oyunu Zaten Vermişsin**", "ephemeral" : true,"options" : {"interaction" : true}}]
  $let[a;$djsEval[
  const discord = require("discord.js");
  const { Database } = require("ervel.db")
  const db = new Database("./öneri.json") 

  db.has("$messageID$authorID")

  ;yes]]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==kabul]
`
},{
  type: "interaction",
  prototype: "button",
  code:`
$djsEval[
  const discord = require("discord.js");
  const { Database } = require("ervel.db")
  const db = new Database("./öneri.json") 

  db.set("$messageID$authorID","ayn aras kargo")

  ;no]
$setMessageVar[kabul;$sum[$getMessageVar[kabul];1]]
$interactionUpdate[;{newEmbed:{author:Tavsiye:$userAvatar[$get[kişi]]}{thumbnail:$userAvatar[$get[kişi]]}{field:__**Tavsiyeyi Veren**__:<@$get[kişi]> | \`$userTag[$get[kişi]]\`:no}{field:__**Tavsiye**__:\`$get[tavsiye]\`:no}{color:ORANGE}{footer:$getMessageVar[kabul] - ✅ | $sum[$getMessageVar[kabul];1] - ❌}};{actionRow:{button:Katılıyorum:3:kabul:no:✅}{button:Katılmıyorum:4:red:no:✖}}]
$let[kişi;$getMessageVar[kişi]]
$let[tavsiye;$getMessageVar[tavsiye]]
$onlyIf[$get[a]!=true;{"content": "**Oyunu Zaten Vermişsin**", "ephemeral" : true,"options" : {"interaction" : true}}]
  $let[a;$djsEval[
  const discord = require("discord.js");
  const { Database } = require("ervel.db")
  const db = new Database("./öneri.json") 

  db.has("$messageID$authorID")

  ;yes]]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==red]
`
}]
