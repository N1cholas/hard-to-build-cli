'use strict';

const semver = require('semver')
const urlJoin = require('url-join')
const axios = require('axios')

async function getPkgInfo(name) {
    if (!name) {
        return null
    }
    
    const url = urlJoin('https://registry.npmjs.org', name)

    return await axios.get(url).then(res => {
        if (res.status === 200) {
            return res.data
        }
    
        return null
    }).catch(e => {
        return Promise.reject(e)
    })
}

async function getPkgVersions(name) {
    const info = await getPkgInfo(name)
    
    if (info) {
        return Object.keys(info.versions)
    }
    
    return []
}

async function getSemverVersions(name, currentVersion) {
    const versions = await getPkgVersions(name)
    const sortVersions = versions.filter(version => semver.satisfies(version, `^${currentVersion}`))
        .sort((a, b) => semver.lt(a, b))
    
    if (sortVersions && sortVersions.length) {
        return sortVersions[0]
    }
    
    return []
}

module.exports = {
    getPkgInfo,
    getPkgVersions,
    getSemverVersions
}
