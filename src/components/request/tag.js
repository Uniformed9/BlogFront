import { get } from './request'

/**
 * 获取所有tag
 * @returns tagList
 */
function getAllTags()
{
    let { data } = get(httpUrl + "/tag")
    return data
}

export { getAllTags }