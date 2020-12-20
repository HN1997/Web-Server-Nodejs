
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')
const microtime = require('microtime')
const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel) => {
      if(channel.id){
        //console.log("update de channels")
        await db.put(`channels:${channel.id}`, JSON.stringify(channel))
        return merge(channel)
      }
      else{
        //console.log("creation d'une nouvelle channels")
        if(!channel.name) throw Error('Invalid channel')
        const id = uuid()
        await db.put(`channels:${id}`, JSON.stringify(channel))
        return merge(channel, {id: id})
      }
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`channels:${id}`)
      const channel = JSON.parse(data)
      return merge(channel, {id: id})
    },
    list: async (body) => {
      //console.log(body)
      var is_user=Boolean(false)
      return new Promise( (resolve, reject) => {
        const channels = []
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          channel = JSON.parse(value)
          channel.id = key.split(':')[1]
          //console.log(channel)
          is_user=Boolean(false)
          for(i=0;i<channel.emails.length;i++)
          {
            //console.log("il y a un email")
            //console.log(channel.emails[i])
            if(channel.emails[i]===body)
            {
              //console.log("jtaitrouvéfdp")
              is_user=Boolean(true)
            }
          }
          if(is_user)
          channels.push(channel)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(channels)
        })
      })
    },
    update: async (id, email) => {
      //Ajout d'un utilisateur à une channel
      //get le channel et on le met en objet
      if(!id) throw Error('Invalid id')
      const data = await db.get(`channels:${id}`)
      var channel = JSON.parse(data)
      channel = merge(channel, {id: id})
      //console.log(email)
      //console.log(channel.emails)
      //on ajoute à emails l'email de l'utilisateur à ajouter
      channel.emails.push(email.email)
      //console.log(channel)
      //on delete la channel
      const data1 = await db.del(`channels:${id}`)
      //on recreer avec en parametre l'id => call create
      await db.put(`channels:${id}`, JSON.stringify(channel))



      //const original = store.channels[id]
      //if(!original) throw Error('Unregistered channel id')
      //store.channels[id] = merge(original, channel)
    },
    delete: async (id) => {
    
    if(!id) throw Error('Invalid id')
    const data = await db.del(`channels:${id}`)
      // const original = store.channels[id]
      // if(!original) throw Error('Unregistered channel id')
      // delete store.channels[id]
    }
  },
  messages: {
    create: async (channelId, message) => {
      if(!channelId) throw Error('Invalid channel')
      if(!message.author) throw Error('Invalid message')
      if(!message.content) throw Error('Invalid message')
      creation = microtime.now()
      await db.put(`messages:${channelId}:${creation}`, JSON.stringify({
        author: message.author,
        content: message.content
      }))
      return merge(message, {channelId: channelId, creation: creation})
    },
    list: async (channelId) => {
      return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: `messages:${channelId}:`,
          lte: `messages:${channelId}` + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          message = JSON.parse(value)
          const [, channelId, creation] = key.split(':')
          message.channelId = channelId
          message.creation = creation
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })
    },
    delete: async (channelid,id) => {
      if(!id) throw Error('Invalid id')
      //console.log(channelid)
      //console.log(id)
      const data = await db.del(`messages:${channelid}:${id}`)
      //console.log(data)
      },
    update: async (channelid,msgid,body) => {
      //if(!id) throw Error('Invalid id')
      //console.log(channelid)
      //console.log(body)
      var data = await db.get(`messages:${channelid}:${msgid}`)
      var data1 = JSON.parse(data)
      //console.log(data)
      //console.log(data1)
      //console.log(data1.author)
      await db.del(`messages:${channelid}:${msgid}`)
      await db.put(`messages:${channelid}:${msgid}`, JSON.stringify({
        author: data1.author,
        content: body.ctnt
      }))


      }
  },
  users: {
    create: async (user) => {
      const leresultat =[]
      const key = 'user:'
      
      var exist = Boolean(false);
      db.createReadStream({ gte: key, lte: String.fromCharCode(key.charCodeAt(0) + 1)})
        .on('data', function(data) 
          {
          //console.log(typeof data.value)
          //console.log(typeof JSON.parse(data.value))
          leresultat.push(JSON.parse(data.value))
          //console.log("push :"+leresultat.length)
          //console.log("le resultat est :"+ JSON.stringify(leresultat[leresultat.length-1]))
          //console.log("le username de resultat est :"+leresultat[leresultat.length-1])
          })
        .on('end',()=>
          {
            //console.log("TAILLE DU RESULTAT:"+leresultat.length)
            for(i=0;i<leresultat.length;i++)
            {
              if(leresultat[i].email===user.email)
              {
                exist = Boolean(true)
                //console.log("L'utilisateur "+user.username +" existe déjà")
              }
            }
            if(exist===Boolean(false))
            {
              //creation d'un user dans la bd utilisant le ouath email
              //console.log("Ajout d'un user")
              db.put(`users:${user.email}`, JSON.stringify(user))
            }
            else
            console.log("Pas possible d'ajouter un user car déjà dans la base de donée :"+user.email)
          })
      // console.log(`users:`+JSON.stringify(user))
      // const data = await db.get("",function(err,data){
      //   console.log("le quoi faire et le contenu du get : " + data)
      // })
      // console.log("le resultat : " + data)
      // console.log("j'essaie de get tout les pierre")
      
      //if(!user.username) throw Error('Invalid user')
      //const id = uuid()
      //await db.put(`users:${id}`, JSON.stringify(user))
      //return merge(user, {id: id})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      var data
      try{
         data = await db.get(`users:${id}`)
         if(data)
          {
          const user = JSON.parse(data)
          return merge(user, {id: id})
          }
      }
      catch(ex)
      {
        console.log("user not found")
        console.log(ex.message)
        return ""
      }
      
      // else
      // {
      //   console.log("no user with this email address")
      //   return ""
      // }
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    update: async (id, user) => {
       const data = await db.del(`users:${id}`).
       then
       (
        db.put(`users:${user.email}`, JSON.stringify(user))
       ) 
    },
    delete: async (id) => {
      /*
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      delete store.users[id]
      */
     //console.log("On essaie de supprimer l'user avec l'id : "+id)
      if(!id) throw Error('Invalid user id')
      const original = await db.del(`users:${id}`)
     // const original = store.users[id]
      //if(!original) throw Error('Unregistered user id')
      //delete store.users[id]
    }
  },
  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}
