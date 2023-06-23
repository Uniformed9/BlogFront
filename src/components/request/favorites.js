import { get, post } from './request'
import axios from './http'
/**
 * 根据用户id获取收藏夹列表
 * @param {number} userId 
 * @returns 
 */
function getFavoritesList(userId)
{
    let list = []
    let { data, msg } = get(httpUrl + "/user/" + userId + "/home/favorites")
    list = list.concat(data)
    return list
}

/**
 * 根据用户id和收藏夹id获取博客列表
 * @param {number} userId 
 * @param {number} favoritesId 
 * @returns 
 */
function getBlogsFromFavorites(userId, favoritesId)
{
    let list = []
    let { data, msg } = get(httpUrl + "/user/" + userId + "/home/favorites/" + favoritesId)
    list = list.concat(data)
    return list
}

/**
 * 添加收藏夹
 * @param {number} userId 
 * @param {string} name 
 */
function addFavorites(userId, name)
{
    post(httpUrl + "/user/" + userId + "/home/favorites", name)
}

/**
 * 修改收藏夹名
 * @param {number} userId 
 * @param {number} favoritesId 
 * @param {string} newName 
 */
function updateFavorites(userId, favoritesId, newName)
{
    axios.put(httpUrl + "/user/" + userId + "/home/favorites/" + favoritesId, newName)
}

/**
 * 删除收藏夹
 * @param {number} userId 
 * @param {number} favoritesId 
 */
function deleteFavorites(userId, favoritesId)
{
    axios.delete(httpUrl + "/user/" + userId + "/home/favorites", favoritesId)
}

/**
 * 向收藏夹中添加收藏博客
 * @param {number} userId 
 * @param {number} favoritesId 
 * @param {number} blogId 
 */
function addBlogToFavorites(userId, favoritesId, blogId)
{
    post(httpUrl + "/user/" + userId + "/home/favorites/" + favoritesId, blogId)
}

/**
 * 从收藏夹中删除博客
 * @param {number} userId 
 * @param {number} favoritesId 
 * @param {number} blogId 
 */
function deleteBlogFromFavorites(userId, favoritesId, blogId)
{
    axios.delete(httpUrl + "/user/" + userId + "/home/favorites/" + favoritesId, blogId)
}

export { getBlogsFromFavorites, getFavoritesList, deleteBlogFromFavorites, deleteFavorites, addBlogToFavorites, addFavorites, updateFavorites }