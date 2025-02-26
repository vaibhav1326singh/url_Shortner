const sessionIdtoUserMap = new Map()

const setUser = (id,user) =>{
    sessionIdtoUserMap.set(id,user)
    console.log(user)
}

const getUser = (id) =>{
    sessionIdtoUserMap.get(id)
}


module.exports = {
    getUser,
    setUser,
}