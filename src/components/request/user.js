import { get, post } from './request'

function getMyBlogs(userId)
{
    let { data } = get(httpUrl + "/user/" + userId + "/home/blogs")
    return data
}

function serchInMyBlogs(userId, term)
{
    let { data } = get(httpUrl + "/user/" + userId + "/home/blogs/search/" + term)
}

function createBlog(userId, title, content)