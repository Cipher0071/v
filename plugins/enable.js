//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
	
const sections = [
   {
	title: `≡ Options List`,
	rows: [
	{title: "🔮 | Welcome", rowId: `${usedPrefix + command} welcome`},
	{title: "🌎 | Public", rowId: `${usedPrefix + command} public`},
	{title: "🔞 | Nsfw", rowId: `${usedPrefix + command} nsfw`},
	{title: "🧬 | Onlynig", rowId: `${usedPrefix + command} onlynig`},
	{title: "🔗 | Antilink", rowId: `${usedPrefix + command} antilink`},
        {title: "🚫 | Antidelete", rowId: `${usedPrefix + command} antidelete`},
	{title: "⏏️ | Autolevelup", rowId: `${usedPrefix + command} autolevelup`},
	{title: "🗣️ | ChatBot", rowId: `${usedPrefix + command} chatbot`},
	{title: "🔎 | Detect", rowId: `${usedPrefix + command} detect`},
	{title: "📑 | Document", rowId: `${usedPrefix + command} document`},
	{title: "🛡️ | Restrict", rowId: `${usedPrefix + command} restrict`},
	{title: "💬 | OnlyPv", rowId: `${usedPrefix + command} onlydm`},
	{title: "👥 | OnlyGp", rowId: `${usedPrefix + command} onlygp`}
	]
    },
]

const listMessage = {
  text: '\nHere is a list of options that can be enabled or disabled',
  footer: fgig,
  title: `≡ Options List`,
  buttonText: "Click Here",
  sections
}

  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  switch (type) {
    case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break
      
      case 'detect':
      case 'detector':
        if (!m.isGroup) {
         if (!isOwner) {
           global.dfail('group', m, conn)
          throw false
        }
       } else if (!isAdmin) {
         global.dfail('admin', m, conn)
         throw false
       }
       chat.detect = isEnable
     break
    
    case 'antidelete':
    case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = !isEnable
      break

    case 'document':
    case 'documento':
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
    chat.useDocument = isEnable
    break
    case 'public':
    case 'publico':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = !isEnable
      break
    case 'antilink':
    case 'antilinkwa':
    case 'antilinkwha':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break
      
      case 'solonig':
      case 'solonigerians':
      case 'onlynigerians':
      case 'onlynig':
      case 'onlynigs':
      case 'solonig':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.onlynig = isEnable
      break
      
      case 'nsfw':
      case '+18':
       if (m.isGroup) {
         if (!(isAdmin || isOwner)) {
           global.dfail('admin', m, conn)
            throw false
           }}
    chat.nsfw = isEnable          
    break

    case 'autolevelup':
    isUser = true
     user.autolevelup = isEnable
     break
     
     case 'chatbot':
     case 'autosimi':
     case 'autosimsimi':
      isUser = true
      user.chatbot = isEnable
     break
     
    case 'restrict':
    case 'restringir':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break
    
    case 'onlypv':
    case 'onlydm':
    case 'onlymd':
    case 'solopv':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['pconly'] = isEnable
      break
      
    case 'gponly':
    case 'onlygp':
    case 'grouponly':
    case 'sologp':
    case 'sologrupo':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['gconly'] = isEnable
      break
      
    default:
      if (!/[01]/.test(command)) return m.reply(`
≡ Options List

┌─⊷ *ADMIN*
✘ welcome
✘ antilink
✘ detect 
✘ document
✘ nsfw
✘ onlynig
└───────────── 
┌─⊷ *USERS*
✘ autolevelup
✘ chatbot 
└─────────────
┌─⊷ *OWNER*
✘ public
✘ solopv
✘ sologp
└─────────────
*📌 Example :*
*${usedPrefix}on* welcome
*${usedPrefix}off* welcome
`)
      throw false
}

m.reply(`
✅ *${type}* *${isEnable ? 'Activated' : 'Deactivated'}* ${isAll ? 'for this bot' : isUser ? '' : 'for this chat'}
`.trim()) 

}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['nable']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default handler
