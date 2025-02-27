const sessionIdtoUserMap = new Map()

const setUser = (id,user) =>{
    sessionIdtoUserMap.set(id,user)
    
}

const getUser = (id) =>{
    return sessionIdtoUserMap.get(id)
}


module.exports = {
    getUser,
    setUser,
}