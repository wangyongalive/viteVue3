/**
 * 从 itemElement 中抽离出所有的 imgElements
 * @param {*} itemElements
 */
export const getImgElements = (itemElements, className) => {
  const imgElements = []
  itemElements.forEach((el) => {
    className
      ? imgElements.push(...el.getElementsByClassName(className))
      : imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

/**
 *  生成所有的图片链接数组
 * @param {*} imgElements
 * @returns
 */
export const getAllImg = (imgElements) => {
  return imgElements.map((imgElement) => {
    return imgElement.src
  })
}

/**
 * 监听图片数组加载完成（通过 promise 完成）
 */
export const onComplateImgs = (imgs) => {
  // promise 集合
  const promiseAll = []
  // 循环构建 promiseAll
  //   console.log('imgs', imgs)
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      //   console.log('0000')
      const imageObj = new Image()
      imageObj.src = img // url
      imageObj.onload = () => {
        resolve({
          img,
          index
        })
      }
    })
  })
  //   console.log('111')
  return Promise.all(promiseAll)
}
