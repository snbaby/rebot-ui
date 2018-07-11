// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = () => {
  const articlesArray = [];
  // eslint-disable-next-line
  for (let i = 0; i < 100; i++) {
    const newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      // eslint-disable-next-line
      date: Random.date() + ' ' + Random.time()
    };
    articlesArray.push(newArticleObject);
  }

  return {
    articles: articlesArray,
  };
};

// Mock.mock( url, post/get , 返回的数据)；
//Mock.mock('/news/index', 'post', produceNewsData);
