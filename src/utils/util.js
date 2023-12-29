const TOKEN = "atoken"
const saveToken = (token)=>{
    localStorage.setItem(TOKEN,token)
}
const getToken = () =>{
   return localStorage.getItem(TOKEN)
}
const deleteToken = ()=>{
   localStorage.removeItem(TOKEN)
}
const isLoggedIn = ()=>{
   return localStorage.getItem(TOKEN)!== null
}
const saveName = (name)=>{
   localStorage.setItem("name", name)
}
const getName = () =>{
   return localStorage.getItem("name")
}
const shuffleFisherYates = (array)=>{
   let i = array.length
   while (i--) {
     const ri = Math.floor(Math.random() * i)
     [array[i], array[ri]] = [array[ri], array[i]]
   }
   return array
 }
 const cleanO = (str)=>{
   if(str === null)
      return ""
   if(typeof str !== "string")
       str = str.toString()
   return str
}
const activeArranger = (tcs)=>{
   tcs.sort((a, b)=>{
      let fa = a.category.toLowerCase(),
      fb = b.category.toLowerCase()
      if (fa < fb) {
         return -1
      }
      if (fa > fb) {
         return 1
      }
      return 0
   })
   let actives = tcs.filter(t=>t.status === 'Active')
   let inactives = tcs.filter(t=>t.status === 'Inactive')
   let ars = actives.concat(inactives)
   return ars
}
const activeTopicArranger = (tcs)=>{
   tcs.sort((a, b)=>{
      let fa = a.topic.toLowerCase(),
      fb = b.topic.toLowerCase()
      if (fa < fb) {
         return -1
      }
      if (fa > fb) {
         return 1
      }
      return 0
   })
   let actives = tcs.filter(t=>t.status === 'Active')
   let inactives = tcs.filter(t=>t.status === 'Inactive')
   let ars = actives.concat(inactives)
   return ars
}
const isReallyNumber = (data)=>{
   let regex=/^[0-9]+$/
   return !!data.match(regex)
 }
const makeUnique = (array = [], keys = []) => {
   if (!keys.length || !array.length) return [];
 
   return array.reduce((list, item) => {
     const hasItem = list.find(listItem =>
       keys.every(key => listItem[key] === item[key])
     );
     if (!hasItem) list.push(item);
     return list;
   }, []);
 };
 const getHeader = ()=>{
   return {
      headers:{
          'content-type': 'application/json',
          token: getToken()
      }
  }
}
const getDateFormat = (d)=>{
   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   let y = d.getFullYear()
   let dd = '0'+d.getDate()
   let h = '0'+d.getHours()
   let min = '0'+d.getMinutes()
   return dd.slice(-2)+' '+months[d.getMonth()]+' '+y+', '+h.slice(-2)+':'+min.slice(-2)
}

export {
   getDateFormat,
   saveToken, shuffleFisherYates, getToken, saveName, getHeader, getName, isLoggedIn, deleteToken, cleanO, activeArranger, activeTopicArranger, makeUnique, isReallyNumber}

